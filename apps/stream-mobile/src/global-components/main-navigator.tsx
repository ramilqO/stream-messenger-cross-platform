import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { AuthStackNavigator } from '../features/auth/navigation/navigation'

const Stack = createNativeStackNavigator()

export const MainNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="AuthStack" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="AuthStack" component={AuthStackNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
