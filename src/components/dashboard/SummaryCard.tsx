import { useEffect, useRef } from 'react'
import { motion } from '../../utils/motion'
import { formatCurrency } from '../../utils/formatCurrency'
import styles from './SummaryCard.module.css'

interface SummaryCardProps {
  title: string
  value: number
  change?: number
  icon?: string
  suffix?: string
  trend?: 'up' | 'down'
  isPercentage?: boolean
}

export const SummaryCard = ({
  title,
  value,
  change = 0,
  icon,
  suffix = '',
  trend,
  isPercentage = false,
}: SummaryCardProps) => {
  const displayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!displayRef.current) return

    const duration = 1000
    const start = Date.now()
    const startValue = 0

    const animate = () => {
      if (!displayRef.current) return

      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const current = startValue + (Math.abs(value) * progress) * (value < 0 ? -1 : 1)

      if (isPercentage) {
        displayRef.current.textContent = `${Math.round(current)}${suffix}`
      } else {
        displayRef.current.textContent = formatCurrency(current)
      }

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    animate()
  }, [value, suffix, isPercentage])

  const isPositive = change >= 0
  const changeIcon = trend ? (trend === 'up' ? '📈' : '📉') : isPositive ? '▲' : '▼'

  return (
    <motion.div 
      className={styles.card}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)"
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {icon && (
        <motion.div 
          className={styles.icon}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          {icon}
        </motion.div>
      )}

      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        <motion.div 
          className={styles.valueWrapper}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div ref={displayRef} className={styles.value}>
            {isPercentage ? `${Math.round(value)}${suffix}` : formatCurrency(value)}
          </div>
        </motion.div>

        {change !== 0 && (
          <motion.div 
            className={`${styles.change} ${isPositive ? styles.positive : styles.negative}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span>{changeIcon}</span>
            <span>{Math.abs(change).toFixed(1)}%</span>
            <span className={styles.label}>vs last month</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
