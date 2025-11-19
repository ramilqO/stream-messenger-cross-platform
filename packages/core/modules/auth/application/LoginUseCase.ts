import type { IEventBus } from '../../../kernel/EventBus'
import { User } from '../domain/entities/User'
import { UserLoggedInEvent } from '../domain/events'
import { AuthRepositoryInMemory } from '../infrastructure/AuthRepositoryInMemory'

export class LoginUseCase {
    constructor(
        private repo: AuthRepositoryInMemory,
        private eventBus: IEventBus
    ) {}

    async execute(userArg: User): Promise<User> {
        const user = await this.repo.login({
            email: userArg.email,
            password: userArg.password,
        })
        await this.eventBus.publish(new UserLoggedInEvent(user))

        return user
    }
}
