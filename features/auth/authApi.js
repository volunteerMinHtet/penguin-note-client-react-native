import BaseAPI from '../../utils/api'

const login = (data) => {
    const bodyData = JSON.stringify({
        user_name: data?.user_name,
        password: data?.password,
    })

    return BaseAPI.post('/auth/login', bodyData)
}

const createAccount = (data) => {
    const bodyData = JSON.stringify({
        name: data?.name,
        user_name: data?.user_name,
        password: data?.password,
    })

    return BaseAPI.post('/auth/register', bodyData)
}

const checkTokenIsValid = (token) => {
    const headers = {
        Authorization: `Bearer ${token}`,
    }

    return BaseAPI.get('/auth/token/check', headers)
}

const AuthApi = {
    login,
    createAccount,
    checkTokenIsValid,
}

export default AuthApi
