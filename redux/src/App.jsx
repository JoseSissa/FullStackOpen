import ListNotes from './components/ListNotes.jsx'
import NewNote from './components/NewNote.jsx'

const App = () => {
  return(
    <div>
      <h2>List of Notes</h2>
      <NewNote />
      <ListNotes />
    </div>
  )
}

export default App