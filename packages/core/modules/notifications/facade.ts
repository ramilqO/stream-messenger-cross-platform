import { Notification } from './domain/entities/Notification'

export interface NotificationsFacade {
    showNotification(notification: Notification): void
    closeNotification(): void
}

declare module '@stream/core' {
    export interface FacadesMap {
        notifications: NotificationsFacade
    }
}
