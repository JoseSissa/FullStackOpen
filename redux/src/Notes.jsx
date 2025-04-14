import ListNotes from './components/ListNotes.jsx'
import NewNote from './components/NewNote.jsx'
import Filters from './components/Filters.jsx'

export default function Notes() {
  return (
    <div>
        <h2>List of Notes</h2>
        <NewNote />
        <Filters />
        <ListNotes />
    </div>
  )
}