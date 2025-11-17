import { DomainEvent } from "../../../kernel/DomainEvent";

// TODO: Module Augmenatition: add event to the global DomainEventMap

export class UserLoggedInEvent extends DomainEvent {
  readonly name = "UserLoggedInEvent";

  constructor(public user: { id: string; email: string }) {
    super();
  }
}
