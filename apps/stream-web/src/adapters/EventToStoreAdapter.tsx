import { UserLoggedInEvent } from '@core/modules/auth/domain/events'
import { useEffect } from 'react'

import { ShowToastEvent, uiEventBus } from '../lib/uiEventBus'
import { useCoreRuntime } from '../providers/CoreRuntimeProvider'
import { useAuthStore } from '../store/useAuthStore'

export const EventToStoreAdapter = () => {
    const runtime = useCoreRuntime()
    const setCurrentUser = useAuthStore((state) => state.setCurrentUser)

    useEffect(() => {
        const unsubLogin = runtime.eventBus.subscribe('UserLoggedInEvent', (event: UserLoggedInEvent) => {
            setCurrentUser(event.user)
            uiEventBus.publish(new ShowToastEvent(`Добро пожаловать, ${event.user.email}!`, 'success'))
        })

        const unsubLogout = runtime.eventBus.subscribe('UserLoggedOutEvent', () => {
            setCurrentUser(null)
            uiEventBus.publish(new ShowToastEvent('Вы вышли из системы', 'info'))
        })

        return () => {
            unsubLogin()
            unsubLogout()
        }
    }, [runtime, setCurrentUser])

    return null
}
