export const CATEGORIES = [
  'Food',
  'Transport',
  'Housing',
  'Entertainment',
  'Health',
  'Salary',
  'Freelance',
  'Utilities',
  'Education',
  'Other',
] as const

export const CATEGORY_COLORS: Record<string, string> = {
  Food: '#EF4444',
  Transport: '#F59E0B',
  Housing: '#0EA5E9',
  Entertainment: '#8B5CF6',
  Health: '#10B981',
  Salary: '#0D1B2A',
  Freelance: '#1A56DB',
  Utilities: '#7C3AED',
  Education: '#06B6D4',
  Other: '#6B7280',
}

export const CATEGORY_ICONS: Record<string, string> = {
  Food: '🍔',
  Transport: '🚗',
  Housing: '🏠',
  Entertainment: '🎬',
  Health: '🏥',
  Salary: '💰',
  Freelance: '💻',
  Utilities: '💡',
  Education: '📚',
  Other: '📌',
}
