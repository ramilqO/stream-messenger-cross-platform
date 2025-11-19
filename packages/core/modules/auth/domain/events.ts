import { DomainEvent } from "../../../kernel/DomainEvent";

// TODO: Module Augmenatition: add event to the global DomainEventMa

export interface UserLoggedInEvent extends DomainEvent {
  name: "UserLoggedInEvent";
  userId: string;
  user: {
    id: string;
    email: string;
  };
}

export interface UserLoggedOutEvent extends DomainEvent {
  name: "UserLoggedOutEvent";
  userId: string;
}

declare module "../../../kernel/DomainEvent" {
  export interface DomainEventMap {
    UserLoggedInEvent: UserLoggedInEvent;
    UserLoggedOutEvent: UserLoggedOutEvent;
  }
}
