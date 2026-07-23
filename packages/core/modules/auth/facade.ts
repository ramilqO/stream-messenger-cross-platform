import type { AuthenticatedUser } from './application/dto/AuthenticatedUser'
import type { LoginCredentials } from './domain/repositories/IAuthRepository'

export type { AuthenticatedUser, LoginCredentials }

export interface AuthFacade {
    login(credentials: LoginCredentials): Promise<AuthenticatedUser>
    logout(): Promise<void>
}

declare module '@stream/core' {
    export interface FacadesMap {
        auth: AuthFacade
    }
}
