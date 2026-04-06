import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { CategoryBreakdown } from '../../types/dashboard.types'
import styles from './TopCategoriesChart.module.css'

interface TopCategoriesChartProps {
  data: CategoryBreakdown[]
}

export const TopCategoriesChart = ({ data }: TopCategoriesChartProps) => {
  if (data.length === 0) {
    return (
      <div className={styles.chart}>
        <h3 className={styles.title}>Top Categories</h3>
        <div className={styles.empty}>No spending data available</div>
      </div>
    )
  }

  const chartData = data.map((item) => ({
    name: item.name,
    value: item.value,
    color: item.color,
  }))

  return (
    <div className={styles.chart}>
      <h3 className={styles.title}>Top Spending Categories</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
          layout="vertical"
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--border-color)"
            horizontal={false}
          />
          <XAxis type="number" stroke="var(--text-secondary)" />
          <YAxis dataKey="name" type="category" stroke="var(--text-secondary)" width={80} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--bg-secondary)',
              border: `1px solid var(--border-color)`,
              borderRadius: '8px',
              color: 'var(--text-primary)',
            }}
          />
          <Bar dataKey="value" radius={[0, 8, 8, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
