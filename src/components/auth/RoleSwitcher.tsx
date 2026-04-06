import { useAuthStore } from '../../store/useAuthStore'
import { ROLES, ROLE_LABELS } from '../../constants/roles'
import { Badge } from '../shared/Badge'
import styles from './RoleSwitcher.module.css'

export const RoleSwitcher = () => {
  const currentUser = useAuthStore((state) => state.currentUser)
  const switchRole = useAuthStore((state) => state.switchRole)

  if (!currentUser) {
    return null
  }

  return (
    <div className={styles.container}>
      <div className={styles.label}>Demo Role Switcher</div>
      <div className={styles.buttons}>
        {ROLES.map((role) => (
          <button
            key={role}
            className={`${styles.button} ${
              currentUser.role === role ? styles.active : ''
            }`}
            onClick={() => switchRole(role)}
          >
            {ROLE_LABELS[role]}
          </button>
        ))}
      </div>
      <div className={styles.info}>
        <Badge variant="info">Current: {ROLE_LABELS[currentUser.role]}</Badge>
      </div>
    </div>
  )
}
