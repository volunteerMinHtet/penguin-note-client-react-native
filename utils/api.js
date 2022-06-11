import Constants from 'expo-constants'
import axios from 'axios'

const { SERVER_API_URL } = Constants.manifest.extra

// function to adjust the api url path
const adjustUrlPath = (path) => {
    return path.startsWith('/') ? path.slice(1) : path
}

// const BaseAPI = axios.create({
//     baseURL: `${SERVER_API_URL}`,
//     headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//     },
// })

// export default BaseAPI

const getApi = async (path = '', headers = {}, options = {}) => {
    let fixedUrl = adjustUrlPath(path)

    return await fetch(`${SERVER_API_URL}/${fixedUrl}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...headers,
        },
        ...options,
    })
}

// const postApi = async (path = '', data = {}, headers = {}, options = {}) => {
//     let fixedUrl = adjustUrlPath(path)

//     return await fetch(`${SERVER_API_URL}/${fixedUrl}`, {
//         method: 'POST',
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//             ...headers,
//         },
//         body: data,
//         ...options,
//     })
// }

const postApi = async (path = '', data = {}, headers = {}, options = {}) => {
    let fixedUrl = adjustUrlPath(path)

    return await fetch(`${SERVER_API_URL}/${fixedUrl}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...headers,
        },
        body: data,
        ...options,
    })
}

export default BaseAPI = {
    get: getApi,
    post: postApi,
}
