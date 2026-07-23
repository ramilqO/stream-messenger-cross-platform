import { IEventBus } from '@core/kernel'

import { UserLoggedInEvent } from '../../domain/events'
import { IAuthRepository, LoginCredentials } from '../../domain/repositories/IAuthRepository'
import { AuthenticatedUser } from '../dto/AuthenticatedUser'
import { toAuthenticatedUser } from '../mappers/toAuthenticatedUser'

export class LoginUseCase {
    constructor(
        private repo: IAuthRepository,
        private eventBus: IEventBus,
    ) {}

    async execute(credentials: LoginCredentials): Promise<AuthenticatedUser> {
        const user = await this.repo.login(credentials)
        await this.eventBus.publish(new UserLoggedInEvent(user))

        return toAuthenticatedUser(user)
    }
}
