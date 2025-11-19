export abstract class DomainEvent {
    abstract name: string
    readonly occurredAt = new Date()
}

/**
 * Domain event map interface for module augmentation and type safety.
 */
export interface DomainEventMap {} // for module augmentation
