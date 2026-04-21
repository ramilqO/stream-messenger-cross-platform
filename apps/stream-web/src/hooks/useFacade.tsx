import { FacadesMap } from '@core/kernel/Facades'

import { useCoreRuntime } from '../providers/CoreRuntimeProvider'

export function useFacade<K extends keyof FacadesMap>(name: K): FacadesMap[K] {
    const runtime = useCoreRuntime()

    return runtime.getFacade(name)
}
