import { logger } from '@stream/shared'
import { storage } from '../infrastructure/storage'

const PING_KEY = '__storage_ping__'

export const initAsyncStorage = async (): Promise<void> => {
    try {
        await storage.setString(PING_KEY, 'pong')
        const result = await storage.getString(PING_KEY)
        await storage.removeString(PING_KEY)

        if (result !== 'pong') {
            throw new Error('Storage integrity check failed')
        }

        logger.log('📦 AsyncStorage successfully connected and verified')
    } catch (error) {
        console.error('🔴 Failed to initialize async storage:', error)

        if (logger && typeof logger.error === 'function') {
            logger.error('Failed to initialize async storage:', error)
        }

        throw new Error('Storage initialization failed')
    }
}
