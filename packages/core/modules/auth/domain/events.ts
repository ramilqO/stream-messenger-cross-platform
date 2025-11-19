import { DomainEvent } from '../../../kernel/DomainEvent'

/**
 * Event fired when a user logs in.
 *
 * @remarks
 * Notifies subscribers that the user has successfully authenticated.
 */
export class UserLoggedInEvent extends DomainEvent {
    name: 'UserLoggedInEvent' = 'UserLoggedInEvent'
    userId: string
    user: { id: string; email: string }

    constructor(user: { id: string; email: string }) {
        super()
        this.userId = user.id
        this.user = user
    }
}

/**
 * Event fired when a user logs in.
 *
 * @remarks
 * Notifies subscribers that the user has successfully logged out.
 */
export class UserLoggedOutEvent extends DomainEvent {
    name: 'UserLoggedOutEvent' = 'UserLoggedOutEvent'
    userId: string

    /**
     * Creates a new UserLoggedOutEvent.
     * @param userId - The ID of the user who logged out.
     */
    constructor(userId: string) {
        super()
        this.userId = userId
    }
}

declare module '../../../kernel/DomainEvent' {
    export interface DomainEventMap {
        UserLoggedInEvent: UserLoggedInEvent
        UserLoggedOutEvent: UserLoggedOutEvent
    }
}
