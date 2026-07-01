import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { AuthScreen } from '../screens/AuthScreen'
import { AuthNavigationParamList } from './types'

const Stack = createNativeStackNavigator<AuthNavigationParamList>()

export const AuthStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Auth">
            <Stack.Screen name="Auth" component={AuthScreen} />
        </Stack.Navigator>
    )
}
