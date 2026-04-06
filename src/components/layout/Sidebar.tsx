import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useUIStore } from '../../store/useUIStore'
import styles from './Sidebar.module.css'
import { ROUTES } from '../../constants/routes'

export const Sidebar = () => {
  const sidebarCollapsed = useUIStore((state) => state.sidebarCollapsed)

  const navItems = [
    { label: 'Dashboard', path: ROUTES.HOME, icon: '📊' },
    { label: 'Transactions', path: ROUTES.TRANSACTIONS, icon: '💳' },
    { label: 'Insights', path: ROUTES.INSIGHTS, icon: '📈' },
    { label: 'Settings', path: ROUTES.SETTINGS, icon: '⚙️' },
  ]

  return (
    <motion.aside 
      className={`${styles.sidebar} ${sidebarCollapsed ? styles.collapsed : ''}`}
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div 
        className={styles.logo}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <motion.div 
          className={styles.logoIcon}
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ duration: 0.6 }}
        >
          Z
        </motion.div>
        {!sidebarCollapsed && (
          <motion.span 
            className={styles.logoText}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Zorvyan
          </motion.span>
        )}
      </motion.div>

      <nav className={styles.nav}>
        {navItems.map((item, index) => (
          <motion.div
            key={item.path}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
          >
            <NavLink
              to={item.path}
              className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
              title={item.label}
            >
              {({ isActive }) => (
                <>
                  <motion.span 
                    className={styles.navIcon}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                  >
                    {item.icon}
                  </motion.span>
                  {!sidebarCollapsed && (
                    <motion.span 
                      className={styles.navLabel}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </>
              )}
            </NavLink>
          </motion.div>
        ))}
      </nav>

      <motion.div 
        className={styles.footer}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <p className={styles.version}>{!sidebarCollapsed && 'v1.0.0'}</p>
      </motion.div>
    </motion.aside>
  )
}
