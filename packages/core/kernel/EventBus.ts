import { DomainEvent } from "./DomainEvent";
import { DomainEventMap } from "./EventMap";

export type EventHandler<T extends DomainEvent> = (
  event: T
) => void | Promise<void>;

export interface IEventBus {
  publish<T extends DomainEvent>(event: T): Promise<void>;
  
  /**
   * Подписка на событие с типизацией через DomainEventMap.
   * Если eventName есть в DomainEventMap, тип события будет автоматически определен.
   * 
   * @example
   * // С типизацией через DomainEventMap
   * eventBus.subscribe("MessageSentEvent", (event) => {
   *   // event имеет тип MessageSentEvent автоматически
   *   console.log(event.message);
   * });
   * 
   * // Без типизации (fallback)
   * eventBus.subscribe("UnknownEvent", (event: CustomEvent) => {
   *   // явная типизация
   * });
   */
  subscribe<K extends keyof DomainEventMap>(
    eventName: K,
    handler: EventHandler<DomainEventMap[K]>
  ): () => void;
  
  subscribe<T extends DomainEvent>(
    eventName: string,
    handler: EventHandler<T>
  ): () => void;
}
