export abstract class DomainEvent {
  abstract name: string;
  readonly occurredAt = new Date();
}

export interface DomainEventMap {} // for module augmentation
