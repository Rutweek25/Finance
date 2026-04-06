export interface DashboardMetrics {
  totalBalance: number
  monthlyIncome: number
  monthlyExpenses: number
  savingsRate: number
  balanceChange: number
  incomeChange: number
  expenseChange: number
}

export interface TrendData {
  date: string
  income: number
  expense: number
  balance: number
}

export interface CategoryBreakdown {
  name: string
  value: number
  percentage: number
  color: string
}

export interface Insight {
  id: string
  title: string
  description: string
  severity: 'info' | 'warning' | 'success'
  timestamp: string
}
