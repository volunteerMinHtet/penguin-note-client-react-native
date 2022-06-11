import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import UserApi from './userApi'

const initialState = {
    data: {},
    status: 'idle',
    message: null,
}

// createAsyncThunk - fetch user detail by token
export const fetchUserByToken = createAsyncThunk('user/fetchByToken', async (authToken, { rejectWithValue }) => {
    try {
        const response = await UserApi.getUserByToken(authToken)
        const json = await response.json()

        if (response.ok) {
            return json
        } else {
            return rejectWithValue(json)
        }
    } catch (error) {
        return rejectWithValue({
            message: 'Oops, something went wrong to show your account!',
        })
    }
})

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // actions - fetch user account detail from server - start
            .addCase(fetchUserByToken.pending, (state) => {
                state.status = 'loading'
                state.message = null
            })
            .addCase(fetchUserByToken.fulfilled, (state, action) => {
                state.status = 'idle'
                state.data = action.payload.data
                state.message = null
            })
            .addCase(fetchUserByToken.rejected, (state, action) => {
                state.status = 'error'
                state.message = action.payload.message
            })
        // actions - fetch user account detail from server - end
    },
})

export const selectUser = (state) => state.user

const userReducer = userSlice.reducer

export default userReducer
