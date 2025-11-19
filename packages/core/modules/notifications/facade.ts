import { Notification } from './domain/entities/Notification'

export interface NotificationsFacade {
    showNotification(notification: Notification): void
    closeNotification(): void
}

declare module '@core/kernel/Facades' {
    export interface FacadesMap {
        notifications: NotificationsFacade
    }
}
