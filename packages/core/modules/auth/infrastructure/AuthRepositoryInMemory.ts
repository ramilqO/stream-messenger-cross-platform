import { User } from '../domain/entities/User'

export class AuthRepositoryInMemory {
    async login(user: User): Promise<User> {
        // запрос на получение пользователя
        return new User(user.email, user.password, user.id)
    }
}
