import { useState } from 'react'
import { useTransactionStore } from '../../store/useTransactionStore'
import { useAuthStore } from '../../store/useAuthStore'
import { Transaction, Category } from '../../types/transaction.types'
import { CATEGORIES } from '../../constants/categories'
import { Drawer } from '../shared/Drawer'
import { Button } from '../shared/Button'
import styles from './TransactionDrawer.module.css'

interface AddTransactionDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export const AddTransactionDrawer = ({ isOpen, onClose }: AddTransactionDrawerProps) => {
  const addTransaction = useTransactionStore((state) => state.addTransaction)
  const currentUser = useAuthStore((state) => state.currentUser)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    amount: '',
    category: 'Other' as Category,
    type: 'expense' as 'income' | 'expense',
    description: '',
    tags: '',
  })

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.date) newErrors.date = 'Date is required'
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Valid amount is required'
    }
    if (!formData.description.trim()) newErrors.description = 'Description is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm() || !currentUser) return

    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      date: formData.date,
      amount: parseFloat(formData.amount),
      category: formData.category,
      type: formData.type,
      description: formData.description,
      tags: formData.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      createdBy: currentUser.id,
      updatedAt: new Date().toISOString(),
    }

    addTransaction(newTx)
    setFormData({
      date: new Date().toISOString().split('T')[0],
      amount: '',
      category: 'Other',
      type: 'expense',
      description: '',
      tags: '',
    })
    setErrors({})
    onClose()
  }

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Add Transaction">
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Date</label>
          <input
            type="date"
            className={styles.input}
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
          {errors.date && <span className={styles.error}>{errors.date}</span>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Amount</label>
          <input
            type="number"
            step="0.01"
            className={styles.input}
            placeholder="0.00"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          />
          {errors.amount && <span className={styles.error}>{errors.amount}</span>}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Type</label>
          <div className={styles.radioGroup}>
            <label className={styles.radio}>
              <input
                type="radio"
                value="income"
                checked={formData.type === 'income'}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value as any })
                }
              />
              Income
            </label>
            <label className={styles.radio}>
              <input
                type="radio"
                value="expense"
                checked={formData.type === 'expense'}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value as any })
                }
              />
              Expense
            </label>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Category</label>
          <select
            className={styles.input}
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value as Category })
            }
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Description</label>
          <input
            type="text"
            className={styles.input}
            placeholder="Enter transaction description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          {errors.description && (
            <span className={styles.error}>{errors.description}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Tags (comma separated)</label>
          <input
            type="text"
            className={styles.input}
            placeholder="e.g. urgent, personal, work"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          />
        </div>

        <div className={styles.actions}>
          <Button variant="secondary" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button type="submit">Add Transaction</Button>
        </div>
      </form>
    </Drawer>
  )
}
