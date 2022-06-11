import AsyncStorage from '@react-native-async-storage/async-storage'

export const getStringData = async (key) => {
    try {
        return await AsyncStorage.getItem(key)
    } catch (error) {
        throw new Error(`Error getting string data from local storage: ${error}`)
    }
}

export const storeStringData = async (key, value) => {
    try {
        return await AsyncStorage.setItem(key, value)
    } catch (error) {
        throw new Error(`Error storing string data in local storage: ${error}`)
    }
}

export const getBooleanData = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        return JSON.parse(jsonValue)
    } catch (error) {
        throw new Error(`Error getting boolean data from local storage: ${error}`)
    }
}

export const storeBooleanData = async (key, value) => {
    try {
        return await AsyncStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
        throw new Error(`Error storing boolean data in local storage: ${error}`)
    }
}
