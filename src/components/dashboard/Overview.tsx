import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTransactionStore } from '../../store/useTransactionStore'
import { useDashboardMetrics } from '../../hooks/useDashboardMetrics'
import { mockTransactions } from '../../data/mockTransactions'
import { Skeleton } from '../shared/Skeleton'
import { SummaryCard } from './SummaryCard'
import { BalanceTrendChart } from './BalanceTrendChart'
import { SpendingBreakdownChart } from './SpendingBreakdownChart'
import { RecentActivity } from './RecentActivity'
import styles from './Overview.module.css'

export const Overview = () => {
  const [isLoading, setIsLoading] = useState(true)
  const transactions = useTransactionStore((state) => state.transactions)
  const { metrics, trendData, categoryBreakdown } = useDashboardMetrics(transactions)

  useEffect(() => {
    const initializeTransactions = async () => {
      if (transactions.length === 0) {
        mockTransactions.forEach((tx) => {
          useTransactionStore.getState().addTransaction(tx)
        })
      }
      // Simulate loading delay
      await new Promise((resolve) => setTimeout(resolve, 800))
      setIsLoading(false)
    }

    initializeTransactions()
  }, [])

  if (isLoading) {
    return (
      <div className={styles.overview}>
        <div className={styles.header}>
          <Skeleton width="200px" height="32px" />
        </div>
        <div className={styles.grid}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={styles.skeletonCard}>
              <Skeleton width="100%" height="120px" />
            </div>
          ))}
        </div>
        <div className={styles.chartsGrid}>
          <Skeleton width="100%" height="300px" />
          <Skeleton width="100%" height="300px" />
        </div>
      </div>
    )
  }

  return (
    <motion.div 
      className={styles.overview}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.header 
        className={styles.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.h1 
          className={styles.title}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Overview
        </motion.h1>
      </motion.header>

      <motion.div 
        className={styles.grid}
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.5
            }
          }
        }}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
          <SummaryCard
            title="Total Balance"
            value={metrics.totalBalance}
            change={metrics.balanceChange}
            icon="💰"
          />
        </motion.div>
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
          <SummaryCard
            title="Monthly Income"
            value={metrics.monthlyIncome}
            change={metrics.incomeChange}
            icon="📈"
            trend="up"
          />
        </motion.div>
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
          <SummaryCard
            title="Monthly Expenses"
            value={metrics.monthlyExpenses}
            change={metrics.expenseChange}
            icon="📉"
            trend="down"
          />
        </motion.div>
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
          <SummaryCard
            title="Savings Rate"
            value={metrics.savingsRate}
            suffix="%"
            icon="🎯"
            isPercentage
          />
        </motion.div>
      </motion.div>

      <motion.div 
        className={styles.chartsGrid}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <BalanceTrendChart data={trendData} />
        <SpendingBreakdownChart data={categoryBreakdown} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.0 }}
      >
        <RecentActivity transactions={transactions.slice(0, 5)} />
      </motion.div>
    </motion.div>
  )
}
