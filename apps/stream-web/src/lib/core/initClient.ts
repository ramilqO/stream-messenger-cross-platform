import { initAuthProjection } from '$lib/features/auth/authProjection'

import { getRuntime } from './runtime'

let disposeProjections: (() => void) | null = null

/**
 * Bootstraps core and wires client projections.
 * Call once on app start (client-only).
 */
export async function initClient(): Promise<void> {
    const runtime = await getRuntime()

    disposeProjections?.()
    disposeProjections = initAuthProjection(runtime)
}

/** Tears down client projections. */
export function disposeClient(): void {
    disposeProjections?.()
    disposeProjections = null
}
