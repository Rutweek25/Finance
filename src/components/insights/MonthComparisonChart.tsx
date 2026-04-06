import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Transaction } from '../../types/transaction.types'
import { deriveTrendData } from '../../utils/deriveMetrics'
import styles from './MonthComparisonChart.module.css'

interface MonthComparisonChartProps {
  transactions: Transaction[]
}

export const MonthComparisonChart = ({ transactions }: MonthComparisonChartProps) => {
  const data = deriveTrendData(transactions)

  return (
    <div className={styles.chart}>
      <h3 className={styles.title}>Monthly Comparison</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
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
          <Bar dataKey="income" fill="var(--zorvyan-green)" radius={[8, 8, 0, 0]} />
          <Bar
            dataKey="expense"
            fill="var(--zorvyan-red)"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
