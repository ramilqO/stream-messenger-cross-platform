import { DomainEvent } from "./DomainEvent";

export type EventHandler<T extends DomainEvent> = (
  event: T
) => void | Promise<void>;

export interface IEventBus {
  publish<T extends DomainEvent>(event: T): Promise<void>;
  subscribe<T extends DomainEvent>(
    eventName: string,
    handler: EventHandler<T>
  ): () => void;
}
