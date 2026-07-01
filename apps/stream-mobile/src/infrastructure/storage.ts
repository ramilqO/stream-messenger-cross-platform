import AsyncStorage from '@react-native-async-storage/async-storage'

export const storage = {
    getString: async (key: string): Promise<string | null> => {
        try {
            return await AsyncStorage.getItem(key)
        } catch (error) {
            console.error(`Storage Error [getItem] for key ${key}:`, error)
            return null
        }
    },
    setString: async (key: string, value: string): Promise<void> => {
        try {
            await AsyncStorage.setItem(key, value)
        } catch (error) {
            console.error(`Storage Error [setItem] for key ${key}:`, error)
        }
    },
}
