import ListNotes from './components/ListNotes.jsx'
import NewNote from './components/NewNote.jsx'
import Filters from './components/Filters.jsx'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { initNotes } from './reducers/noteReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initNotes())
  }, [dispatch])

  return(
    <div>
      <h2>List of Notes</h2>
      <NewNote />
      <Filters />
      <ListNotes />
    </div>
  )
}

export default App