import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import noteReducer from '../features/note/private/noteSlice'
import publicNoteReducer from '../features/note/public/publicNoteSlice'
import themeReducer from '../features/theme/themeSlice'
import userReducer from '../features/user/userSlice'

export const store = configureStore({
    reducer: {
        theme: themeReducer,
        auth: authReducer,
        user: userReducer,
        note: noteReducer,
        publicNote: publicNoteReducer,
    },
})
