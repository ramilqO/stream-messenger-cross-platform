import type { User } from '../entities/User'

export interface LoginCredentials {
    email: string
    password: string
}

export interface IAuthRepository {
    login(credentials: LoginCredentials): Promise<User>
}
