import { useParams } from 'react-router-dom'

export default function NoteDetail({ notes }) {
    const { noteId } = useParams()
    const note = notes.find(note => note.id === noteId)
    console.log({note});
    
    

    return (
        <div>
            <h2>{note.content}</h2>
            <div>
                <strong>
                    {note.important ? 'important' : ''}
                </strong>
            </div>
        </div>
    )
}