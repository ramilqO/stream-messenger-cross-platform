import { ConsoleTransport, logger, SentryTransport } from '@stream/shared'

export const initLogger = () => {
    logger.addTransport(new ConsoleTransport())

    if (!__DEV__) {
        logger.addTransport(new SentryTransport())
    }

    logger.log('🚀 Логгер успешно инициализирован в React Native!')
}
