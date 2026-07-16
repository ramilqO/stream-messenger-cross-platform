import { initAsyncStorage } from './async-storage'
import { initLogger } from './logger'

interface AppService {
    name: string
    init: () => Promise<void> | void
}

const coreServices: AppService[] = [
    {
        name: 'Logger',
        init: initLogger,
    },
    {
        name: 'Async Storage',
        init: initAsyncStorage,
    },
    // {
    //     name: 'Database',
    //     init: initDatabase
    // },
    // {
    //     name: 'Bluetooth Mesh',
    //     init: initBluetoothMesh
    // }
]

export const initAppServices = async (): Promise<void> => {
    for (const service of coreServices) {
        try {
            await service.init()
        } catch (error) {
            console.error(`Service [${service.name}] failed to initialize:`, error)
            throw error
        }
    }
}
