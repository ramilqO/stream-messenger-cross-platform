import type { DomainEvent } from '../../../../kernel/DomainEvent'

export interface CloseNotificationEvent extends DomainEvent {
    name: 'CloseNotificationEvent'
    notificationId: number
}

export interface ShowNotificationEvent extends DomainEvent {
    name: 'ShowNotificationEvent'
    title: string
    message: string
}

declare module '@core/kernel/DomainEvent' {
    export interface DomainEventMap {
        CloseNotificationEvent: CloseNotificationEvent
        ShowNotificationEvent: ShowNotificationEvent
    }
}
