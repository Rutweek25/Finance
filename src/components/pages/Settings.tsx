import { RoleSwitcher } from '../auth/RoleSwitcher'
import { useUIStore } from '../../store/useUIStore'
import { Button } from '../shared/Button'
import styles from './Settings.module.css'

export const Settings = () => {
  const darkMode = useUIStore((state) => state.darkMode)
  const toggleDarkMode = useUIStore((state) => state.toggleDarkMode)

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Settings</h1>
        <p className={styles.subtitle}>Manage your preferences and application settings</p>
      </header>

      <div className={styles.settingsGrid}>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Theme</h3>
          <div className={styles.card}>
            <div className={styles.setting}>
              <div>
                <p className={styles.settingLabel}>Dark Mode</p>
                <p className={styles.settingDescription}>
                  {darkMode ? 'Enable light' : 'Enable dark'} mode for the dashboard
                </p>
              </div>
              <Button onClick={toggleDarkMode}>
                {darkMode ? '☀️ Light' : '🌙 Dark'}
              </Button>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Demo Controls</h3>
          <div className={styles.card}>
            <RoleSwitcher />
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>About</h3>
          <div className={styles.card}>
            <div className={styles.aboutContent}>
              <h4>Zorvyan Dashboard</h4>
              <p>Version 1.0.0</p>
              <p>Production-grade React finance dashboard for internal financial management</p>
              <div className={styles.stack}>
                <h5>Tech Stack</h5>
                <ul>
                  <li>React 18 with TypeScript</li>
                  <li>Recharts for data visualization</li>
                  <li>React Router v6 for navigation</li>
                  <li>Zustand for state management</li>
                  <li>CSS Modules + CSS variables</li>
                  <li>date-fns for date handling</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
