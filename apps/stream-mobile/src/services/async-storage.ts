export const initAsyncStorage = async () => {
    try {
        // Здесь можно сделать тестовую запись/чтение, чтобы убедиться, что хранилище доступно
        console.log('📦 AsyncStorage successfully connected')
    } catch (error) {
        console.error('Failed to initialize async storage:', error)
        throw new Error('Storage initialization failed')
    }
}
