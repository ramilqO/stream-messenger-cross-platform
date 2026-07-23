import { DomainEvent } from '../../../../kernel/DomainEvent'

export class ShowNotificationEvent extends DomainEvent {
    name: 'ShowNotificationEvent' = 'ShowNotificationEvent'

    constructor(
        public title: string,
        public message: string,
    ) {
        super()
    }
}

export class CloseNotificationEvent extends DomainEvent {
    name: 'CloseNotificationEvent' = 'CloseNotificationEvent'

    constructor(public notificationId: number) {
        super()
    }
}

declare module '@stream/core' {
    interface DomainEventMap {
        ShowNotificationEvent: ShowNotificationEvent
        CloseNotificationEvent: CloseNotificationEvent
    }
}
