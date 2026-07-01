import { StyleSheet, Text, View } from 'react-native'

export const AuthScreen = () => {
    return (
        <View style={styles.container}>
            <Text>AuthScreen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
})
