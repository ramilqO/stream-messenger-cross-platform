export interface LogContext {
    source?: string
    [key: string]: unknown
}

export type LogLevel = 'log' | 'warn' | 'error'

export interface LogTransport {
    send(level: LogLevel, message: string, error?: unknown, context?: LogContext): void
}

class UniversalLogger {
    private transports: LogTransport[] = []

    /**
     * Подключает новый транспорт (например, консоль, Sentry, локальный файл)
     */
    addTransport(transport: LogTransport): this {
        this.transports.push(transport)
        return this
    }

    log(...args: unknown[]): void {
        const message = args
            .map((arg) => (typeof arg === 'object' ? JSON.stringify(arg) : String(arg)))
            .join(' ')
        this.dispatch('log', message)
    }

    warn(...args: unknown[]): void {
        const message = args
            .map((arg) => (typeof arg === 'object' ? JSON.stringify(arg) : String(arg)))
            .join(' ')
        this.dispatch('warn', message)
    }

    error(message: string, error?: unknown, context?: LogContext): void {
        this.dispatch('error', message, error, context)
    }

    /**
     * Рассылает лог по всем подключенным транспортам
     */
    private dispatch(level: LogLevel, message: string, error?: unknown, context?: LogContext): void {
        if (this.transports.length === 0) {
            console[level === 'log' ? 'log' : level](message, error ?? '')
            return
        }

        for (const transport of this.transports) {
            try {
                transport.send(level, message, error, context)
            } catch (err) {
                console.error('🔴 Critical error inside Logger Transport:', err)
            }
        }
    }
}

export const logger = new UniversalLogger()
