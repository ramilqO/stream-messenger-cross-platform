import { MessageSentEvent } from "./MessageSentEvent";

declare module "../../../../kernel/EventMap" {
  interface DomainEventMap {
    MessageSentEvent: MessageSentEvent;
  }
}
