import type { IEventBus } from '../../../kernel/EventBus'
import type { User } from '../domain/entities/User'
import { UserLoggedInEvent } from '../domain/events'
import type { IAuthRepository, LoginCredentials } from '../domain/repositories/IAuthRepository'

export class LoginUseCase {
    constructor(
        private repo: IAuthRepository,
        private eventBus: IEventBus,
    ) {}

    async execute(credentials: LoginCredentials): Promise<User> {
        const user = await this.repo.login(credentials)
        await this.eventBus.publish(new UserLoggedInEvent(user))

        return user
    }
}
