import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createInvoicePdf, invoiceFilename } from '../src/lib/invoicePdf.mjs';

const fonts = await Promise.all(['Regular', 'SemiBold'].map(async weight => (await readFile(new URL(`../public/fonts/invoice/Inter-${weight}.ttf`, import.meta.url))).toString('base64')));
const details = { number: 'QA-2026-0912', date: '2026-09-12', due: '2026-09-26', currency: 'EUR', from: 'Studio José & Zoë - TEST ONLY', fromAddress: 'Example Street 1\n1000 AB Test City\nThe Netherlands', to: 'Müller & François - TEST ONLY', toAddress: 'Example Avenue 2\n2000 CD Test City\nGermany', taxId: 'TEST-ID', reference: 'QA reference', taxRate: '21', payment: 'Test document - no payment required.', notes: 'Résumé, façade, naïve, £, €, Ελληνικά, Кириллица.' };
const items = [{ id: 1, description: 'Website implementation', quantity: '2', rate: '125.50' }, { id: 2, description: 'Documentation', quantity: '1.5', rate: '80' }];
const output = new URL('../.codex-runtime/pdf-qa/', import.meta.url);
await mkdir(output, { recursive: true });
async function save(name, invoice, rows) {
  const result = await createInvoicePdf(invoice, rows, fonts);
  assert.equal(result.blob.type, 'application/pdf');
  const bytes = Buffer.from(await result.blob.arrayBuffer());
  assert.equal(bytes.subarray(0, 5).toString(), '%PDF-');
  await writeFile(new URL(name, output), bytes);
  return result;
}
assert.equal((await save('invoice-short.pdf', details, items)).filename, 'invoice-QA-2026-0912.pdf');
await save('invoice-long.pdf', { ...details, number: 'QA-MULTIPAGE', fromAddress: 'A detailed test address line\n'.repeat(35), notes: 'A long service note for verifying safe page breaks. '.repeat(38) }, Array.from({ length: 50 }, (_, index) => ({ id: index + 1, description: `Work package ${index + 1}: ` + 'Detailed delivery with documentation and review. '.repeat(5), quantity: '1', rate: '80' })));
await assert.rejects(createInvoicePdf({ ...details, due: '' }, items, fonts), /required/);
await assert.rejects(createInvoicePdf({ ...details, due: '2026-09-01' }, items, fonts), /due date/);
await assert.rejects(createInvoicePdf(details, [{ ...items[0], description: '  ' }], fonts), /required/);
await assert.rejects(createInvoicePdf({ ...details, from: 'Unsupported 😀' }, items, fonts), /Some characters/);
await assert.rejects(createInvoicePdf(details, [{ ...items[0], rate: '-1' }], fonts), /non-negative/);
assert.equal(invoiceFilename('../a/b:2026'), 'invoice-a-b-2026.pdf');
console.log('PDF export checks passed; short and 50-line documents saved in .codex-runtime/pdf-qa for visual verification.');
