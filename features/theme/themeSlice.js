import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { defaultTheme, darkTheme } from '../../utils/theme'
import { getLastChangedThemeFromStorage, storeChangedThemeInStorage } from './themeUtils'

const initialState = {
    isInitialized: false,
    isDark: false,
    theme: {
        ...defaultTheme,
    },
    status: 'idle',
    message: '',
}

export const initializeTheme = createAsyncThunk('theme/initialize', async (_, { fulfillWithValue }) => {
    try {
        const isDark = await getLastChangedThemeFromStorage()

        if (isDark) {
            return {
                isDark,
                theme: {
                    ...darkTheme,
                },
            }
        } else {
            return {
                isDark,
                theme: {
                    ...defaultTheme,
                },
            }
        }
    } catch (error) {
        return fulfillWithValue({
            isDark: initialState.isDark,
            theme: initialState.theme,
            message: 'Error while initializing theme',
        })
    }
})

export const switchTheme = createAsyncThunk('theme/switchTheme', async (_, { fulfillWithValue, getState }) => {
    try {
        const { isDark } = getState().theme

        if (isDark) {
            await storeChangedThemeInStorage(false)
            return { isDark: !isDark, theme: { ...defaultTheme } }
        } else {
            await storeChangedThemeInStorage(true)
            return { isDark: !isDark, theme: { ...darkTheme } }
        }
    } catch (error) {
        const { isDark } = getState().theme
        const message = `Switched theme but can't save your changes!`

        if (isDark) {
            return fulfillWithValue({
                isDark: false,
                theme: { ...defaultTheme },
                message,
            })
        } else {
            return fulfillWithValue({
                isDark: true,
                theme: { ...darkTheme },
                message,
            })
        }
    }
})

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        // switchTheme: (state) => {
        //     if (!state.isDark) {
        //         state.theme = {
        //             ...darkTheme,
        //         }
        //     } else {
        //         state.theme = {
        //             ...defaultTheme,
        //         }
        //     }
        //     state.isDark = !state.isDark
        // },
    },
    extraReducers: (builder) => {
        builder
            // actions - initializeTheme - start
            .addCase(initializeTheme.pending, (state) => {
                state.status = 'loading'
                state.message = 'Processing...'
            })
            .addCase(initializeTheme.fulfilled, (state, action) => {
                state.isInitialized = true
                state.status = 'idle'
                state.isDark = action.payload.isDark
                state.theme = action.payload.theme
                // state.message = action.payload?.message
            })
            .addCase(initializeTheme.rejected, (state, action) => {
                state.isInitialized = true
                state.status = 'error'
                state.message = action.payload.message
            })
            // actions - initializeTheme - End

            // actions - switchTheme - start
            .addCase(switchTheme.pending, (state) => {
                state.status = 'loading'
                state.message = 'Processing...'
            })
            .addCase(switchTheme.fulfilled, (state, action) => {
                state.status = 'idle'
                state.isDark = action.payload.isDark
                state.theme = action.payload.theme
                state.message = action.payload?.message
            })
            .addCase(switchTheme.rejected, (state, action) => {
                state.status = 'error'
                state.message = action.payload.message
            })
        // actions - switchTheme - end
    },
})

// export const { switchTheme } = themeSlice.actions

export const selectTheme = (state) => state.theme

const themeReducer = themeSlice.reducer

export default themeReducer
