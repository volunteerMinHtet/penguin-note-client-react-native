import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import PublicNoteApi from './publicNoteApi'

const initialState = {
    value: [],
    status: 'idle',
    message: null,
    meta: {
        scroll: {
            direction: 'up',
        },
    },
}

// createAsyncThunk - get all notes from server
export const fetchPublicNotes = createAsyncThunk('publicNote/fetchNotes', async (_, { rejectWithValue }) => {
    try {
        const response = await PublicNoteApi.getNotes()
        const json = await response.json()

        if (response.ok) {
            return json
        } else {
            return rejectWithValue(json)
        }
    } catch (error) {
        return rejectWithValue({
            message: 'Oops, something went wrong to show notes! (public)',
        })
    }
})

// createAsyncThunk - create new note
export const createNewPublicNote = createAsyncThunk(
    'publicNote/createNewNote',
    async ({ note, authToken }, { rejectWithValue }) => {
        try {
            const response = await PublicNoteApi.createNewSingleNote(note, authToken)
            const json = await response.json()

            if (response.ok) {
                return json
            } else {
                return rejectWithValue(json)
            }
        } catch (error) {
            return rejectWithValue({
                message: 'Oops, something went wrong to save note! (public)',
            })
        }
    }
)

export const publicNoteSlice = createSlice({
    name: 'publicNote',
    initialState,
    reducers: {
        pushNewPublicNote: (state, action) => {
            state.value = [...state.value, action.payload]
        },
        setPublicNoteListScrollDirection: (state, action) => {
            state.meta.scroll.direction = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            // actions - get all notes from server - start
            .addCase(fetchPublicNotes.pending, (state) => {
                state.status = 'loading'
                state.message = null
            })
            .addCase(fetchPublicNotes.fulfilled, (state, action) => {
                state.status = 'idle'
                state.value = [...state.value, ...action.payload.data]
                state.message = null
            })
            .addCase(fetchPublicNotes.rejected, (state, action) => {
                state.status = 'error'
                state.message = action.payload.message
            })
            // actions - get all notes from server - end

            // actions - create a new note - start
            .addCase(createNewPublicNote.pending, (state) => {
                state.status = 'loading'
                state.message = null
            })
            .addCase(createNewPublicNote.fulfilled, (state, action) => {
                state.status = 'idle'
                state.value = [...state.value, action.payload.data]
                state.message = null
            })
            .addCase(createNewPublicNote.rejected, (state, action) => {
                state.status = 'error'
                state.message = action.payload.message
            })
        // actions - create a new note - end
    },
})

export const { pushNewPublicNote, setPublicNoteListScrollDirection } = publicNoteSlice.actions

export const selectPublicNote = (state) => state.publicNote
export const selectPublicNoteMeta = (state) => state.publicNote.meta

const publicNoteReducer = publicNoteSlice.reducer

export default publicNoteReducer
