export type TransactionType = 'income' | 'expense'

export type Category =
  | 'Food'
  | 'Transport'
  | 'Housing'
  | 'Entertainment'
  | 'Health'
  | 'Salary'
  | 'Freelance'
  | 'Utilities'
  | 'Education'
  | 'Other'

export interface Transaction {
  id: string
  date: string // ISO format
  amount: number
  category: Category
  type: TransactionType
  description: string
  tags?: string[]
  createdBy: string
  updatedAt: string
}

export interface TransactionFilter {
  searchQuery: string
  type: TransactionType | 'all'
  category: Category | 'all'
  startDate?: string
  endDate?: string
  sortBy: 'date' | 'amount'
  sortOrder: 'asc' | 'desc'
}
