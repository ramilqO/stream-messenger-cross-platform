import { DomainEvent } from "../../../../kernel/DomainEvent";
import { Message } from "../entities/Message";

export class MessageSentEvent extends DomainEvent {
  readonly name = "MessageSentEvent";
  constructor(public readonly message: Message) {
    super();
  }
}
