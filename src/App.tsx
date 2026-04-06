import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useUIStore } from './store/useUIStore'
import { useEffect } from 'react'
import { ROUTES } from './constants/routes'
import { AppShell } from './components/layout/AppShell'
import { Overview } from './components/dashboard/Overview'
import { TransactionsPage } from './components/transactions/TransactionsPage'
import { InsightsPanel } from './components/insights/InsightsPanel'
import { Settings } from './components/pages/Settings'
import './index.css'

function App() {
  const darkMode = useUIStore((state) => state.darkMode)

  useEffect(() => {
    const theme = darkMode ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', theme)
  }, [darkMode])

  return (
    <Router>
      <AppShell>
        <Routes>
          <Route path={ROUTES.HOME} element={<Overview />} />
          <Route path={ROUTES.TRANSACTIONS} element={<TransactionsPage />} />
          <Route path={ROUTES.INSIGHTS} element={<InsightsPanel />} />
          <Route path={ROUTES.SETTINGS} element={<Settings />} />
        </Routes>
      </AppShell>
    </Router>
  )
}

export default App
