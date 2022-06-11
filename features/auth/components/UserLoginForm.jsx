import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useMemo } from 'react'
import { TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import { login, selectAuth } from '../authSlice'
import { selectTheme } from '../../theme/themeSlice'

const IconTextInput = ({ icon, placeholder, value, onChangeText, ...props }) => {
    const { theme } = useSelector(selectTheme)

    return (
        <View style={[styles.textInputContainer, { borderColor: theme.colors.border }]}>
            <View style={styles.textInputIcon}>{icon}</View>
            <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                style={styles.textInput}
                selectionColor={theme.colors.primary}
                {...props}
            />
        </View>
    )
}

const UserLoginForm = () => {
    const [data, setData] = React.useState({
        user_name: '',
        password: '',
    })

    const canSubmit = useMemo(() => {
        return !!data.user_name && !!data.password
    }, [data])

    const { status, message } = useSelector(selectAuth)
    const { theme } = useSelector(selectTheme)

    const dispatch = useDispatch()

    const handleLogin = () => {
        if (canSubmit) dispatch(login(data))
    }

    return (
        <View style={styles.container}>
            <IconTextInput
                icon={<Ionicons name="person-outline" size={17} color="black" />}
                placeholder="Username"
                value={data.user_name}
                onChangeText={(text) => setData({ ...data, user_name: text })}
            />

            <IconTextInput
                icon={<Ionicons name="lock-closed-outline" size={17} color="black" />}
                placeholder="Password"
                value={data.password}
                onChangeText={(text) => setData({ ...data, password: text })}
                secureTextEntry={true}
            />

            <TouchableOpacity
                onPress={handleLogin}
                style={[styles.submitBtnContainer, { backgroundColor: theme.colors.primary }]}
            >
                <Text style={styles.submitBtnText}>Login</Text>
            </TouchableOpacity>

            <Text
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    textAlign: 'center',
                    marginVertical: 20,
                    fontSize: 16,
                }}
            >
                {status}
            </Text>

            {message ? (
                <Text
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        textAlign: 'center',
                        marginVertical: 20,
                        fontSize: 16,
                    }}
                >
                    {message}
                </Text>
            ) : null}
        </View>
    )
}

export default UserLoginForm

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        alignSelf: 'stretch',
    },
    textInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
        paddingVertical: 5,
        borderWidth: 1,
        borderRadius: 20,
    },
    textInputIcon: {
        marginHorizontal: 15,
    },
    textInput: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 0,
    },
    submitBtnContainer: {
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    submitBtnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
})
