import { User } from '../domain/entities/User'
import type { IAuthRepository, LoginCredentials } from '../domain/repositories/IAuthRepository'

export class AuthRepositoryInMemory implements IAuthRepository {
    async login(credentials: LoginCredentials): Promise<User> {
        return new User(credentials.email, credentials.password, 'demo-user-id')
    }
}
