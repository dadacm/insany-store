import { formatCurrency } from '@/utils/formatCurrency';

describe('formatCurrency', () => {
  it('should format positive numbers correctly', () => {
    expect(formatCurrency(100)).toBe('R$ 100,00');
    expect(formatCurrency(1234.56)).toBe('R$ 1.234,56');
    expect(formatCurrency(0.99)).toBe('R$ 0,99');
  });

  it('should handle zero correctly', () => {
    expect(formatCurrency(0)).toBe('R$ 0,00');
  });

  it('should handle negative numbers correctly', () => {
    expect(formatCurrency(-100)).toBe('-R$ 100,00');
    expect(formatCurrency(-1234.56)).toBe('-R$ 1.234,56');
  });

  it('should handle invalid inputs', () => {
    expect(formatCurrency(NaN)).toBe('R$ 0,00');
    expect(formatCurrency(Infinity)).toBe('R$ 0,00');
    expect(formatCurrency(-Infinity)).toBe('R$ 0,00');
    expect(formatCurrency('invalid' as any)).toBe('R$ 0,00');
    expect(formatCurrency(null as any)).toBe('R$ 0,00');
    expect(formatCurrency(undefined as any)).toBe('R$ 0,00');
  });

  it('should handle very large numbers', () => {
    expect(formatCurrency(1000000)).toBe('R$ 1.000.000,00');
    expect(formatCurrency(999999999.99)).toBe('R$ 999.999.999,99');
  });

  it('should handle decimal precision correctly', () => {
    expect(formatCurrency(10.1)).toBe('R$ 10,10');
    expect(formatCurrency(10.12)).toBe('R$ 10,12');
    expect(formatCurrency(10.123)).toBe('R$ 10,12');
  });
});
