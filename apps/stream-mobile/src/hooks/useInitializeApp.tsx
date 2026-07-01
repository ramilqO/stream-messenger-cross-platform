import { useEffect, useState } from 'react'

import { initAppServices } from '../services'
import { logger } from '../services/logger'

export const useInitializeApp = () => {
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        const prepare = async () => {
            try {
                await initAppServices()
                setIsReady(true)
            } catch (error) {
                logger.error('App initialization failed:', error)
            }
        }

        prepare()
    }, [])

    return { isReady }
}
