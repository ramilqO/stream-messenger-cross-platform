import { logger } from '@stream/shared'
import { AdaptiveStatusBar } from './src/global-components/adaptive-status-bar'
import { MainNavigator } from './src/global-components/main-navigator'
import { useInitializeApp } from './src/hooks/useInitializeApp'
import { AppProviders } from './src/providers/app-providers'

function App() {
    const { isReady } = useInitializeApp()
    logger.log(isReady, 'СЕРВИСЫ ГОТОВЫ')

    if (!isReady) return null

    return (
        <AppProviders>
            <AdaptiveStatusBar />
            <MainNavigator />
        </AppProviders>
    )
}

export default App
