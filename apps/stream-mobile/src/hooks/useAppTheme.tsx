import { useContext } from 'react'

import { ThemeContext } from '../providers/theme-provider'

export const useAppTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useAppTheme must be used within a ThemeProvider')
    }
    return context
}
