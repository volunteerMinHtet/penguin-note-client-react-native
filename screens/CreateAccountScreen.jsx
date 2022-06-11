import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'
import React, { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { createAccount } from '../features/auth/authSlice'

const CreateAccountScreen = () => {
    const [data, setData] = React.useState({
        name: '',
        user_name: '',
        password: '',
    })

    const dispatch = useDispatch()

    const handleCreateAccount = useMemo(() => {
        dispatch(createAccount(data))
    }, [data])

    return (
        <View style={styles.container}>
            <View style={{ marginBottom: 5 }}>
                <Text>Nick Name</Text>
                <TextInput
                    value={data.name}
                    onChangeText={(text) => setData({ ...data, name: text })}
                    style={styles.input}
                />
            </View>

            <View style={{ marginBottom: 5 }}>
                <Text>User name</Text>
                <TextInput
                    value={data.user_name}
                    onChangeText={(text) =>
                        setData({ ...data, user_name: text })
                    }
                    style={styles.input}
                />
            </View>

            <View style={{ marginBottom: 5 }}>
                <Text>Password</Text>
                <TextInput
                    value={data.password}
                    onChangeText={(text) =>
                        setData({ ...data, password: text })
                    }
                    style={styles.input}
                />
            </View>

            <View style={{ marginBottom: 5 }}>
                <TouchableOpacity
                    onPress={handleCreateAccount}
                    style={styles.button}
                >
                    <Text>Create Account</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CreateAccountScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        alignSelf: 'stretch',
        marginHorizontal: 16,
    },
    input: {
        borderWidth: 1,
        paddingHorizontal: 7,
        paddingVertical: 5,
        alignSelf: 'stretch',
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#0066ff',
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignSelf: 'stretch',
    },
})
