import assert from 'node:assert/strict';
import { calculateInvoice, formatInvoiceMoney } from '../src/lib/invoice.mjs';

assert.deepEqual(calculateInvoice([{ quantity: '2', rate: '125.50' }, { quantity: '1.5', rate: '80' }], '21'), { lineCents: [25100, 12000], subtotalCents: 37100, taxCents: 7791, totalCents: 44891 });
assert.deepEqual(calculateInvoice([{ quantity: '0.5', rate: '0.01' }, { quantity: '0.5', rate: '0.01' }], '25'), { lineCents: [1, 1], subtotalCents: 2, taxCents: 1, totalCents: 3 });
assert.equal(calculateInvoice([{ quantity: '3', rate: '0.10' }], '0').totalCents, 30);
assert.equal(calculateInvoice([{ quantity: '1', rate: '0' }], '0').totalCents, 0);
for (const value of ['-1', '', 'NaN', 'Infinity', '1e3', '1.001', '1000001']) assert.throws(() => calculateInvoice([{ quantity: '1', rate: value }], '0'));
for (const quantity of ['0', '-1', '100001']) assert.throws(() => calculateInvoice([{ quantity, rate: '1' }], '0'));
for (const tax of ['-1', '101', '0.001', '']) assert.throws(() => calculateInvoice([{ quantity: '1', rate: '1' }], tax));
assert.throws(() => calculateInvoice([], '0'));
assert.throws(() => calculateInvoice(Array(51).fill({ quantity: '1', rate: '1' }), '0'));
const max = calculateInvoice(Array(50).fill({ quantity: '100000', rate: '1000000' }), '100');
assert.ok(Number.isSafeInteger(max.totalCents));
assert.equal(max.totalCents, 1000000000000000);
for (const currency of ['EUR', 'USD', 'GBP']) assert.ok(formatInvoiceMoney(44891, currency).includes(currency));
assert.throws(() => formatInvoiceMoney(100, 'JPY'));
console.log('Invoice checks passed: line rounding, tax rounding, totals, bounds, malformed input and currencies.');
