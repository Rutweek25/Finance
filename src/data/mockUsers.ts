import { User } from '../types/user.types'

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@zorvyan.com',
    role: 'admin',
    avatar: '👤',
    department: 'Leadership',
  },
  {
    id: '2',
    name: 'Manager User',
    email: 'manager@zorvyan.com',
    role: 'manager',
    avatar: '👥',
    department: 'Finance',
  },
  {
    id: '3',
    name: 'Viewer User 1',
    email: 'viewer1@zorvyan.com',
    role: 'viewer',
    avatar: '👁️',
    department: 'Operations',
  },
  {
    id: '4',
    name: 'Viewer User 2',
    email: 'viewer2@zorvyan.com',
    role: 'viewer',
    avatar: '👁️',
    department: 'Marketing',
  },
]
