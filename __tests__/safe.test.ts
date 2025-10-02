/**
 * Unit tests for safe utility functions
 * Ensures data handling functions prevent crashes from edge cases
 */

import { describe, test, expect } from '@jest/globals';
import { safeImage, safeText, safeArray, safeNumber, safeBoolean } from '../lib/safe';
import { DEFAULTS } from '../lib/defaults';

describe('safeImage', () => {
  test('returns fallback for undefined', () => {
    expect(safeImage(undefined)).toBe(DEFAULTS.featureImg);
  });

  test('returns fallback for null', () => {
    expect(safeImage(null)).toBe(DEFAULTS.featureImg);
  });

  test('returns fallback for empty string', () => {
    expect(safeImage('')).toBe(DEFAULTS.featureImg);
  });

  test('returns fallback for whitespace-only string', () => {
    expect(safeImage('   ')).toBe(DEFAULTS.featureImg);
  });

  test('returns trimmed valid URL', () => {
    expect(safeImage('https://example.com/image.jpg')).toBe('https://example.com/image.jpg');
  });

  test('returns trimmed URL with surrounding whitespace', () => {
    expect(safeImage('  https://example.com/image.jpg  ')).toBe('https://example.com/image.jpg');
  });

  test('uses custom fallback when provided', () => {
    expect(safeImage(null, '/custom.jpg')).toBe('/custom.jpg');
  });
});

describe('safeText', () => {
  test('returns fallback for undefined', () => {
    expect(safeText(undefined, 'fallback')).toBe('fallback');
  });

  test('returns fallback for null', () => {
    expect(safeText(null, 'fallback')).toBe('fallback');
  });

  test('returns fallback for empty string', () => {
    expect(safeText('', 'fallback')).toBe('fallback');
  });

  test('returns fallback for whitespace-only', () => {
    expect(safeText('   ', 'fallback')).toBe('fallback');
  });

  test('returns trimmed text', () => {
    expect(safeText(' hello world ')).toBe('hello world');
  });

  test('returns non-string as fallback', () => {
    expect(safeText(123, 'fallback')).toBe('fallback');
  });
});

describe('safeArray', () => {
  test('returns empty array for undefined', () => {
    expect(safeArray(undefined)).toEqual([]);
  });

  test('returns empty array for null', () => {
    expect(safeArray(null)).toEqual([]);
  });

  test('returns empty array for non-array', () => {
    expect(safeArray('string')).toEqual([]);
    expect(safeArray(123)).toEqual([]);
    expect(safeArray({})).toEqual([]);
  });

  test('filters out falsy values', () => {
    expect(safeArray([0, null, false, '', 'valid', undefined])).toEqual(['valid']);
  });

  test('preserves truthy values', () => {
    expect(safeArray([1, 'a', true, { obj: 'value' }])).toHaveLength(4);
  });

  test('returns empty array for array of all falsy values', () => {
    expect(safeArray([null, undefined, false, 0, ''])).toEqual([]);
  });
});

describe('safeNumber', () => {
  test('returns fallback for undefined', () => {
    expect(safeNumber(undefined, 42)).toBe(42);
  });

  test('returns fallback for null', () => {
    expect(safeNumber(null, 42)).toBe(42);
  });

  test('returns fallback for NaN', () => {
    expect(safeNumber(NaN, 42)).toBe(42);
  });

  test('returns fallback for non-numeric string', () => {
    expect(safeNumber('abc', 42)).toBe(42);
  });

  test('converts numeric string', () => {
    expect(safeNumber('123')).toBe(123);
    expect(safeNumber('45.67')).toBe(45.67);
  });

  test('returns number as-is', () => {
    expect(safeNumber(100)).toBe(100);
    expect(safeNumber(0)).toBe(0);
    expect(safeNumber(-50)).toBe(-50);
  });

  test('uses default fallback of 0', () => {
    expect(safeNumber(undefined)).toBe(0);
  });
});

describe('safeBoolean', () => {
  test('returns true for boolean true', () => {
    expect(safeBoolean(true)).toBe(true);
  });

  test('returns false for boolean false', () => {
    expect(safeBoolean(false)).toBe(false);
  });

  test('returns true for "true" string', () => {
    expect(safeBoolean('true')).toBe(true);
    expect(safeBoolean('TRUE')).toBe(true);
    expect(safeBoolean('1')).toBe(true);
    expect(safeBoolean('yes')).toBe(true);
    expect(safeBoolean('y')).toBe(true);
  });

  test('returns false for "false" string', () => {
    expect(safeBoolean('false')).toBe(false);
    expect(safeBoolean('FALSE')).toBe(false);
    expect(safeBoolean('0')).toBe(false);
    expect(safeBoolean('no')).toBe(false);
    expect(safeBoolean('n')).toBe(false);
  });

  test('returns true for non-zero numbers', () => {
    expect(safeBoolean(1)).toBe(true);
    expect(safeBoolean(-1)).toBe(true);
    expect(safeBoolean(100)).toBe(true);
  });

  test('returns false for zero', () => {
    expect(safeBoolean(0)).toBe(false);
  });

  test('returns fallback for invalid values', () => {
    expect(safeBoolean(undefined, true)).toBe(true);
    expect(safeBoolean(null, true)).toBe(true);
    expect(safeBoolean({}, false)).toBe(false);
    expect(safeBoolean([], true)).toBe(true);
  });

  test('uses default fallback of false', () => {
    expect(safeBoolean(undefined)).toBe(false);
  });
});
