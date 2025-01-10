import { useState, useEffect } from 'react'
import noteService from './services/notes'

import Note from './components/Note'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    noteService.getAll()
      .then(response => {
        setNotes(response)
      })
  }, [])

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

  const toggleImportanceOf = note => {
    const id = note.id
    const changedNote = { ...note, important: !note.important }    
    noteService.update(id, changedNote)
      .then(response => {
        setNotes(notes.map(elem => elem.id !== id ? elem : response))
      })
  }

  const deleteNote = id => {
    noteService.deleteNote(id)
      .then(res => {
        setNotes(notes.filter(note => note.id !== res.id))
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {notesToShow.map(note => {            
            return (<Note key={note.id} note={note} toggleImportanceOf={() => toggleImportanceOf(note)} deleteNote={() => deleteNote(note.id)} />)
          }
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} placeholder='a new note...' />
        <button type="submit">save</button>
      </form> 
    </div>
  )
}

export default App