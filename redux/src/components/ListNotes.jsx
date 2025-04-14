import { toggleImportanceOf } from '../reducers/noteReducer'
import { useDispatch, useSelector } from 'react-redux'
import { updateNote } from '../services/notes.js'
import { Link } from 'react-router-dom'

export default function ListNotes() {
    const state = useSelector(({filter, notes}) => {
        if(filter === 'ALL') {
            return notes
        } else if(filter === 'IMPORTANT') {
            return notes.filter(note => note.important)
        } else if(filter === 'NONIMPORTANT') {
            return notes.filter(note => !note.important)
        }
    })    
    
    const dispatch = useDispatch()

    const toggleImportance = (content) => {
        updateNote(content)
        dispatch(toggleImportanceOf(content.id))
    }
    
    return (
        <ul>
            {
                state.map(note => 
                    <li key={note.id}>
                        <Link to={`/notes/${note.id}`}>{note.content}</Link>
                        <strong>{note.important ? 'important' : ''}</strong>
                        <button onClick={() => toggleImportance(note)}>toggle importance</button>
                    </li>
                )
            }
        </ul>
    )
}