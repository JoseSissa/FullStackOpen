import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const API_URL = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const BASE_URL = 'https://studies.cs.helsinki.fi/restcountries/api/name/'

function App() {
  const [filter, setFilter] = useState('')

  useEffect(() => {
    fetch(API_URL) 
      .then(response => response.json())
      .then(data => {
        console.log(data)
      })
  }, [])

  return (
    <>
      <div>
        Find countries:
        <input value={filter} onChange={e => setFilter(e.target.value)} />
      </div>

      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
    </>
  )
}

export default App
