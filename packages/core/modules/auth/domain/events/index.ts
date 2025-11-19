import { DomainEvent } from '@core/kernel/DomainEvent'

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

declare module '@core/kernel/DomainEvent' {
    interface DomainEventMap {
        UserLoggedInEvent: UserLoggedInEvent
        UserLoggedOutEvent: UserLoggedOutEvent
    }
}
