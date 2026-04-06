import { Transaction } from '../types/transaction.types'
import { DashboardMetrics, TrendData, CategoryBreakdown } from '../types/dashboard.types'
import { parse, subMonths, format, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns'

export const deriveDashboardMetrics = (transactions: Transaction[]): DashboardMetrics => {
  const referenceDate = transactions.reduce((latestDate, transaction) => {
    const transactionDate = parse(transaction.date, 'yyyy-MM-dd', new Date())
    return transactionDate > latestDate ? transactionDate : latestDate
  }, transactions.length > 0 ? parse(transactions[0].date, 'yyyy-MM-dd', new Date()) : new Date())

  const currentMonth = startOfMonth(referenceDate)
  const currentMonthEnd = endOfMonth(referenceDate)
  const previousMonthStart = startOfMonth(subMonths(referenceDate, 1))
  const previousMonthEnd = endOfMonth(subMonths(referenceDate, 1))

  const currentMonthTransactions = transactions.filter((tx) => {
    const txDate = parse(tx.date, 'yyyy-MM-dd', new Date())
    return isWithinInterval(txDate, { start: currentMonth, end: currentMonthEnd })
  })

  const previousMonthTransactions = transactions.filter((tx) => {
    const txDate = parse(tx.date, 'yyyy-MM-dd', new Date())
    return isWithinInterval(txDate, { start: previousMonthStart, end: previousMonthEnd })
  })

  const currentIncome = currentMonthTransactions
    .filter((tx) => tx.type === 'income')
    .reduce((sum, tx) => sum + tx.amount, 0)

  const currentExpenses = currentMonthTransactions
    .filter((tx) => tx.type === 'expense')
    .reduce((sum, tx) => sum + tx.amount, 0)

  const previousIncome = previousMonthTransactions
    .filter((tx) => tx.type === 'income')
    .reduce((sum, tx) => sum + tx.amount, 0)

  const previousExpenses = previousMonthTransactions
    .filter((tx) => tx.type === 'expense')
    .reduce((sum, tx) => sum + tx.amount, 0)

  const totalIncome = transactions
    .filter((tx) => tx.type === 'income')
    .reduce((sum, tx) => sum + tx.amount, 0)

  const totalExpenses = transactions
    .filter((tx) => tx.type === 'expense')
    .reduce((sum, tx) => sum + tx.amount, 0)

  const totalBalance = totalIncome - totalExpenses
  const savingsRate = totalIncome > 0 ? (totalBalance / totalIncome) * 100 : 0
  const incomeChange = previousIncome > 0 ? ((currentIncome - previousIncome) / previousIncome) * 100 : 0
  const expenseChange = previousExpenses > 0 ? ((currentExpenses - previousExpenses) / previousExpenses) * 100 : 0

  return {
    totalBalance,
    monthlyIncome: currentIncome,
    monthlyExpenses: currentExpenses,
    savingsRate,
    balanceChange: totalBalance,
    incomeChange,
    expenseChange,
  }
}

export const deriveTrendData = (transactions: Transaction[]): TrendData[] => {
  const trendMap = new Map<string, { income: number; expense: number }>()
  const referenceDate = transactions.reduce((latestDate, transaction) => {
    const transactionDate = parse(transaction.date, 'yyyy-MM-dd', new Date())
    return transactionDate > latestDate ? transactionDate : latestDate
  }, transactions.length > 0 ? parse(transactions[0].date, 'yyyy-MM-dd', new Date()) : new Date())

  const months = Array.from({ length: 6 }, (_, index) =>
    format(subMonths(referenceDate, 5 - index), 'yyyy-MM'),
  )

  transactions
    .forEach((tx) => {
      const monthKey = format(parse(tx.date, 'yyyy-MM-dd', new Date()), 'yyyy-MM')
      const existing = trendMap.get(monthKey) || { income: 0, expense: 0 }

      if (tx.type === 'income') {
        existing.income += tx.amount
      } else {
        existing.expense += tx.amount
      }

      trendMap.set(monthKey, existing)
    })

  let runningBalance = 0
  return months.map((date) => {
    const data = trendMap.get(date) || { income: 0, expense: 0 }
    runningBalance += data.income - data.expense
    return {
      date: format(parse(date, 'yyyy-MM', new Date()), 'MMM'),
      income: data.income,
      expense: data.expense,
      balance: runningBalance,
    }
  })
}

export const deriveCategoryBreakdown = (transactions: Transaction[]): CategoryBreakdown[] => {
  const categoryMap = new Map<string, number>()
  const colors: Record<string, string> = {
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

  transactions
    .filter((tx) => tx.type === 'expense')
    .forEach((tx) => {
      const current = categoryMap.get(tx.category) || 0
      categoryMap.set(tx.category, current + tx.amount)
    })

  const total = Array.from(categoryMap.values()).reduce((sum, val) => sum + val, 0)

  return Array.from(categoryMap.entries())
    .map(([name, value]) => ({
      name,
      value,
      percentage: total > 0 ? (value / total) * 100 : 0,
      color: colors[name] || '#6B7280',
    }))
    .sort((a, b) => b.value - a.value)
}

export const deriveTopCategories = (transactions: Transaction[], limit = 3) => {
  return deriveCategoryBreakdown(transactions).slice(0, limit)
}

export const deriveInsights = (transactions: Transaction[]) => {
  const metrics = deriveDashboardMetrics(transactions)
  const insights = []

  if (metrics.expenseChange > 10) {
    insights.push({
      id: 'exp-high',
      title: `Expenses up ${metrics.expenseChange.toFixed(0)}%`,
      description: 'Your spending is higher than last month',
      severity: 'warning' as const,
      timestamp: new Date().toISOString(),
    })
  }

  if (metrics.savingsRate > 30) {
    insights.push({
      id: 'save-good',
      title: `Great savings rate: ${metrics.savingsRate.toFixed(1)}%`,
      description: 'You\'re saving more than 30% of your income',
      severity: 'success' as const,
      timestamp: new Date().toISOString(),
    })
  }

  const topCategory = deriveCategoryBreakdown(transactions)[0]
  if (topCategory && topCategory.percentage > 30) {
    insights.push({
      id: 'cat-high',
      title: `${topCategory.name} is ${topCategory.percentage.toFixed(0)}% of expenses`,
      description: 'Consider reviewing spending in this category',
      severity: 'info' as const,
      timestamp: new Date().toISOString(),
    })
  }

  return insights
}
