import { User } from '@core/modules/auth/domain/entities/User'

import { useFacade } from './hooks/useFacade'
import { useAuthStore } from './store/useAuthStore'

export const LoginScreen = () => {
    const auth = useFacade('auth')
    const currentUser = useAuthStore((s) => s.currentUser)

    const handleLogin = async () => {
        await auth.login(new User('test@example.com', 'pass'))
    }

    return (
        <div>{currentUser ? `Hello ${currentUser.email}` : <button onClick={handleLogin}>Login</button>}</div>
    )
}
