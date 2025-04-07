import { useDispatch } from 'react-redux'
import { createNote } from '../reducers/noteReducer'
import { createNewNote } from '../services/notes.js'


export default function NewNote() {
    const dispatch = useDispatch()
    
    const addNote = async (e) => {
        e.preventDefault()
        const content = e.target.note.value
        const newNote = await createNewNote(content) // This create is from service   
        dispatch(createNote(newNote))                // This create is from reducer 
        e.target.note.value = ''
    }

    return (
        <form onSubmit={addNote}>
            <input type="text" name="note" />
            <button>Add</button>
        </form>
    )
}