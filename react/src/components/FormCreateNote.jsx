import noteService from '../services/notes'

export const FormCreateNote = ({ newNote, setNewNote, notes, setNotes }) => {
    const addNote = (e) => {
        e.preventDefault()
        const noteObject = {
            // id: notes.length + 1,
            content: newNote,
            important: Math.random() < 0.5
        }

        noteService.create(noteObject)
            .then(response => {
            setNotes(notes.concat(response))
            setNewNote('')
            })
    }

    const handleNoteChange = (event) => {
        setNewNote(event.target.value)
    }

    return (
        <form onSubmit={addNote}>
            <input value={newNote} onChange={handleNoteChange} placeholder='a new note...' />
            <button type="submit">save</button>
        </form> 
    )
}