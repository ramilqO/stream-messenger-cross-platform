import { useContext } from 'react'

import { SetterContext, ThemeContext } from '../providers/theme-provider'

export const useAppTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useAppTheme must be used within a ThemeProvider')
    }
    return context
}

export const useSetTheme = () => {
    const context = useContext(SetterContext)
    if (!context) {
        throw new Error('useSetTheme must be used within a ThemeProvider')
    }

    return context
}
