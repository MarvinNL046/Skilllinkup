// Supported currencies use two minor-unit digits. Round each line, then tax,
// half up using integer arithmetic so displayed lines reconcile with the total.
export const INVOICE_CURRENCIES = ['USD', 'EUR', 'GBP'];
function hundredths(value, maximum, label, allowZero = true) {
  const text = String(value).trim();
  if (!/^\d+(\.\d{1,2})?$/.test(text)) throw new Error(`${label} must be a non-negative number with at most two decimal places.`);
  const [whole, fraction = ''] = text.split('.');
  const result = BigInt(whole) * 100n + BigInt(fraction.padEnd(2, '0'));
  if (result > BigInt(maximum) * 100n || (!allowZero && result === 0n)) throw new Error(`${label} is outside the supported range.`);
  return result;
}
export function calculateInvoice(items, taxRate) {
  if (!Array.isArray(items) || items.length < 1 || items.length > 50) throw new Error('Use between 1 and 50 line items.');
  const lineCents = items.map(item => {
    const quantity = hundredths(item.quantity, 100000, 'Quantity', false);
    const rate = hundredths(item.rate, 1000000, 'Unit rate');
    return Number((quantity * rate + 50n) / 100n);
  });
  const subtotalCents = lineCents.reduce((sum, amount) => sum + amount, 0);
  const tax = hundredths(taxRate, 100, 'Tax rate');
  const taxCents = Number((BigInt(subtotalCents) * tax + 5000n) / 10000n);
  const totalCents = subtotalCents + taxCents;
  if (!Number.isSafeInteger(totalCents)) throw new Error('The invoice total is too large.');
  return { lineCents, subtotalCents, taxCents, totalCents };
}
export function formatInvoiceMoney(cents, currency) {
  if (!INVOICE_CURRENCIES.includes(currency)) throw new Error('Unsupported currency.');
  return new Intl.NumberFormat('en', { style: 'currency', currency, currencyDisplay: 'code' }).format(cents / 100);
}
