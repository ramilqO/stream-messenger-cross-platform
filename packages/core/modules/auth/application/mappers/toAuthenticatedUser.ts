import type { User } from '../../domain/entities/User'
import type { AuthenticatedUser } from '../dto/AuthenticatedUser'

export function toAuthenticatedUser(user: User): AuthenticatedUser {
    if (!user.id) {
        throw new Error('Authenticated user must have an id')
    }

    return {
        id: user.id,
        email: user.email,
    }
}
