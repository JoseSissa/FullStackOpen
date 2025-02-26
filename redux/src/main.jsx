import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { configureStore } from '@reduxjs/toolkit'
import { noteReducer, createNote, toggleImportanceOf } from './reducers/noteReducer'

const store = configureStore({ reducer: noteReducer })

store.dispatch({
  type: '@notes/created',
  payload: {
    content: 'the app state is in redux store',
    important: true,
    id: 1
  }
})

store.dispatch({
  type: '@notes/created',
  payload: {
    content: 'state changes are made with actions',
    important: false,
    id: 2
  }
})

const App = () => {
  const state = store.getState()

  const addNote = e => {
    e.preventDefault()
    const content = e.target.note.value
    store.dispatch(createNote(content))
    e.target.note.value = ''
  }

  const toggleImportance = id => {
    store.dispatch(toggleImportanceOf(id))
  }

  return(
    <div>
      <form onSubmit={addNote}>
        <input type="text" name="note" />
        <button>Add</button>
      </form>
      <ul>
        {state.map(note=>
          <li key={note.id}>
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
            <button onClick={() => toggleImportance(note.id)}>toggle importance</button>
          </li>
        )}
      </ul>
    </div>
  )
}

const renderApp = () => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

renderApp()
store.subscribe(renderApp)
