import { LogContext, LogLevel, LogTransport } from './logger'

export class SentryTransport implements LogTransport {
    send(level: LogLevel, message: string, error?: unknown, context?: LogContext): void {
        if (level === 'error') {
            const errorObject = error instanceof Error ? error : new Error(message)
        } else if (level === 'warn') {
            // Sentry.captureMessage(message, 'warning');
        }
    }
}
