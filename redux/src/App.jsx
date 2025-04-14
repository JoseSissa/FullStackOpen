import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { initNotes } from './reducers/noteReducer'
import HeaderComponent from './components/HeaderComponent.jsx'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initNotes())
  }, [dispatch])

  return(
    <>
      <HeaderComponent />
    </>
  )
}

export default App