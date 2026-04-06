import { useState } from 'react'
import { useTransactionStore } from '../../store/useTransactionStore'
import { useFilteredTransactions } from '../../hooks/useFilteredTransactions'
import { useExport } from '../../hooks/useExport'
import { Transaction, TransactionFilter } from '../../types/transaction.types'
import { Button } from '../shared/Button'
import { EmptyState } from '../shared/EmptyState'
import { PermissionGate } from '../auth/PermissionGate'
import { TransactionFilters } from './TransactionFilters'
import { TransactionTable } from './TransactionTable'
import { AddTransactionDrawer } from './AddTransactionDrawer'
import { EditTransactionDrawer } from './EditTransactionDrawer'
import { DeleteConfirmModal } from './DeleteConfirmModal'
import styles from './TransactionsPage.module.css'

export const TransactionsPage = () => {
  const transactions = useTransactionStore((state) => state.transactions)
  const { exportAsCSV, exportAsJSON } = useExport()

  const [filter, setFilter] = useState<TransactionFilter>({
    searchQuery: '',
    type: 'all',
    category: 'all',
    sortBy: 'date',
    sortOrder: 'desc',
  })

  const [isAddOpen, setIsAddOpen] = useState(false)
  const [editingTx, setEditingTx] = useState<Transaction | null>(null)
  const [deletingTxId, setDeletingTxId] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const { filtered, total, pages } = useFilteredTransactions(transactions, filter)
  const ITEMS_PER_PAGE = 10
  const paginatedTx = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Transactions</h1>
          <p className={styles.subtitle}>Manage and analyze your financial transactions</p>
        </div>
      </header>

      <div className={styles.toolbar}>
        <div className={styles.toolbarLabel}>Quick Actions</div>
        <div className={styles.actions}>
          <PermissionGate permission="canAdd">
            <Button icon="＋" onClick={() => setIsAddOpen(true)} size="lg">
              Add Transaction
            </Button>
          </PermissionGate>
          <PermissionGate permission="canExport">
            <Button variant="secondary" icon="⬇️" onClick={() => exportAsCSV(filtered)}>
              Export CSV
            </Button>
            <Button variant="secondary" icon="🧾" onClick={() => exportAsJSON(filtered)}>
              Export JSON
            </Button>
          </PermissionGate>
        </div>
      </div>

      <TransactionFilters filter={filter} onChange={setFilter} />

      {filtered.length === 0 ? (
        <EmptyState
          icon="📭"
          title="No transactions found"
          description="Try adjusting your filters or add a new transaction"
        />
      ) : (
        <>
          <TransactionTable
            transactions={paginatedTx}
            onEdit={(tx) => setEditingTx(tx)}
            onDelete={(id) => setDeletingTxId(id)}
          />
          <div className={styles.pagination}>
            <p className={styles.paginationInfo}>
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{' '}
              {Math.min(currentPage * ITEMS_PER_PAGE, total)} of {total} transactions
            </p>
            <div className={styles.paginationControls}>
              <Button
                variant="secondary"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                size="sm"
              >
                Previous
              </Button>
              <span className={styles.pageInfo}>
                Page {currentPage} of {pages}
              </span>
              <Button
                variant="secondary"
                onClick={() => setCurrentPage(Math.min(pages, currentPage + 1))}
                disabled={currentPage === pages}
                size="sm"
              >
                Next
              </Button>
            </div>
          </div>
        </>
      )}

      <AddTransactionDrawer
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
      />
      {editingTx && (
        <EditTransactionDrawer
          isOpen
          onClose={() => setEditingTx(null)}
          transaction={editingTx}
        />
      )}
      {deletingTxId && (
        <DeleteConfirmModal
          isOpen
          onClose={() => setDeletingTxId(null)}
          onConfirm={() => {
            useTransactionStore.getState().deleteTransaction(deletingTxId)
            setDeletingTxId(null)
          }}
        />
      )}
    </div>
  )
}
