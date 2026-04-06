import { Role } from '../types/user.types'

export const ROLES: Role[] = ['admin', 'manager', 'viewer']

export const ROLE_DESCRIPTIONS: Record<Role, string> = {
  admin: 'Full access to all features',
  manager: 'Can manage transactions but cannot delete',
  viewer: 'Read-only access',
}

export const ROLE_LABELS: Record<Role, string> = {
  admin: 'Administrator',
  manager: 'Manager',
  viewer: 'Viewer',
}
