import { type DomainEventMap } from './DomainEvent'

/**
 * Event bus interface for publishing and subscribing to domain events.
 */
export interface IEventBus {
    /**
     * Publishes an event to all subscribers.
     * @param event - The domain event to publish.
     */
    publish<E extends keyof DomainEventMap>(
        event: DomainEventMap[E]
    ): Promise<void>

    /**
     * Subscribes to a specific type of domain event.
     * @param eventName - Name of the event to listen for.
     * @param handler - Function called when the event is published.
     * @returns A function to unsubscribe from the event.
     */
    subscribe<E extends keyof DomainEventMap>(
        eventName: E,
        handler: (event: DomainEventMap[E]) => void
    ): () => void
}
