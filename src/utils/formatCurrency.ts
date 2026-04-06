export const formatCurrency = (amount: number, locale = 'en-US'): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export const formatCurrencyCompact = (amount: number): string => {
  const absAmount = Math.abs(amount)
  if (absAmount >= 1_000_000) {
    return `$${(amount / 1_000_000).toFixed(1)}M`
  }
  if (absAmount >= 1_000) {
    return `$${(amount / 1_000).toFixed(1)}K`
  }
  return formatCurrency(amount)
}

export const parseAmount = (value: string | number): number => {
  if (typeof value === 'number') return value
  return parseFloat(value.replace(/[^0-9.-]/g, '')) || 0
}
