import { Modal } from '../shared/Modal'
import { Button } from '../shared/Button'
import styles from './DeleteConfirmModal.module.css'

interface DeleteConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Transaction"
      footer={
        <div className={styles.actions}>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Delete
          </Button>
        </div>
      }
    >
      <div className={styles.content}>
        <p>Are you sure you want to delete this transaction?</p>
        <p className={styles.warning}>This action cannot be undone.</p>
      </div>
    </Modal>
  )
}
