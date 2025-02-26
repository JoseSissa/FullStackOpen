import { useDispatch } from 'react-redux'
import { createNote } from '../reducers/noteReducer'


export default function NewNote() {
    const dispatch = useDispatch()
    
    const addNote = e => {
        e.preventDefault()
        const content = e.target.note.value
        dispatch(createNote(content))
        e.target.note.value = ''
    }

    return (
        <form onSubmit={addNote}>
            <input type="text" name="note" />
            <button>Add</button>
        </form>
    )
}