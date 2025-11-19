import { User } from './domain/entities/User'

export interface AuthFacade {
    login(user: User): Promise<User>
    logout(): void
}

declare module '@core/kernel/Facades' {
    export interface FacadesMap {
        auth: AuthFacade
    }
}
