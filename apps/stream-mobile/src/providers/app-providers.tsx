import { SafeAreaProvider } from 'react-native-safe-area-context'

import { ThemeProvider } from './theme-provider'

export const AppProviders = ({ children }: { children: React.ReactNode }) => (
    <SafeAreaProvider>
        <ThemeProvider>{children}</ThemeProvider>
    </SafeAreaProvider>
)
