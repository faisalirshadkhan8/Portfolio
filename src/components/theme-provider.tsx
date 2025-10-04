import React, { createContext, useContext, useEffect } from 'react'

type Theme = 'dark'

type ThemeProviderProps = {
  children: React.ReactNode
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const value: ThemeProviderState = {
  theme: 'dark',
  setTheme: () => undefined,
}

const ThemeProviderContext = createContext<ThemeProviderState>(value)

export function ThemeProvider({ children }: ThemeProviderProps) {
  useEffect(() => {
    const root = window.document.documentElement
    // Always enforce dark theme
    root.classList.add('dark')
    root.classList.remove('light')
    return () => {
      root.classList.remove('dark')
    }
  }, [])

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
