import React, { createContext, ReactNode, useEffect, useState } from 'react'
import { useColorScheme } from 'react-native'

import { storage } from '../infrastructure/storage'
import { logger } from '../services/logger'
import { ThemeConfig } from '../types/themes.types'
import { themePresets } from '../utils/themes-presets'

export const ThemeContext = createContext<ThemeConfig>(themePresets.light)
export const SetterContext = createContext<((theme: ThemeConfig) => void) | null>(null)

const STORAGE_KEY = '@user_theme_config'

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const systemTheme = useColorScheme()

    const [themeConfig, setThemeConfig] = useState<ThemeConfig>(() => {
        return systemTheme === 'dark' ? themePresets.dark : themePresets.light
    })

    useEffect(() => {
        const initTheme = async () => {
            try {
                const savedConfigJson = await storage.getString(STORAGE_KEY)
                if (savedConfigJson) {
                    setThemeConfig(JSON.parse(savedConfigJson))
                }
            } catch (error) {
                logger.error('Error loading theme config:', error)
            }
        }
        initTheme()
    }, [])

    useEffect(() => {
        const syncWithSystem = async () => {
            const savedConfigJson = await storage.getString(STORAGE_KEY)

            if (!savedConfigJson && systemTheme) {
                setThemeConfig(systemTheme === 'dark' ? themePresets.dark : themePresets.light)
            }
        }
        syncWithSystem()
    }, [systemTheme])

    const updateTheme = async (newTheme: ThemeConfig) => {
        setThemeConfig(newTheme)
        try {
            await storage.setString(STORAGE_KEY, JSON.stringify(newTheme))
        } catch (error) {
            logger.error('Error saving theme config:', error)
        }
    }

    return (
        <ThemeContext.Provider value={themeConfig}>
            <SetterContext.Provider value={updateTheme}>{children}</SetterContext.Provider>
        </ThemeContext.Provider>
    )
}
