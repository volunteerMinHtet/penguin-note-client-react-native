import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchUserByToken } from '../user/userSlice'
import { getUserTokenFromStorage, storeUserTokenInStorage } from './authUtils'
import AuthApi from './authApi'

const initialState = {
    isInitialized: false,
    status: 'idle',
    isAuthenticated: false,
    token: null,
    message: null,
}

// createAsyncThunk - first time check token and set authenticated (auto login)
export const initializeAuth = createAsyncThunk('auth/initialize', async (_, { rejectWithValue, dispatch }) => {
    try {
        const token = await getUserTokenFromStorage()

        if (token) {
            const response = await AuthApi.checkTokenIsValid(token)
            const json = await response.json()

            if (response.ok) {
                dispatch(fetchUserByToken(token))
                return { ...json, token }
            } else {
                return rejectWithValue(json)
            }
        } else {
            return rejectWithValue({
                message: 'No token found',
            })
        }
    } catch (error) {
        return rejectWithValue({
            message: 'Oops, something went wrong to login your account!',
        })
    }
})

// createAsyncThunk - Account login
export const login = createAsyncThunk('auth/login', async (data, { rejectWithValue, dispatch }) => {
    try {
        const response = await AuthApi.login(data)
        const json = await response.json()

        if (response.ok) {
            await storeUserTokenInStorage(json.data.token)
            dispatch(fetchUserByToken(json.data.token))
            return json
        } else {
            return rejectWithValue(json)
        }
    } catch (error) {
        return rejectWithValue({
            message: 'Oops, something went wrong to login your account!',
        })
    }
})

// // createAsyncThunk - Account logout
// export const logout = createAsyncThunk('auth/login', async (data, { rejectWithValue, dispatch }) => {
//     try {
//         const response = await AuthApi.login(data)
//         const json = await response.json()

//         if (response.ok) {
//             await storeUserTokenInStorage(json.data.token)
//             dispatch(fetchUserByToken(json.data.token))
//             return json
//         } else {
//             return rejectWithValue(json)
//         }
//     } catch (error) {
//         return rejectWithValue({
//             message: 'Oops, something went wrong to login your account!',
//         })
//     }
// })

// createAsyncThunk - create new account
export const createAccount = createAsyncThunk('auth/create', async (data, { rejectWithValue, dispatch }) => {
    try {
        const response = await AuthApi.createAccount(data)
        const json = await response.json()

        if (response.ok) {
            await storeUserTokenInStorage(json.data.token)
            dispatch(fetchUserByToken(json.data.token))
            return json
        } else {
            return rejectWithValue(json)
        }
    } catch (error) {
        return rejectWithValue({
            message: 'Oops, something went wrong to create account!',
        })
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.status = 'complete'
            state.isAuthenticated = false
            state.token = null
            state.message = null
        },
    },
    extraReducers: (builder) => {
        builder
            // actions - check user token - start
            .addCase(initializeAuth.pending, (state) => {
                state.status = 'loading'
                state.message = 'Processing...'
            })
            .addCase(initializeAuth.fulfilled, (state, action) => {
                state.isInitialized = true
                state.status = 'complete'
                state.isAuthenticated = true
                state.token = action.payload.token
                state.message = action.payload.message
            })
            .addCase(initializeAuth.rejected, (state, action) => {
                state.isInitialized = true
                state.status = 'error'
                state.isAuthenticated = false
                state.token = null
                state.message = action.payload.message
            })
            // actions - check user token - end

            // actions - login user account - start
            .addCase(login.pending, (state) => {
                state.status = 'loading'
                state.message = 'Processing...'
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'complete'
                state.isAuthenticated = true
                state.token = action.payload.data.token
                state.message = action.payload.message
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'error'
                state.isAuthenticated = false
                state.token = null
                state.message = action.payload.message
            })
            // actions - login user account - end

            // actions - create user account - start
            .addCase(createAccount.pending, (state) => {
                state.status = 'loading'
                state.message = 'Creating account...'
            })
            .addCase(createAccount.fulfilled, (state, action) => {
                state.status = 'complete'
                state.isAuthenticated = true
                state.token = action.payload.data.token
                state.message = action.payload.message
            })
            .addCase(createAccount.rejected, (state, action) => {
                state.status = 'error'
                state.isAuthenticated = false
                state.token = null
                state.message = action.payload.message
            })
        // actions - create user account - end
    },
})

export const { logout } = authSlice.actions

export const selectAuth = (state) => state.auth

const authReducer = authSlice.reducer

export default authReducer
