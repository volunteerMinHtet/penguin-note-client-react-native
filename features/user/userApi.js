import BaseAPI from '../../utils/api'

const getUserByToken = (token) => {
    const headers = {
        Authorization: `Bearer ${token}`,
    }

    return BaseAPI.get('/user', headers)
}

const UserApi = {
    getUserByToken,
}

export default UserApi
