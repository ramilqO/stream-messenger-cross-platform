import { useEffect, useState } from 'react'

import { logger } from '@stream/shared'
import { initAppServices } from '../services'

export const useInitializeApp = () => {
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        const prepare = async () => {
            try {
                await initAppServices()
                setIsReady(true)
                logger.log('ХУЙ') // вывелось на симуляторе!
            } catch (error) {
                logger.error('App initialization failed:', error)
            }
        }

        prepare()
    }, [])

    return { isReady }
}
