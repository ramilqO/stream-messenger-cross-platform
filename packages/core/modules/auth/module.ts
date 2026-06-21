import './domain/events'
import './facade'

import type { DependencyContainer } from 'tsyringe'

import type { CoreRuntime, FeatureModule } from '../../kernel/CoreRuntime'
import type { IEventBus } from '../../kernel/EventBus'
import { LoginUseCase } from './application/LoginUseCase'
import { LogoutUseCase } from './application/use-cases/LogoutUseCase'
import type { IAuthRepository } from './domain/repositories/IAuthRepository'
import { AuthRepositoryInMemory } from './infrastructure/AuthRepositoryInMemory'

export class AuthModule implements FeatureModule {
    register(container: DependencyContainer, eventBus: IEventBus, runtime: CoreRuntime) {
        container.register<IAuthRepository>('IAuthRepository', {
            useClass: AuthRepositoryInMemory,
        })

        container.register('LoginUseCase', {
            useFactory: (c) => new LoginUseCase(c.resolve<IAuthRepository>('IAuthRepository'), eventBus),
        })

        container.register('LogoutUseCase', {
            useFactory: (c) => new LogoutUseCase(c.resolve<IAuthRepository>('IAuthRepository'), eventBus),
        })

        runtime.registerFacade('auth', {
            login: async (credentials) => {
                const loginUseCase = container.resolve<LoginUseCase>('LoginUseCase')
                return loginUseCase.execute(credentials)
            },

            logout: async () => {
                const logoutUseCase = container.resolve<LogoutUseCase>('LogoutUseCase')
                await logoutUseCase.execute()
            },
        })
    }
}
