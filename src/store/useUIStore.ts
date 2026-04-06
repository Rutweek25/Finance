import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UIStore {
  darkMode: boolean
  toggleDarkMode: () => void
  sidebarCollapsed: boolean
  toggleSidebar: () => void
}

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      darkMode: false,
      toggleDarkMode: () => {
        set((state) => {
          const newDarkMode = !state.darkMode
          if (typeof document !== 'undefined') {
            const theme = newDarkMode ? 'dark' : 'light'
            document.documentElement.setAttribute('data-theme', theme)
          }
          return { darkMode: newDarkMode }
        })
      },

      sidebarCollapsed: false,
      toggleSidebar: () => {
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed }))
      },
    }),
    {
      name: 'ui-store',
      onRehydrateStorage: () => (state) => {
        if (state?.darkMode && typeof document !== 'undefined') {
          document.documentElement.setAttribute('data-theme', 'dark')
        }
      },
    }
  )
)
