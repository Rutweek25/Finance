import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { TrendData } from '../../types/dashboard.types'
import styles from './BalanceTrendChart.module.css'

interface BalanceTrendChartProps {
  data: TrendData[]
}

export const BalanceTrendChart = ({ data }: BalanceTrendChartProps) => {
  return (
    <motion.div 
      className={styles.chart}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <motion.h3 
        className={styles.title}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        Balance Trend (6 Months)
      </motion.h3>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border-color)"
              vertical={false}
            />
            <XAxis dataKey="date" stroke="var(--text-secondary)" />
            <YAxis stroke="var(--text-secondary)" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--bg-secondary)',
                border: `1px solid var(--border-color)`,
                borderRadius: '8px',
                color: 'var(--text-primary)',
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="income"
              stroke="var(--zorvyan-green)"
              strokeWidth={2}
              dot={{ fill: 'var(--zorvyan-green)', r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="expense"
              stroke="var(--zorvyan-red)"
              strokeWidth={2}
              dot={{ fill: 'var(--zorvyan-red)', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  )
}
