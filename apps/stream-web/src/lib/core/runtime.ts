import { bootstrap, type CoreRuntime } from '@stream/core'

let runtime: CoreRuntime | null = null

/** Single shared core runtime for the web app. */
export async function getRuntime(): Promise<CoreRuntime> {
    if (!runtime) {
        runtime = await bootstrap()
    }

    return runtime
}

/** Clears runtime and module subscriptions (useful in tests). */
export function resetRuntime(): void {
    runtime?.dispose()
    runtime = null
}
