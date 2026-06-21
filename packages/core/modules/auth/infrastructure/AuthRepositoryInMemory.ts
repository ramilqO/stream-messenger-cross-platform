import { User } from '../domain/entities/User'
import type { IAuthRepository, LoginCredentials } from '../domain/repositories/IAuthRepository'

export class AuthRepositoryInMemory implements IAuthRepository {
    private currentUser: User | null = null

    async login(credentials: LoginCredentials): Promise<User> {
        const user = new User(credentials.email, credentials.password, 'demo-user-id')
        this.currentUser = user
        return user
    }

    async logout(): Promise<string | null> {
        const userId = this.currentUser?.id ?? null
        this.currentUser = null
        return userId
    }
}
