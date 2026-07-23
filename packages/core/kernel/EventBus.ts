import type { DomainEventMap } from './DomainEvent'

/**
 * Central event bus for inter-module communication.
 * Modules publish domain events; other modules subscribe to them without direct dependencies.
 */
export interface IEventBus {
    /**
     * Publishes a domain event to all registered subscribers.
     * @param event - The domain event to publish.
     */
    publish<E extends keyof DomainEventMap>(event: DomainEventMap[E]): Promise<void>

    /**
     * Subscribes to domain events of a specific type.
     * @param eventName - Name of the event (e.g., 'UserLoggedInEvent').
     * @param handler - Function called whenever the event occurs.
     * @returns A function that unsubscribes the handler.
     */
    subscribe<E extends keyof DomainEventMap>(
        eventName: E,
        handler: (event: DomainEventMap[E]) => void,
    ): () => void
}
