import { toggleImportanceOf } from '../reducers/noteReducer'
import { useDispatch, useSelector } from 'react-redux'

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
    console.log(state);
    
    const dispatch = useDispatch()

    const toggleImportance = id => {
        dispatch(toggleImportanceOf(id))
    }
    
    return (
        <ul>
            {
                state.map(note => 
                    <li key={note.id}>
                        {note.content} <strong>{note.important ? 'important' : ''}</strong>
                        <button onClick={() => toggleImportance(note.id)}>toggle importance</button>
                    </li>
                )
            }
        </ul>
    )
}