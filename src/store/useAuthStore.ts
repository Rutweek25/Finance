import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User, Role } from '../types/user.types'

interface AuthStore {
  currentUser: User | null
  switchRole: (role: Role) => void
  setCurrentUser: (user: User) => void
}

const DEFAULT_ADMIN: User = {
  id: '1',
  name: 'Admin User',
  email: 'admin@zorvyan.com',
  role: 'admin',
  avatar: '👤',
  department: 'Leadership',
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      currentUser: DEFAULT_ADMIN,

      switchRole: (role) => {
        set((state) => {
          if (state.currentUser) {
            return {
              currentUser: { ...state.currentUser, role },
            }
          }
          return state
        })
      },

      setCurrentUser: (user) => {
        set({ currentUser: user })
      },
    }),
    {
      name: 'auth-store',
    }
  )
)
