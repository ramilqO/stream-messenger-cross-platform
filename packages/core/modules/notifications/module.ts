import './domain/events/events'

import type { DependencyContainer } from 'tsyringe'

import type { CoreRuntime, FeatureModule } from '../../kernel/CoreRuntime'
import type { DomainEventMap } from '../../kernel/DomainEvent'
import type { IEventBus } from '../../kernel/EventBus'

export class NotificationsModule implements FeatureModule {
    register(_container: DependencyContainer, _eventBus: IEventBus, runtime: CoreRuntime) {
        runtime.subscribeToEvent(
            'UserLoggedInEvent',
            (event: DomainEventMap['UserLoggedInEvent']) => {
                console.log('🔔 Notification:', event.user.email, 'logged in')
            },
        )
    }
}
