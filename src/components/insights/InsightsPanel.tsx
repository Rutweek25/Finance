import { useTransactionStore } from '../../store/useTransactionStore'
import { useDashboardMetrics } from '../../hooks/useDashboardMetrics'
import { InsightCard } from './InsightCard'
import { MonthComparisonChart } from './MonthComparisonChart'
import { TopCategoriesChart } from './TopCategoriesChart'
import styles from './InsightsPanel.module.css'

export const InsightsPanel = () => {
  const transactions = useTransactionStore((state) => state.transactions)
  const { insights, topCategories, metrics } = useDashboardMetrics(transactions)

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Financial Insights</h1>
        <p className={styles.subtitle}>
          Deep dive into your spending patterns and financial health
        </p>
      </header>

      <div className={styles.insightsGrid}>
        {insights.length > 0 ? (
          insights.map((insight) => (
            <InsightCard key={insight.id} insight={insight} />
          ))
        ) : (
          <p className={styles.noInsights}>No insights available yet</p>
        )}
      </div>

      <div className={styles.chartsGrid}>
        <MonthComparisonChart transactions={transactions} />
        <TopCategoriesChart data={topCategories} />
      </div>

      <div className={styles.metricsCard}>
        <h3 className={styles.metricsTitle}>Key Metrics Summary</h3>
        <div className={styles.metricsList}>
          <div className={styles.metricItem}>
            <span>Savings Rate:</span>
            <strong>{metrics.savingsRate.toFixed(1)}%</strong>
          </div>
          <div className={styles.metricItem}>
            <span>Monthly Income:</span>
            <strong>${metrics.monthlyIncome.toFixed(2)}</strong>
          </div>
          <div className={styles.metricItem}>
            <span>Monthly Expenses:</span>
            <strong>${metrics.monthlyExpenses.toFixed(2)}</strong>
          </div>
          <div className={styles.metricItem}>
            <span>Total Balance:</span>
            <strong>${metrics.totalBalance.toFixed(2)}</strong>
          </div>
        </div>
      </div>
    </div>
  )
}
