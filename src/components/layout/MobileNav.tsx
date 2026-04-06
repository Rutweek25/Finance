import { NavLink } from 'react-router-dom'
import styles from './MobileNav.module.css'
import { ROUTES } from '../../constants/routes'

export const MobileNav = () => {
  const navItems = [
    { label: 'Dashboard', path: ROUTES.HOME, icon: '📊' },
    { label: 'Transactions', path: ROUTES.TRANSACTIONS, icon: '💳' },
    { label: 'Insights', path: ROUTES.INSIGHTS, icon: '📈' },
    { label: 'Settings', path: ROUTES.SETTINGS, icon: '⚙️' },
  ]

  return (
    <nav className={styles.mobileNav}>
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
          title={item.label}
        >
          <span className={styles.icon}>{item.icon}</span>
          <span className={styles.label}>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
