import { ImgHTMLAttributes } from 'react'
import styles from './Avatar.module.css'

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  src?: string
  alt: string
  name?: string
  size?: 'sm' | 'md' | 'lg'
  fallback?: string
}

export const Avatar = ({
  src,
  alt,
  name,
  size = 'md',
  fallback,
  ...props
}: AvatarProps) => {
  const initials = name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || fallback

  return (
    <div className={`${styles.avatar} ${styles[size]}`}>
      {src ? (
        <img src={src} alt={alt} {...props} />
      ) : (
        <div className={styles.fallback}>{initials}</div>
      )}
    </div>
  )
}
