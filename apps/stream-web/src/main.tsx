import { createRoot } from 'react-dom/client'

import App from './App'
import { CoreRuntimeProvider } from './providers/CoreRuntimeProvider'

createRoot(document.getElementById('root')!).render(
    <CoreRuntimeProvider>
        <App />
    </CoreRuntimeProvider>,
)
