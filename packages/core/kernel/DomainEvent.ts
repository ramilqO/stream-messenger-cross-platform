export abstract class DomainEvent {
  abstract name: string;
  readonly occurredAt = new Date();
}

