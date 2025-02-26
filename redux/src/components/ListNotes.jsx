import { toggleImportanceOf } from '../reducers/noteReducer'
import { useDispatch, useSelector } from 'react-redux'

export default function ListNotes() {
    const state = useSelector(state => state)
    const dispatch = useDispatch()

    const toggleImportance = id => {
        dispatch(toggleImportanceOf(id))
    }
    
    return (
        <ul>
            {
                state.map(note=>
                    <li key={note.id}>
                        {note.content} <strong>{note.important ? 'important' : ''}</strong>
                        <button onClick={() => toggleImportance(note.id)}>toggle importance</button>
                    </li>
                )
            }
        </ul>
    )
}