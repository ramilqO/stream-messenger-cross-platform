import { LogContext, LogLevel, LogTransport } from './logger'

export class ConsoleTransport implements LogTransport {
    send(level: LogLevel, message: string, error?: unknown, context?: LogContext): void {
        const icons = { log: '📱 [LOG]:', warn: '⚠️ [WARN]:', error: '🚨 [ERROR]:' }

        if (level === 'error') {
            console.error(icons[level], message, error ?? '', context ?? '')
        } else if (level === 'warn') {
            console.warn(icons[level], message)
        } else {
            console.log(icons[level], message)
        }
    }
}
