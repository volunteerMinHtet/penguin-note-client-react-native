import BaseAPI from '../../../utils/api'

const getNote = (id) => {
    return BaseAPI.get(`/notes/private/${id}`)
}

const getNotes = () => {
    return BaseAPI.get('/notes/private')
}

const createNewSingleNote = (note, authToken) => {
    const bodyData = JSON.stringify({
        title: note?.title,
        body: note?.body,
        is_public: false,
        background_color: note?.theme?.background,
        text_color: note?.theme?.text,
        theme_name: note?.theme?.name,
    })

    const headers = {
        Authorization: `Bearer ${authToken}`,
    }

    return BaseAPI.post('/notes/create', bodyData, headers)
}

const NoteApi = {
    getNote,
    getNotes,
    createNewSingleNote,
}

export default NoteApi
