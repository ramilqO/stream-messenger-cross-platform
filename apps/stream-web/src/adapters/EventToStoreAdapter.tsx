import { UserLoggedInEvent } from '@core/modules/auth/domain/events'
import { useEffect } from 'react'

import { useCoreRuntime } from '../providers/CoreRuntimeProvider'
import { useAuthStore } from '../store/useAuthStore'

export const EventToStoreAdapter = () => {
    const runtime = useCoreRuntime()
    const setCurrentUser = useAuthStore((state) => state.setCurrentUser)

    useEffect(() => {
        const unsubLogin = runtime.eventBus.subscribe('UserLoggedInEvent', (event: UserLoggedInEvent) => {
            setCurrentUser(event.user)
        })

        const unsubLogout = runtime.eventBus.subscribe('UserLoggedOutEvent', () => {
            setCurrentUser(null)
        })

        return () => {
            unsubLogin()
            unsubLogout()
        }
    }, [runtime, setCurrentUser])

    return null
}
