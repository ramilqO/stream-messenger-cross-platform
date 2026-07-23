import { Subject } from 'rxjs'
import { filter } from 'rxjs/operators'

import { DomainEvent, type DomainEventMap } from './DomainEvent'
import type { IEventBus } from './EventBus'

/**
 * RxJS-based implementation of the event bus.
 * Uses a single Subject and filters events by their `name` property.
 */
export class RxEventBus implements IEventBus {
    private subject = new Subject<DomainEvent>()

    /**
     * Publishes an event to the bus.
     * @param event - The domain event to publish.
     */
    async publish<E extends keyof DomainEventMap>(event: DomainEventMap[E]): Promise<void> {
        this.subject.next(event)
    }

    /**
     * Subscribes to events with a specific name.
     * @param eventName - Name of the event (e.g., 'UserLoggedInEvent').
     * @param handler - Handler function.
     * @returns Unsubscribe function.
     */
    subscribe<E extends keyof DomainEventMap>(
        eventName: E,
        handler: (event: DomainEventMap[E]) => void,
    ): () => void {
        const subscription = this.subject
            .pipe(filter((e): e is DomainEventMap[E] => e.name === eventName))
            .subscribe(handler)
        return () => subscription.unsubscribe()
    }
}
