import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { useColorScheme } from 'react-native'

import { ThemeConfig } from '../types/themes.types'
import { themePresets } from '../utils/themes-presets'

export const ThemeContext = createContext<ThemeConfig>(themePresets.light)
export const SetterContext = createContext<React.Dispatch<React.SetStateAction<ThemeConfig>> | null>(null)

const STORAGE_KEY = '@user_theme_config'

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const systemTheme = useColorScheme()

    const defaultTheme = systemTheme === 'dark' ? themePresets.dark : themePresets.light
    const [themeConfig, setThemeConfig] = useState<ThemeConfig>(defaultTheme)

    useEffect(() => {
        const loadTheme = async () => {
            try {
                const savedConfigJson = await AsyncStorage.getItem(STORAGE_KEY)
                if (savedConfigJson) {
                    setThemeConfig(JSON.parse(savedConfigJson))
                } else if (systemTheme) {
                    setThemeConfig(systemTheme === 'dark' ? themePresets.dark : themePresets.light)
                }
            } catch (error) {
                console.error('Error loading theme config:', error)
            }
        }
        loadTheme()
    }, [systemTheme])

    useEffect(() => {
        const saveTheme = async () => {
            try {
                await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(themeConfig))
            } catch (error) {
                console.error('Error saving theme config:', error)
            }
        }
        saveTheme()
    }, [themeConfig])

    return (
        <ThemeContext.Provider value={themeConfig}>
            <SetterContext.Provider value={setThemeConfig}>{children}</SetterContext.Provider>
        </ThemeContext.Provider>
    )
}
