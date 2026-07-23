export interface AuthUserView {
    id: string
    email: string
}

export interface AuthViewState {
    user: AuthUserView | null
    loading: boolean
    error: string | null
}

export const initialAuthViewState: AuthViewState = {
    user: null,
    loading: false,
    error: null,
}
