export function formatCurrency(value: number): string {
  if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) {
    return 'R$ 0,00';
  }

  const formattedValue = value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formattedValue.replace(/\u00A0/g, ' ');
}
