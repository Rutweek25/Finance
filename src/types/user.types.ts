export type Role = 'admin' | 'manager' | 'viewer'

export interface User {
  id: string
  name: string
  email: string
  role: Role
  avatar?: string
  department: string
}

export interface Permission {
  canAdd: boolean
  canEdit: boolean
  canDelete: boolean
  canExport: boolean
}

export const PERMISSIONS: Record<Role, Permission> = {
  admin: { canAdd: true, canEdit: true, canDelete: true, canExport: true },
  manager: { canAdd: true, canEdit: true, canDelete: false, canExport: true },
  viewer: { canAdd: false, canEdit: false, canDelete: false, canExport: false },
}
