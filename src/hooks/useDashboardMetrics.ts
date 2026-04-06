import { useMemo } from 'react'
import { Transaction } from '../types/transaction.types'
import { deriveDashboardMetrics, deriveTrendData, deriveCategoryBreakdown, deriveTopCategories, deriveInsights } from '../utils/deriveMetrics'

export const useDashboardMetrics = (transactions: Transaction[]) => {
  const metrics = useMemo(() => deriveDashboardMetrics(transactions), [transactions])
  const trendData = useMemo(() => deriveTrendData(transactions), [transactions])
  const categoryBreakdown = useMemo(() => deriveCategoryBreakdown(transactions), [transactions])
  const topCategories = useMemo(() => deriveTopCategories(transactions, 3), [transactions])
  const insights = useMemo(() => deriveInsights(transactions), [transactions])

  return {
    metrics,
    trendData,
    categoryBreakdown,
    topCategories,
    insights,
  }
}
