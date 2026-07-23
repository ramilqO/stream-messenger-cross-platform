import { getRuntime } from '$lib/core/runtime'

import { authStore } from './authStore'

/** Sends commands to the auth facade; state updates come from authProjection. */
export async function login(email: string, password: string): Promise<void> {
    authStore.update((state) => ({ ...state, loading: true, error: null }))

    try {
        const runtime = await getRuntime()
        await runtime.getFacade('auth').login({ email, password })
    } catch {
        authStore.update((state) => ({
            ...state,
            loading: false,
            error: 'Не удалось войти. Проверьте email и пароль.',
        }))
    }
}

export async function logout(): Promise<void> {
    authStore.update((state) => ({ ...state, loading: true, error: null }))

    try {
        const runtime = await getRuntime()
        await runtime.getFacade('auth').logout()
    } catch {
        authStore.update((state) => ({
            ...state,
            loading: false,
            error: 'Не удалось выйти.',
        }))
    }
}
