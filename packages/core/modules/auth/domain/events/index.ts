import { DomainEvent } from '../../../../kernel/DomainEvent'
import { User } from '../entities/User'

export class UserLoggedInEvent extends DomainEvent {
    name: 'UserLoggedInEvent' = 'UserLoggedInEvent'
    constructor(public user: User) {
        super()
    }
}

export class UserLoggedOutEvent extends DomainEvent {
    name: 'UserLoggedOutEvent' = 'UserLoggedOutEvent'
    constructor(public userId: string) {
        super()
    }
}

declare module '@stream/core' {
    interface DomainEventMap {
        UserLoggedInEvent: UserLoggedInEvent
        UserLoggedOutEvent: UserLoggedOutEvent
    }
}
