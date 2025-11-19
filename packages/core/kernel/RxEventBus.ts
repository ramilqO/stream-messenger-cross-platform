import { Subject } from 'rxjs'
import { filter } from 'rxjs/operators'

import { DomainEvent, type DomainEventMap } from './DomainEvent'
import type { IEventBus } from './EventBus'

/**
 * RxJS-based event bus implementation.
 */
export class RxEventBus implements IEventBus {
    private subject = new Subject<DomainEvent>()

    /**
     * Publishes a typed domain event.
     * @param event - The domain event to publish.
     */
    async publish<E extends keyof DomainEventMap>(
        event: DomainEventMap[E]
    ): Promise<void> {
        this.subject.next(event)
    }

    /**
     * Subscribes to a specific domain event type.
     * @param eventName - Name of the event to listen for.
     * @param handler - Function called with the event payload when published.
     * @returns Function to unsubscribe.
     */
    subscribe<E extends keyof DomainEventMap>(
        eventName: E,
        handler: (event: DomainEventMap[E]) => void
    ) {
        const sub = this.subject
            .pipe(filter((e): e is DomainEventMap[E] => e.name === eventName))
            .subscribe(handler)

        return () => sub.unsubscribe()
    }
}
