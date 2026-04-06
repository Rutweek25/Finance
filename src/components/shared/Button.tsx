import { ReactNode } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import styles from './Button.module.css'

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  icon?: ReactNode
  children?: ReactNode
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <motion.button
      className={`${styles.button} ${styles[variant]} ${styles[`size-${size}`]} ${className || ''}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...props}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </motion.button>
  )
}
