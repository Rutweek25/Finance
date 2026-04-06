import { motion } from '../../utils/motion'
import { Transaction } from '../../types/transaction.types'
import { CATEGORY_ICONS } from '../../constants/categories'
import { formatCurrency } from '../../utils/formatCurrency'
import { Badge } from '../shared/Badge'
import { EmptyState } from '../shared/EmptyState'
import styles from './RecentActivity.module.css'

interface RecentActivityProps {
  transactions: Transaction[]
}

export const RecentActivity = ({ transactions }: RecentActivityProps) => {
  if (transactions.length === 0) {
    return (
      <motion.div 
        className={styles.container}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h3 
          className={styles.title}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          Recent Activity
        </motion.h3>
        <EmptyState title="No transactions yet" description="Your recent transactions will appear here." />
      </motion.div>
    )
  }

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h3 
        className={styles.title}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        Recent Activity
      </motion.h3>
      <motion.div 
        className={styles.list}
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.3
            }
          }
        }}
        initial="hidden"
        animate="show"
      >
        {transactions.map((tx) => (
          <motion.div 
            key={tx.id} 
            className={styles.item}
            variants={{ 
              hidden: { opacity: 0, x: -20 }, 
              show: { opacity: 1, x: 0 } 
            }}
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div 
              className={styles.icon}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            >
              {CATEGORY_ICONS[tx.category] || '📌'}
            </motion.div>
            <div className={styles.details}>
              <p className={styles.description}>{tx.description}</p>
              <p className={styles.metadata}>
                {tx.category} • {new Date(tx.date).toLocaleDateString()}
              </p>
            </div>
            <div className={styles.amount}>
              <Badge
                variant={tx.type === 'income' ? 'success' : 'danger'}
                size="sm"
              >
                {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
              </Badge>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
