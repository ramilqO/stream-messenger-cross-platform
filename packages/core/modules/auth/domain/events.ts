import { DomainEvent } from "../../../kernel/DomainEvent";

export class UserLoggedInEvent extends DomainEvent {
  readonly name = "UserLoggedInEvent";

  constructor(public user: { id: string; email: string }) {
    super();
  }
}
