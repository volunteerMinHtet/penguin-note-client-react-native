import Constants from 'expo-constants'
import { getStringData, storeStringData } from '../../utils/localStorage'

const { AUTH_TOKEN_KEY } = Constants.manifest.extra

export const getUserTokenFromStorage = async () => {
    return await getStringData(AUTH_TOKEN_KEY ?? '@authToken')
}

export const storeUserTokenInStorage = async (token) => {
    return await storeStringData(AUTH_TOKEN_KEY ?? '@authToken', token)
}
