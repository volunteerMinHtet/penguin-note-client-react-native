import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Toast from 'react-native-root-toast'
import NoteApi from './noteApi'

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
export const fetchNotes = createAsyncThunk('note/fetchNotes', async (_, { rejectWithValue }) => {
    try {
        const response = await NoteApi.getNotes()
        const json = await response.json()

        if (response.ok) {
            return json
        } else {
            return rejectWithValue(json)
        }
    } catch (error) {
        return rejectWithValue({
            message: 'Oops, something went wrong to show notes!',
        })
    }
})

// createAsyncThunk - create new note
export const createNewNote = createAsyncThunk(
    'note/createNewNote',
    async ({ note, authToken }, { rejectWithValue }) => {
        try {
            const response = await NoteApi.createNewSingleNote(note, authToken)
            const json = await response.json()

            if (response.ok) {
                Toast.show('Saved note', {
                    duration: Toast.durations.LONG,
                })

                return json
            } else {
                return rejectWithValue(json)
            }
        } catch (error) {
            return rejectWithValue({
                message: 'Oops, something went wrong to save note!',
            })
        }
    }
)

export const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        pushNewNote: (state, action) => {
            state.value = [...state.value, action.payload]
        },
        setNoteListScrollDirection: (state, action) => {
            state.meta.scroll.direction = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            // actions - get all notes from server - start
            .addCase(fetchNotes.pending, (state) => {
                state.status = 'loading'
                state.message = null
            })
            .addCase(fetchNotes.fulfilled, (state, action) => {
                state.status = 'idle'
                state.value = [...state.value, ...action.payload.data]
                state.message = null
            })
            .addCase(fetchNotes.rejected, (state, action) => {
                state.status = 'error'
                state.message = action.payload.message
            })
            // actions - get all notes from server - end

            // actions - create a new note - start
            .addCase(createNewNote.pending, (state) => {
                state.status = 'loading'
                state.message = null
            })
            .addCase(createNewNote.fulfilled, (state, action) => {
                state.status = 'idle'
                state.value = [...state.value, action.payload.data]
                state.message = null
            })
            .addCase(createNewNote.rejected, (state, action) => {
                state.status = 'error'
                state.message = action.payload.message
            })
        // actions - create a new note - end
    },
})

export const { pushNewNote, setNoteListScrollDirection } = noteSlice.actions

export const selectNote = (state) => state.note
export const selectNoteMeta = (state) => state.note.meta

const noteReducer = noteSlice.reducer

export default noteReducer
