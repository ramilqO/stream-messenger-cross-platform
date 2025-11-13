import { Subject } from "rxjs";
import { filter } from "rxjs/operators";
import { DomainEvent } from "./DomainEvent";
import { EventHandler, IEventBus } from "./EventBus";
import { DomainEventMap } from "./EventMap";

export class RxEventBus implements IEventBus {
  private subject = new Subject<DomainEvent>();

  async publish<T extends DomainEvent>(event: T) {
    this.subject.next(event);
  }

  // Перегрузка для событий из DomainEventMap (с типизацией)
  subscribe<K extends keyof DomainEventMap>(
    eventName: K,
    handler: EventHandler<DomainEventMap[K]>
  ): () => void;
  
  // Перегрузка для произвольных событий (fallback)
  subscribe<T extends DomainEvent>(
    eventName: string,
    handler: EventHandler<T>
  ): () => void;
  
  // Реализация
  subscribe<T extends DomainEvent>(
    eventName: string | keyof DomainEventMap,
    handler: EventHandler<T>
  ) {
    const sub = this.subject
      .pipe(filter((e) => e.name === eventName))
      .subscribe(async (e) => {
        try {
          await Promise.resolve(handler(e as T));
        } catch (err) {
          console.error(err);
        }
      });
    return () => sub.unsubscribe();
  }
}
