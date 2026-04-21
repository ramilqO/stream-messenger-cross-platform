import { bootstrap } from '@core/bootstrap'
import { CoreRuntime } from '@core/kernel/CoreRuntime'
import React, { createContext, useContext, useEffect, useState } from 'react'

const CoreRuntimeContext = createContext<CoreRuntime | null>(null)

export const CoreRuntimeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [runtime, setRuntime] = useState<CoreRuntime | null>(null)

    useEffect(() => {
        bootstrap().then(setRuntime)
    }, [])

    if (!runtime) return <div>Loading...</div>

    return <CoreRuntimeContext.Provider value={runtime}>{children}</CoreRuntimeContext.Provider>
}

export const useCoreRuntime = () => {
    const ctx = useContext(CoreRuntimeContext)
    if (!ctx) throw new Error('useCoreRuntime must be used within CoreRuntimeProvider')

    return ctx
}
