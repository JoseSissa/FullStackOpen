import { useState, useEffect } from 'react'
import noteService from './services/noteService'
import { FormLogin } from './components/FormLogin'
import { FormCreateNote } from './components/FormCreateNote'

import Note from './components/Note'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    noteService.getAll()
      .then(response => {
        setNotes(response)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

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

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      { user === null
        ? <FormLogin { ...{ setUser } } />
        : (
          <div>
            <h3>Hola, {user.name}</h3>
            <FormCreateNote { ...{ newNote, setNewNote, notes, setNotes, user } } />
          </div>
        )
      }
      
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
    </div>
  )
}

export default App