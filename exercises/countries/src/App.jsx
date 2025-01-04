import { useState, useEffect } from 'react'
import './App.css'
import InfoCountry from './components/InfoCountry'

const API_URL = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const BASE_URL = 'https://studies.cs.helsinki.fi/restcountries/api/name/'

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [showMessage, setShowMessage] = useState(null)
  const [countriesFiltered, setCountriesFiltered] = useState([])
  const [showInfo, setShowInfo] = useState(null)

  useEffect(() => {
    fetch(API_URL) 
      .then(response => response.json())
      .then(data => {
        setCountries(data)
      })
  }, [])

  const findCountry = e => {
    const value = e.target.value
    setFilter(value)
    const result = countries.filter(country => country.name.common.toLowerCase().includes(value.toLowerCase()))
    if(result.length > 10) {
      setShowMessage('Too many matches, specify another filter')
    }else {
      console.log(result);
      
      setShowMessage(null)
      setCountriesFiltered(result)
    }
  }

  const MessageManyMatches = ({showMessage}) => {    
    if(showMessage === null) return
    return <div>{showMessage}</div>
  }

  return (
    <>
      <div>
        Find countries:
        <input value={filter} onChange={findCountry} />
        <MessageManyMatches showMessage={showMessage} />
        <ul>
          {
            countriesFiltered.length === 1 
              ? <InfoCountry country={countriesFiltered[0]} />
              : countriesFiltered.map(country => {
                  return (
                    <li key={country.name.common}>
                      <span>{country.name.common}</span>
                      <button onClick={() => setShowInfo(country)}>Show</button>
                    </li>
                  )
                })
          }
        </ul>
        {
          showInfo ? <InfoCountry country={showInfo} /> : null
        }
      </div>
    </>
  )
}

export default App
