import { Transaction } from '../../types/transaction.types'
import { CATEGORY_ICONS } from '../../constants/categories'
import { formatCurrency } from '../../utils/formatCurrency'
import { Badge } from '../shared/Badge'
import { Button } from '../shared/Button'
import { PermissionGate } from '../auth/PermissionGate'
import styles from './TransactionRow.module.css'

interface TransactionRowProps {
  transaction: Transaction
  onEdit: (tx: Transaction) => void
  onDelete: (id: string) => void
}

export const TransactionRow = ({
  transaction,
  onEdit,
  onDelete,
}: TransactionRowProps) => {
  return (
    <tr>
      <td className={styles.date}>
        {new Date(transaction.date).toLocaleDateString()}
      </td>
      <td className={styles.description}>{transaction.description}</td>
      <td className={styles.category}>
        <Badge size="sm" icon={CATEGORY_ICONS[transaction.category]}>
          {transaction.category}
        </Badge>
      </td>
      <td>
        <Badge
          size="sm"
          variant={transaction.type === 'income' ? 'success' : 'danger'}
        >
          {transaction.type}
        </Badge>
      </td>
      <td className={`${styles.amount} ${styles[transaction.type]}`}>
        {transaction.type === 'income' ? '+' : '-'}
        {formatCurrency(transaction.amount)}
      </td>
      <PermissionGate permission="canEdit">
        <td className={styles.actions}>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(transaction)}
          >
            ✏️
          </Button>
          <PermissionGate permission="canDelete">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(transaction.id)}
            >
              🗑️
            </Button>
          </PermissionGate>
        </td>
      </PermissionGate>
    </tr>
  )
}
