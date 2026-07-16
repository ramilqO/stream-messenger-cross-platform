import { createAsyncStorage } from '@react-native-async-storage/async-storage'
import { logger } from '@stream/shared'

const database = createAsyncStorage('app_storage')

export const storage = {
    getString: async (key: string): Promise<string | null> => {
        try {
            return await database.getItem(key)
        } catch (error) {
            if (logger && typeof logger.error === 'function') {
                logger.error(`Storage Error [getItem] for key ${key}:`, error)
            } else {
                console.error(`Storage Error [getItem] for key ${key}:`, error)
            }
            return null
        }
    },

    setString: async (key: string, value: string): Promise<void> => {
        try {
            await database.setItem(key, value)
        } catch (error) {
            if (logger && typeof logger.error === 'function') {
                logger.error(`Storage Error [setItem] for key ${key}:`, error)
            } else {
                console.error(`Storage Error [setItem] for key ${key}:`, error)
            }
        }
    },

    removeString: async (key: string): Promise<void> => {
        try {
            await database.removeItem(key)
        } catch (error) {
            if (logger && typeof logger.error === 'function') {
                logger.error(`Storage error [removeItem] for key ${key}`, error)
            } else {
                console.error(`Storage error [removeItem] for key ${key}`, error)
            }
        }
    },
}
