import { getAll, createNewNote } from "../services/notes"
const generateID = () => Math.floor(Math.random() * 1000 + 1)

export const initNotes = () => {
  return async (dispatch) => {
    const notes = await getAll()
    dispatch({
      type: '@notes/init',
      payload: notes
    })
  }
}

export const createNote = content => {
  return async (dispatch) => {
    const newNote = await createNewNote(content)
    dispatch({
      type: '@notes/created',
      payload: {
        content: newNote.content,
        important: newNote.important,
        id: newNote.id || generateID()
      }
    })
  }
}

export const toggleImportanceOf = (id) => {
  return {
    type: '@notes/toggleImportance',
    payload: {
      id
    }
  }
}

export const noteReducer = (state = [], action) => {
    if (action.type === '@notes/created') {
      return state.concat(action.payload)
    }

    if(action.type === '@notes/toggleImportance') {
        const { id } = action.payload
        
        return state.map(note => {
            if(note.id === id) {
                return {
                    ...note,
                    important: !note.important
                }
            }
            return note
        })
    }

    if(action.type === '@notes/init') {
        return action.payload
    }
  
    return state
}