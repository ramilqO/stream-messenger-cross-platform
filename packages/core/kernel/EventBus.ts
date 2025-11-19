import { DomainEvent, type DomainEventMap } from "./DomainEvent";

export interface IEventBus {
  publish(event: DomainEvent): Promise<void>;

  subscribe(
    eventName: keyof DomainEventMap,
    handler: (event: DomainEvent) => void
  ): () => void;
}
