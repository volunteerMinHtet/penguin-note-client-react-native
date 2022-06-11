import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import UserLoginForm from '../features/auth/components/UserLoginForm'

const LoginScreen = () => {
    return (
        <View style={styles.container}>
            <UserLoginForm />
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        marginHorizontal: 16,
    },
})
