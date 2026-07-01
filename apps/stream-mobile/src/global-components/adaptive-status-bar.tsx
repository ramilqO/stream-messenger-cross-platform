import React, { useContext } from 'react'
import { StatusBar } from 'react-native'

import { ThemeContext } from '../providers/theme-provider'

export const AdaptiveStatusBar = () => {
    const theme = useContext(ThemeContext)

    return (
        <StatusBar
            barStyle={theme.isDark ? 'light-content' : 'dark-content'}
            backgroundColor={theme.colors.background}
        />
    )
}
