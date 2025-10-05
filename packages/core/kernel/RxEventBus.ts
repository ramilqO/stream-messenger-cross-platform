import { Subject } from "rxjs";
import { filter } from "rxjs/operators";
import { DomainEvent } from "./DomainEvent";
import { EventHandler, IEventBus } from "./EventBus";

export class RxEventBus implements IEventBus {
  private subject = new Subject<DomainEvent>();

  async publish<T extends DomainEvent>(event: T) {
    this.subject.next(event);
  }

  subscribe<T extends DomainEvent>(
    eventName: string,
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
