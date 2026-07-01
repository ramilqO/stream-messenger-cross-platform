const isDev = __DEV__

export const logger = {
    log: (...args: any[]) => {
        if (isDev) {
            console.log('📱 [LOG]:', ...args)
        }
    },

    warn: (...args: any[]) => {
        if (isDev) {
            console.warn('⚠️ [WARN]:', ...args)
        }
    },

    error: (...args: any[]) => {
        if (isDev) {
            console.error('🚨 [ERROR]:', ...args)
        } else {
            // В продакшене здесь будет отправка ошибок в сервис аналитики
            // например: Sentry.captureException(args)
        }
    },
}

/**
 * Disables standard console methods (log, info, warn) in production builds to avoid cluttering logs.
 * In development builds, the console methods will still work as expected.
 */
export const disableStandartConsole = () => {
    if (!isDev) {
        // for production builds, disable standard console methods to avoid cluttering logs
        globalThis.console.log = () => {}
        globalThis.console.info = () => {}
        globalThis.console.warn = () => {}
    }
}
