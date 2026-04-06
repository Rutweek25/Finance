import { motion } from '../../utils/motion'
import { useUIStore } from '../../store/useUIStore'
import { useAuthStore } from '../../store/useAuthStore'
import { Avatar } from '../shared/Avatar'
import { Button } from '../shared/Button'
import styles from './TopBar.module.css'

export const TopBar = () => {
  const darkMode = useUIStore((state) => state.darkMode)
  const toggleDarkMode = useUIStore((state) => state.toggleDarkMode)
  const toggleSidebar = useUIStore((state) => state.toggleSidebar)
  const currentUser = useAuthStore((state) => state.currentUser)

  return (
    <motion.header 
      className={styles.topBar}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className={styles.left}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button variant="ghost" size="sm" icon="☰" onClick={toggleSidebar} />
        </motion.div>
      </div>

      <motion.div 
        className={styles.center}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h1 className={styles.title}>Zorvyan Dashboard</h1>
      </motion.div>

      <div className={styles.right}>
        <motion.div
          whileHover={{ scale: 1.05, rotate: 15 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="ghost"
            size="sm"
            icon={darkMode ? '☀️' : '🌙'}
            onClick={toggleDarkMode}
            title={darkMode ? 'Light mode' : 'Dark mode'}
          />
        </motion.div>

        {currentUser && (
          <motion.div 
            className={styles.userInfo}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Avatar
              alt={currentUser.name}
              name={currentUser.name}
              fallback={currentUser.avatar}
              size="sm"
            />
            <div className={styles.userDetails}>
              <div className={styles.userName}>{currentUser.name}</div>
              <div className={styles.userRole}>{currentUser.role}</div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}
