/**
 * Abstract base class for all domain events.
 * Each event must define a unique `name` property used for subscription filtering.
 */
export abstract class DomainEvent {
    /** Unique event name (used for subscription filtering). */
    abstract name: string

    /** Timestamp when the event was created. */
    readonly occurredAt: Date = new Date()
}

/**
 * Extendable interface for mapping domain event names to their concrete event types.
 * Modules should augment this interface to enable type-safe publishing and subscribing.
 *
 * @example
 * ```typescript
 * declare module '@core/kernel/DomainEvent' {
 *   interface DomainEventMap {
 *     UserLoggedInEvent: UserLoggedInEvent;
 *   }
 * }
 * ```
 */
export interface DomainEventMap {}
