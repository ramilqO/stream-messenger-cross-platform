import type { CoreRuntime } from '@stream/core'

import { authStore } from './authStore'

/**
 * Maps domain events → UI store.
 * Components never subscribe to the event bus directly.
 */
export function initAuthProjection(runtime: CoreRuntime): () => void {
    const unsubscribeLogin = runtime.eventBus.subscribe('UserLoggedInEvent', (event) => {
        if (!event.user.id) return

        authStore.set({
            user: { id: event.user.id, email: event.user.email },
            loading: false,
            error: null,
        })
    })

    const unsubscribeLogout = runtime.eventBus.subscribe('UserLoggedOutEvent', () => {
        authStore.set({
            user: null,
            loading: false,
            error: null,
        })
    })

    return () => {
        unsubscribeLogin()
        unsubscribeLogout()
    }
}
