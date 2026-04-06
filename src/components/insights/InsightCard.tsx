import { Insight } from '../../types/dashboard.types'
import { Badge } from '../shared/Badge'
import styles from './InsightCard.module.css'

interface InsightCardProps {
  insight: Insight
}

export const InsightCard = ({ insight }: InsightCardProps) => {
  const icons: Record<string, string> = {
    info: 'ℹ️',
    warning: '⚠️',
    success: '✅',
  }

  return (
    <div className={`${styles.card} ${styles[insight.severity]}`}>
      <div className={styles.icon}>{icons[insight.severity]}</div>
      <div className={styles.content}>
        <h4 className={styles.title}>{insight.title}</h4>
        <p className={styles.description}>{insight.description}</p>
        <Badge variant={insight.severity} size="sm">
          {insight.severity.charAt(0).toUpperCase() + insight.severity.slice(1)}
        </Badge>
      </div>
    </div>
  )
}
