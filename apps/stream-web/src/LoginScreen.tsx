import { useRuntime } from './RuntimeContext'

export function LoginScreen() {
    const runtime = useRuntime()
    const facades = runtime.getFacades()

    async function handleLogin() {
        await facades.auth.login('test@example.com', '1234')
    }

    return (
        <div>
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}
