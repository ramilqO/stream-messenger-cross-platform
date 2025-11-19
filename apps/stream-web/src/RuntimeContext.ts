import { CoreRuntime } from '@core/kernel/CoreRuntime'
import { createContext, useContext } from 'react'

export const RuntimeContext = createContext<CoreRuntime | null>(null)

export function useRuntime(): CoreRuntime {
    const ctx = useContext(RuntimeContext)

    if (!ctx) {
        throw new Error('useRuntime must be used inside <RuntimeProvider>')
    }

    return ctx
}
