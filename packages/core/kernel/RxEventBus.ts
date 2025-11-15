import { Subject } from "rxjs";
import { filter } from "rxjs/operators";
import { DomainEvent } from "./DomainEvent";
import { IEventBus } from "./EventBus";

export class RxEventBus implements IEventBus {
  private subject = new Subject<DomainEvent>();

  async publish(event: DomainEvent): Promise<void> {
    this.subject.next(event);
  }

  subscribe(eventName: string, handler: (event: DomainEvent) => void) {
    const sub = this.subject
      .pipe(filter((e) => e.name === eventName))
      .subscribe(handler);

    return () => sub.unsubscribe();
  }
}
