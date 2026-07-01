import { initAsyncStorage } from './async-storage'
import { disableStandartConsole } from './logger'

export const initAppServices = async () => {
    // В будущем тут будет:
    // await initDatabase()
    // await initBluetoothMesh()
    disableStandartConsole()
    await initAsyncStorage()
}
