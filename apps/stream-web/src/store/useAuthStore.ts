// presentation/stores/useAuthStore.ts
import { User } from '@core/modules/auth/domain/entities/User'
import { create } from 'zustand'

interface AuthStore {
    currentUser: User | null
    setCurrentUser: (user: User | null) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
    currentUser: null,
    setCurrentUser: (user) => set({ currentUser: user }),
}))
