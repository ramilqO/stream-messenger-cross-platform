import { DomainEvent } from "./DomainEvent";

export interface IEventBus {
  publish(event: DomainEvent): Promise<void>;

  subscribe(
    eventName: string,
    handler: (event: DomainEvent) => void
  ): () => void;
}
