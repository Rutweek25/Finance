import { ReactNode } from 'react'
import styles from './Badge.module.css'

interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'sm' | 'md'
  children: ReactNode
  icon?: ReactNode
}

export const Badge = ({ variant = 'default', size = 'md', children, icon }: BadgeProps) => {
  return (
    <span className={`${styles.badge} ${styles[variant]} ${styles[`size-${size}`]}`}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </span>
  )
}
