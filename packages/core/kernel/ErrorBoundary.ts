import type { DomainEvent } from './DomainEvent'

/**
 * Signature for custom error handlers.
 * @param error - Normalized Error object.
 * @param context - Contextual information about the error.
 */
export type ErrorHandler = (error: Error, context: ErrorContext) => void

/**
 * Additional context attached to every handled error.
 */
export interface ErrorContext {
    /** Source of the error: a use case or an event subscriber. */
    source: 'use-case' | 'event-subscriber'
    /** Name of the use case or the domain event. */
    name: string
    /** Optional metadata (e.g., arguments, event payload). */
    metadata?: Record<string, unknown>
    /** Timestamp when the error was caught. */
    timestamp: Date
}

/**
 * Central error handling facility for the CoreRuntime.
 * Logs errors via registered handlers and prevents event subscriber errors from breaking the bus.
 */
export class ErrorBoundary {
    private handlers: ErrorHandler[] = []

    /**
     * Registers a global error handler.
     * @param handler - Function that receives the error and context.
     */
    addHandler(handler: ErrorHandler): void {
        this.handlers.push(handler)
    }

    /**
     * Processes an error through all registered handlers.
     * @param error - The raw caught value (normalized to Error).
     * @param context - Context without timestamp (timestamp is added automatically).
     */
    handle(error: unknown, context: Omit<ErrorContext, 'timestamp'>): void {
        const normalizedError = error instanceof Error ? error : new Error(String(error))
        const fullContext: ErrorContext = {
            ...context,
            timestamp: new Date(),
        }

        if (this.handlers.length === 0) {
            console.error('[ErrorBoundary]', normalizedError, fullContext)
            return
        }

        for (const handler of this.handlers) {
            try {
                handler(normalizedError, fullContext)
            } catch (handlerError) {
                console.error('ErrorBoundary handler threw an error', handlerError)
            }
        }
    }

    /**
     * Wraps an asynchronous use case execution with automatic error handling.
     * The error is logged and then re‑thrown so the caller can decide how to present it.
     * @param useCaseName - Human‑readable name of the use case.
     * @param fn - Async function that executes the use case.
     * @param metadata - Optional extra data.
     * @returns The result of the use case.
     * @throws The original error after logging.
     */
    async wrapUseCase<T>(
        useCaseName: string,
        fn: () => Promise<T>,
        metadata?: Record<string, unknown>,
    ): Promise<T> {
        try {
            return await fn()
        } catch (error) {
            this.handle(error, {
                source: 'use-case',
                name: useCaseName,
                metadata,
            })
            throw error
        }
    }

    /**
     * Wraps an event subscriber handler to catch errors without breaking the event bus.
     * The error is logged but not re‑thrown – other subscribers still receive the event.
     * @param eventName - Name of the domain event.
     * @param handler - Original subscriber function.
     * @returns Wrapped handler safe for use with `IEventBus.subscribe`.
     */
    wrapEventSubscriber<E extends DomainEvent>(
        eventName: string,
        handler: (event: E) => void,
    ): (event: E) => void {
        return (event: E) => {
            try {
                handler(event)
            } catch (error) {
                this.handle(error, {
                    source: 'event-subscriber',
                    name: eventName,
                    metadata: { event },
                })
            }
        }
    }
}
