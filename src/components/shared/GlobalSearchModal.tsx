import { ChangeEvent, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { useTransactionStore } from '../../store/useTransactionStore'
import { Transaction } from '../../types/transaction.types'
import { ROUTES } from '../../constants/routes'
import { formatCurrency } from '../../utils/formatCurrency'
import { Modal } from './Modal'
import { Badge } from './Badge'
import { Button } from './Button'
import styles from './GlobalSearchModal.module.css'

interface GlobalSearchModalProps {
  isOpen: boolean
  onClose: () => void
}

const NAV_ITEMS = [
  { label: 'Dashboard', path: ROUTES.HOME, description: 'Overview and summary cards' },
  { label: 'Transactions', path: ROUTES.TRANSACTIONS, description: 'Filter, sort, and edit activity' },
  { label: 'Insights', path: ROUTES.INSIGHTS, description: 'Spending patterns and trends' },
  { label: 'Settings', path: ROUTES.SETTINGS, description: 'Theme and role demo controls' },
]

export const GlobalSearchModal = ({ isOpen, onClose }: GlobalSearchModalProps) => {
  const navigate = useNavigate()
  const transactions = useTransactionStore((state) => state.transactions)
  const [query, setQuery] = useState('')

  const normalizedQuery = query.trim().toLowerCase()

  const matchingTransactions = useMemo(() => {
    if (!normalizedQuery) {
      return transactions.slice(0, 5)
    }

    return transactions
      .filter((transaction) => {
        const haystack = [
          transaction.description,
          transaction.category,
          transaction.type,
          transaction.tags?.join(' '),
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase()

        return haystack.includes(normalizedQuery)
      })
      .slice(0, 8)
  }, [normalizedQuery, transactions])

  const matchingNavItems = useMemo(() => {
    if (!normalizedQuery) {
      return NAV_ITEMS
    }

    return NAV_ITEMS.filter((item) => {
      return `${item.label} ${item.description}`.toLowerCase().includes(normalizedQuery)
    })
  }, [normalizedQuery])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const closeAndNavigate = (path: string) => {
    onClose()
    setQuery('')
    navigate(path)
  }

  const closeAndReset = () => {
    onClose()
    setQuery('')
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeAndReset}
      title="Quick Search"
      footer={
        <div className={styles.footer}>
          <p>Press Esc to close</p>
          <Button variant="secondary" onClick={closeAndReset}>
            Close
          </Button>
        </div>
      }
    >
      <div className={styles.container}>
        <input
          autoFocus
          type="text"
          value={query}
          onChange={handleChange}
          className={styles.input}
          placeholder="Search transactions, categories, and pages..."
        />

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3>Navigation</h3>
            <Badge size="sm" variant="info">Cmd+K</Badge>
          </div>
          <div className={styles.list}>
            {matchingNavItems.length === 0 ? (
              <p className={styles.empty}>No matching pages</p>
            ) : (
              matchingNavItems.map((item) => (
                <button
                  key={item.path}
                  type="button"
                  className={styles.searchItem}
                  onClick={() => closeAndNavigate(item.path)}
                >
                  <div>
                    <strong>{item.label}</strong>
                    <span>{item.description}</span>
                  </div>
                  <Badge size="sm">Open</Badge>
                </button>
              ))
            )}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3>Transactions</h3>
            <Badge size="sm" variant="default">{matchingTransactions.length}</Badge>
          </div>
          <div className={styles.list}>
            {matchingTransactions.length === 0 ? (
              <p className={styles.empty}>No matching transactions</p>
            ) : (
              matchingTransactions.map((transaction: Transaction) => (
                <button
                  key={transaction.id}
                  type="button"
                  className={styles.searchItem}
                  onClick={() => closeAndNavigate(ROUTES.TRANSACTIONS)}
                >
                  <div>
                    <strong>{transaction.description}</strong>
                    <span>
                      {transaction.category} • {format(new Date(transaction.date), 'MMM d, yyyy')}
                    </span>
                  </div>
                  <Badge
                    size="sm"
                    variant={transaction.type === 'income' ? 'success' : 'danger'}
                  >
                    {formatCurrency(transaction.amount)}
                  </Badge>
                </button>
              ))
            )}
          </div>
        </section>
      </div>
    </Modal>
  )
}