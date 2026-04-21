import './domain/events/events'

import { DomainEventMap } from '@core/kernel'
import type { DependencyContainer } from 'tsyringe'

import type { CoreRuntime, FeatureModule } from '../../kernel/CoreRuntime'
import type { IEventBus } from '../../kernel/EventBus'

export class NotificationsModule implements FeatureModule {
    register(_container: DependencyContainer, eventBus: IEventBus, _runtime: CoreRuntime) {
        eventBus.subscribe('UserLoggedInEvent', (event: DomainEventMap['UserLoggedInEvent']) => {
            console.log('🔔 Notification:', event.user.email, 'logged in')
        })
    }
}
