import { ReactNode } from 'react'
import { useAuthStore } from '../../store/useAuthStore'
import { PERMISSIONS } from '../../types/user.types'

type PermissionType = keyof typeof PERMISSIONS['admin']

interface PermissionGateProps {
  permission: PermissionType
  children: ReactNode
  fallback?: ReactNode
}

export const PermissionGate = ({
  permission,
  children,
  fallback = null,
}: PermissionGateProps) => {
  const currentUser = useAuthStore((state) => state.currentUser)

  if (!currentUser) {
    return fallback
  }

  const userPermissions = PERMISSIONS[currentUser.role]
  const hasPermission = userPermissions[permission]

  return hasPermission ? children : fallback
}
