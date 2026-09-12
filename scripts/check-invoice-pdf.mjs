import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { inflateSync } from 'node:zlib';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { createInvoicePdf, invoiceFilename } from '../src/lib/invoicePdf.mjs';

const fonts = await Promise.all(['Regular', 'SemiBold'].map(async weight => (await readFile(new URL(`../public/fonts/invoice/Inter-${weight}.ttf`, import.meta.url))).toString('base64')));
const details = { number: 'QA-2026-0912', date: '2026-09-12', due: '2026-09-26', currency: 'EUR', from: 'Studio José & Zoë - TEST ONLY', fromAddress: 'Example Street 1\n1000 AB Test City\nThe Netherlands', to: 'Müller & François - TEST ONLY', toAddress: 'Example Avenue 2\n2000 CD Test City\nGermany', taxId: 'TEST-ID', reference: 'QA reference', taxRate: '21', payment: 'Test document - no payment required.', notes: 'Résumé, façade, naïve, £, €, Ελληνικά, Кириллица.' };
const items = [{ id: 1, description: 'Website implementation', quantity: '2', rate: '125.50' }, { id: 2, description: 'Documentation', quantity: '1.5', rate: '80' }];
const output = new URL('../.codex-runtime/pdf-qa/', import.meta.url);
await mkdir(output, { recursive: true });
// Inspect the actual jsPDF output, including decompressed page drawing streams.
// No renderer mocks: these checks catch image placement and pagination failures.
function inspectPdf(bytes) {
  const source = bytes.toString('latin1');
  const objects = new Map([...source.matchAll(/(?:^|\n)(\d+) 0 obj\n([\s\S]*?)\nendobj/g)].map(match => [match[1], match[2]]));
  const pages = [...objects.values()].filter(value => /\/Type \/Page\s/.test(value)).map(page => {
    const contents = objects.get(page.match(/\/Contents (\d+) 0 R/)[1]);
    const data = Buffer.from(contents.match(/stream\r?\n([\s\S]*)\r?\nendstream/)[1], 'latin1');
    return /\/FlateDecode\b/.test(contents) ? inflateSync(data).toString('latin1') : data.toString('latin1');
  });
  assert.ok(pages.length, 'PDF has pages');
  assert.match(source, /\/ToUnicode\b/, 'Embedded text has a Unicode mapping');
  for (const page of pages) {
    assert.match(page, /BT\b[\s\S]*?Tj\b/, 'Page contains selectable text');
    for (const position of page.matchAll(/([\d.+-]+) ([\d.+-]+) Td\b/g)) {
      assert.ok(Number(position[2]) >= 25 && Number(position[2]) <= 805, 'Text stays inside A4 margins, including the footer');
    }
  }
  return { pages, imageObjects: [...objects.values()].filter(value => /\/Subtype \/Image\b/.test(value)), source };
}

async function save(name, invoice, rows, logo = null) {
  const result = await createInvoicePdf(invoice, rows, fonts, logo);
  assert.equal(result.blob.type, 'application/pdf');
  const bytes = Buffer.from(await result.blob.arrayBuffer());
  assert.equal(bytes.subarray(0, 5).toString(), '%PDF-');
  await writeFile(new URL(name, output), bytes);
  return { ...result, ...inspectPdf(bytes) };
}
const short = await save('invoice-short.pdf', details, items);
assert.equal(short.filename, 'invoice-QA-2026-0912.pdf');
assert.equal(short.imageObjects.length, 0, 'No logo does not embed images');
const omittedLogo = await createInvoicePdf(details, items, fonts);
assert.deepEqual(inspectPdf(Buffer.from(await omittedLogo.blob.arrayBuffer())).pages, short.pages, 'Existing third-argument font API and explicit null have identical layout');
const longDetails = { ...details, number: 'QA-MULTIPAGE', fromAddress: 'A detailed test address line\n'.repeat(35), notes: 'A long service note for verifying safe page breaks. '.repeat(38) };
const longItems = Array.from({ length: 50 }, (_, index) => ({ id: index + 1, description: `Work package ${index + 1}: ` + 'Detailed delivery with documentation and review. '.repeat(5), quantity: '1', rate: '80' }));
const long = await save('invoice-long.pdf', longDetails, longItems);
assert.ok(long.pages.length > 1);

async function pngLogo(width, height, transparent = false) {
  const data = await sharp({ create: { width, height, channels: transparent ? 4 : 3, background: { r: 199, g: 70, b: 32, alpha: transparent ? 0.55 : 1 } } }).png().toBuffer();
  return { dataUrl: `data:image/png;base64,${data.toString('base64')}`, width, height };
}
const wideLogo = await pngLogo(1200, 150);
const tallLogo = await pngLogo(100, 550);
const transparentLogo = await pngLogo(400, 200, true);
const brandBytes = await sharp(fileURLToPath(new URL('../public/images/logo/skilllinkup-brand.png', import.meta.url))).resize({ width: 1200, height: 550, fit: 'inside', withoutEnlargement: true }).png().toBuffer();
const brandDimensions = await sharp(brandBytes).metadata();
const brandLogo = { dataUrl: `data:image/png;base64,${brandBytes.toString('base64')}`, width: brandDimensions.width, height: brandDimensions.height };
const mm = points => Number(points) * 25.4 / 72;
function checkLogo(pdf, logo, original) {
  const draws = pdf.pages.map(page => [...page.matchAll(/([\d.+-]+) 0 0 ([\d.+-]+) ([\d.+-]+) ([\d.+-]+) cm\s+\/I\d+ Do\b/g)]);
  assert.equal(draws[0].length, 1, 'Logo is drawn once on the first page');
  assert.ok(draws.slice(1).every(page => page.length === 0), 'Logo is not repeated on continuation pages');
  const [, width, height, x, bottom] = draws[0][0];
  const expectedScale = Math.min(48 / logo.width, 22 / logo.height);
  assert.ok(Math.abs(mm(width) - logo.width * expectedScale) < 0.001, 'Logo width uses the actual image aspect ratio');
  assert.ok(Math.abs(mm(height) - logo.height * expectedScale) < 0.001, 'Logo height uses the actual image aspect ratio');
  assert.ok(Math.abs(mm(x) - 14) < 0.001 && Math.abs(mm(bottom) + mm(height) - 283) < 0.01, 'Logo stays at the top-left margin');
  const headerY = page => Number(page.match(/[\d.+-]+ ([\d.+-]+) Td\b/)[1]);
  assert.ok(Math.abs(mm(headerY(original.pages[0]) - headerY(pdf.pages[0])) - mm(height) - 6) < 0.001, 'Invoice header follows the logo with a 6 mm gap');
  assert.ok(pdf.imageObjects.some(image => image.includes(`/Width ${logo.width}\n`) && image.includes(`/Height ${logo.height}\n`)), 'Original PNG pixels are embedded in the PDF');
}
for (const [name, logo] of [['wide', wideLogo], ['tall', tallLogo], ['transparent', transparentLogo], ['brand', brandLogo]]) {
  // Deliberately incorrect caller dimensions prove that the PNG itself controls
  // placement, instead of trusting potentially stale picker metadata.
  const pdf = await save(`invoice-logo-${name}.pdf`, details, items, { ...logo, width: 1, height: 1 });
  checkLogo(pdf, logo, short);
  assert.equal(pdf.pages.length, 1, `${name} logo fits on a short invoice`);
  if (name === 'transparent') assert.match(pdf.source, /\/SMask \d+ 0 R/, 'PNG alpha channel remains a PDF transparency mask');
}
const longWithLogo = await save('invoice-logo-long.pdf', longDetails, longItems, tallLogo);
checkLogo(longWithLogo, tallLogo, long);
assert.ok(longWithLogo.pages.length >= long.pages.length && longWithLogo.pages.length <= long.pages.length + 1, 'Logo space flows through the existing table pagination');

const mislabeledJpeg = await sharp({ create: { width: 2, height: 2, channels: 3, background: '#000000' } }).jpeg().toBuffer();
const corruptPng = Buffer.from(wideLogo.dataUrl.split(',')[1], 'base64');
corruptPng[29] ^= 255; // Break the IHDR CRC while retaining a valid PNG signature.
for (const logo of [
  {}, false, { dataUrl: 'https://example.com/logo.png' }, { dataUrl: 'data:image/svg+xml;base64,PHN2Zy8+' },
  { dataUrl: 'data:image/png;base64,??==' }, { dataUrl: 'data:image/png;base64,AAAA' },
  { dataUrl: `data:image/jpeg;base64,${mislabeledJpeg.toString('base64')}` },
  { dataUrl: `data:image/png;base64,${mislabeledJpeg.toString('base64')}` },
  { dataUrl: `data:image/png;base64,${corruptPng.toString('base64')}` },
  { dataUrl: `data:image/png;base64,${corruptPng.subarray(0, 30).toString('base64')}` },
]) {
  await assert.rejects(createInvoicePdf(details, items, fonts, logo), /company logo.*valid PNG/);
}
await assert.rejects(createInvoicePdf(details, items, undefined, { dataUrl: 'invalid' }), /company logo.*valid PNG/, 'Invalid logo fails locally before any font request');
await assert.rejects(createInvoicePdf({ ...details, due: '' }, items, fonts), /required/);
await assert.rejects(createInvoicePdf({ ...details, due: '2026-09-01' }, items, fonts), /due date/);
await assert.rejects(createInvoicePdf(details, [{ ...items[0], description: '  ' }], fonts), /required/);
await assert.rejects(createInvoicePdf({ ...details, from: 'Unsupported 😀' }, items, fonts), /Some characters/);
await assert.rejects(createInvoicePdf(details, [{ ...items[0], rate: '-1' }], fonts), /non-negative/);
assert.equal(invoiceFilename('../a/b:2026'), 'invoice-a-b-2026.pdf');
console.log(`PDF export checks passed: wide/tall/transparent/branded logos, PNG validation, aspect ratio, selectable text, and ${longWithLogo.pages.length}-page logo pagination. Seven QA documents saved in .codex-runtime/pdf-qa for visual verification.`);
