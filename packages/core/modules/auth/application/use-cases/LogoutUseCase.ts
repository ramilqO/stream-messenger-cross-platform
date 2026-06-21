import type { IEventBus } from '../../../../kernel/EventBus'
import { UserLoggedOutEvent } from '../../domain/events'
import type { IAuthRepository } from '../../domain/repositories/IAuthRepository'

export class LogoutUseCase {
    constructor(
        private repo: IAuthRepository,
        private eventBus: IEventBus,
    ) {}

    async execute(): Promise<void> {
        const userId = await this.repo.logout()

        if (userId) {
            await this.eventBus.publish(new UserLoggedOutEvent(userId))
        }
    }
}
