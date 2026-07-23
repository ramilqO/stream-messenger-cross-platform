import { ReactNode } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

export const SafeAreaWrapper = ({ children }: { children: ReactNode }) => {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
        </SafeAreaProvider>
    )
}
