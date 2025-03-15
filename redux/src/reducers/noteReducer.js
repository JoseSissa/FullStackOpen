const generateID = () => Math.floor(Math.random() * 1000 + 1)

export const initNotes = (notes) => {
  return {
    type: '@notes/init',
    payload: notes
  }
}

export const createNote = (content) => {
  return {
    type: '@notes/created',
    payload: {
      content,
      important: false,
      id: generateID()
    }
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