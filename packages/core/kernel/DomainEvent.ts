export abstract class DomainEvent {
  abstract readonly name: string;
  readonly occurredAt: Date = new Date();
}
