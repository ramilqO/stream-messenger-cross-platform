import { EventToStoreAdapter } from './adapters/EventToStoreAdapter'
import { ToastListener } from './components/ToastListener'
import { LoginScreen } from './LoginScreen'

function App() {
    return (
        <>
            <EventToStoreAdapter />
            <LoginScreen />
            <ToastListener />
        </>
    )
}

export default App
