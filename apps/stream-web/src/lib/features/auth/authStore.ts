import { writable } from 'svelte/store'

import { initialAuthViewState } from './types'

/** Read-only for components; mutate via authActions or authProjection only. */
export const authStore = writable(initialAuthViewState)
