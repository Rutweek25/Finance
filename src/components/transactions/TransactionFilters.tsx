import { TransactionFilter } from '../../types/transaction.types'
import { CATEGORIES } from '../../constants/categories'
import styles from './TransactionFilters.module.css'

interface TransactionFiltersProps {
  filter: TransactionFilter
  onChange: (filter: TransactionFilter) => void
}

export const TransactionFilters = ({ filter, onChange }: TransactionFiltersProps) => {
  return (
    <div className={styles.filters}>
      <input
        type="text"
        placeholder="Search transactions..."
        className={styles.searchInput}
        value={filter.searchQuery}
        onChange={(e) => onChange({ ...filter, searchQuery: e.target.value })}
      />

      <select
        className={styles.select}
        value={filter.type}
        onChange={(e) => onChange({ ...filter, type: e.target.value as any })}
      >
        <option value="all">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <select
        className={styles.select}
        value={filter.category}
        onChange={(e) => onChange({ ...filter, category: e.target.value as any })}
      >
        <option value="all">All Categories</option>
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <input
        type="date"
        className={styles.dateInput}
        value={filter.startDate || ''}
        onChange={(e) => onChange({ ...filter, startDate: e.target.value })}
        placeholder="Start Date"
      />

      <input
        type="date"
        className={styles.dateInput}
        value={filter.endDate || ''}
        onChange={(e) => onChange({ ...filter, endDate: e.target.value })}
        placeholder="End Date"
      />

      <select
        className={styles.select}
        value={filter.sortBy}
        onChange={(e) => onChange({ ...filter, sortBy: e.target.value as any })}
      >
        <option value="date">Sort by Date</option>
        <option value="amount">Sort by Amount</option>
      </select>

      <button
        className={styles.sortBtn}
        onClick={() =>
          onChange({
            ...filter,
            sortOrder: filter.sortOrder === 'asc' ? 'desc' : 'asc',
          })
        }
      >
        {filter.sortOrder === 'asc' ? '↑' : '↓'}
      </button>

      <button
        className={styles.resetBtn}
        onClick={() =>
          onChange({
            searchQuery: '',
            type: 'all',
            category: 'all',
            sortBy: 'date',
            sortOrder: 'desc',
          })
        }
      >
        Reset
      </button>
    </div>
  )
}
