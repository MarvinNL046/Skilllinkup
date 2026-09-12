import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';
import { calculateInvoice, formatInvoiceMoney, INVOICE_CURRENCIES } from './invoice.mjs';

let fontRequest;
async function loadFonts() {
  if (!fontRequest) {
    fontRequest = Promise.all(['Regular', 'SemiBold'].map(async weight => {
      const response = await fetch(`/fonts/invoice/Inter-${weight}.ttf`);
      if (!response.ok) throw new Error('The PDF font could not be loaded. Please try again.');
      const bytes = new Uint8Array(await response.arrayBuffer());
      let binary = '';
      for (let i = 0; i < bytes.length; i += 8192) binary += String.fromCharCode(...bytes.subarray(i, i + 8192));
      return btoa(binary);
    })).catch(error => { fontRequest = undefined; throw error; });
  }
  return fontRequest;
}

export function invoiceFilename(number) {
  const safe = String(number).normalize('NFKC').replace(/[^\p{L}\p{N}._-]+/gu, '-').replace(/^[.-]+|[.-]+$/g, '').slice(0, 80);
  return `invoice-${safe || 'download'}.pdf`;
}

// Render from invoice data rather than a screenshot: text stays selectable and
// tables can flow over A4 pages. Optional font bytes also allow exact offline QA.
export async function createInvoicePdf(details, items, fonts) {
  const required = [details.number, details.date, details.due, details.from, details.fromAddress, details.to, details.toAddress, ...items.map(item => item.description)];
  if (!required.every(value => typeof value === 'string' && value.trim())) throw new Error('Fill in all required invoice fields.');
  if (details.due < details.date) throw new Error('The due date must be on or after the issue date.');
  if (!INVOICE_CURRENCIES.includes(details.currency)) throw new Error('Unsupported currency.');
  const totals = calculateInvoice(items, details.taxRate);
  const [regular, semibold] = fonts || await loadFonts();
  const doc = new jsPDF({ unit: 'mm', format: 'a4', compress: true, putOnlyUsedFonts: true });
  doc.addFileToVFS('Inter-Regular.ttf', regular);
  doc.addFont('Inter-Regular.ttf', 'Inter', 'normal');
  doc.addFileToVFS('Inter-SemiBold.ttf', semibold);
  doc.addFont('Inter-SemiBold.ttf', 'Inter', 'bold');
  doc.setFont('Inter', 'normal');
  const glyphs = doc.getFont().metadata.cmap.unicode.codeMap;
  const invoiceText = [...Object.values(details), ...items.map(item => item.description)].join('\n');
  if ([...invoiceText].some(character => !/[\r\n\t]/.test(character) && !glyphs[character.codePointAt(0)])) {
    throw new Error('Some characters cannot be included in this PDF yet. Please use Latin, Greek or Cyrillic text and remove emoji before downloading.');
  }
  doc.setProperties({ title: `Invoice ${details.number}`, subject: 'Invoice', creator: 'SkillLinkup invoice generator' });
  const margin = 14;
  const width = 182;
  const ink = [23, 43, 64];
  const line = [225, 231, 235];
  const money = cents => formatInvoiceMoney(cents, details.currency);
  let y = margin;
  function table(options, gap = 7) {
    if (y > 265) { doc.addPage(); y = margin; }
    autoTable(doc, {
      startY: y, margin: { top: margin, right: margin, bottom: 19, left: margin },
      tableWidth: width, theme: 'plain',
      styles: { font: 'Inter', fontSize: 9, textColor: ink, cellPadding: 3, overflow: 'linebreak', valign: 'top' },
      headStyles: { fontStyle: 'bold', textColor: ink },
      ...options,
    });
    y = doc.lastAutoTable.finalY + gap;
  }
  table({ body: [[{ content: 'Invoice', styles: { fontSize: 25, fontStyle: 'bold' } }, { content: details.number, styles: { halign: 'right', fontStyle: 'bold' } }]], columnStyles: { 0: { cellWidth: 80 }, 1: { cellWidth: 102 } } }, 1);
  table({ body: [[`Issued: ${details.date}\nDue: ${details.due}\nCurrency: ${details.currency}`]] });
  table({ head: [['From', 'Bill to']], showHead: 'firstPage', body: [[
    [details.from, details.fromAddress, details.taxId && `Tax / registration ID: ${details.taxId}`].filter(Boolean).join('\n'),
    [details.to, details.toAddress].join('\n'),
  ]], columnStyles: { 0: { cellWidth: 91 }, 1: { cellWidth: 91 } } });
  if (details.reference) table({ body: [[`Client / purchase order reference: ${details.reference}`]] });
  table({
    head: [['Description', 'Qty', 'Rate', 'Amount']],
    body: items.map((item, index) => [item.description, String(item.quantity), money(Math.round(Number(item.rate) * 100)), money(totals.lineCents[index])]),
    showHead: 'everyPage', rowPageBreak: 'avoid',
    headStyles: { fillColor: [244, 247, 249], textColor: ink, fontStyle: 'bold' },
    bodyStyles: { lineColor: line, lineWidth: { bottom: 0.2 }, cellPadding: 4 },
    columnStyles: { 0: { cellWidth: 82 }, 1: { cellWidth: 18, halign: 'right' }, 2: { cellWidth: 41, halign: 'right' }, 3: { cellWidth: 41, halign: 'right' } },
    didParseCell: data => { if (data.section === 'head' && data.column.index > 0) data.cell.styles.halign = 'right'; },
  });
  table({
    tableWidth: 108, margin: { top: margin, right: margin, bottom: 19, left: 88 }, pageBreak: 'avoid',
    body: [['Subtotal', money(totals.subtotalCents)], [`Tax (${details.taxRate}%)`, money(totals.taxCents)], ['Total', money(totals.totalCents)]],
    columnStyles: { 0: { cellWidth: 43 }, 1: { cellWidth: 65, halign: 'right' } },
    didParseCell: data => { if (data.row.index === 2) Object.assign(data.cell.styles, { fontSize: 12, fontStyle: 'bold', lineColor: line, lineWidth: { top: 0.3 }, cellPadding: { top: 5, bottom: 3, left: 3, right: 3 } }); },
  });
  for (const [title, content] of [['Payment instructions', details.payment], ['Notes / service period', details.notes]]) {
    if (content) table({ head: [[title]], body: [[content]], showHead: 'everyPage', rowPageBreak: 'avoid' });
  }
  const pages = doc.getNumberOfPages();
  for (let page = 1; page <= pages; page++) {
    doc.setPage(page); doc.setFont('Inter', 'normal'); doc.setFontSize(8); doc.setTextColor(105, 117, 128);
    doc.text(`${page} / ${pages}`, 196, 287, { align: 'right' });
  }
  return { blob: doc.output('blob'), filename: invoiceFilename(details.number) };
}
