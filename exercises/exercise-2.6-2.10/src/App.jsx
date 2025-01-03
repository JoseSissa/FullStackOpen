import { useState, useEffect } from 'react'
import  services from './services/person'

const App = () => {
  const [persons, setPersons] = useState([])

  const [showPersons, setShowPersons] = useState(persons)

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    services.getAll()
      .then(data => {
        setPersons(data)
        setShowPersons(data)
      })
  }, [])

  const addName = e => {
    e.preventDefault()
    const result = persons.find(person => person.name === newName)
    if (result) {
      if(window.confirm(`${result.name} is already added to phonebook, do you want replace old number with new one ?`)) {
        services.updateRecord(result.id, {...result, number: newNumber})
          .then(response => {
            const newRecords = persons.map(person => person.id !== response.id ? person : response)
            setPersons(newRecords)
            setShowPersons(newRecords)
            setNewName('')
            setNewNumber('')
          })
      }
      return
    }


    const newPerson = { name: newName, number: newNumber }
    services.create(newPerson)
      .then(response => {
        setPersons(persons.concat(response))
        setShowPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
      })
  }

  const filterRecords = e => {
    const value = e.target.value
    setFilterName(value)
    const a = persons.filter(person => {
      return person.name.toLowerCase().includes(value.toLowerCase())
    })
    setShowPersons(a)
  }

  const deleteRecord = (name, id) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      services.deteleRecord(id)
        .then(response => {
          console.log(response);
          
          setPersons(persons.filter(person => person.id !== id))
          setShowPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with
        <input value={filterName} onChange={filterRecords} />
      </div>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={e => setNewName(e.target.value)} />
          number: <input value={newNumber} onChange={e => setNewNumber(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        showPersons.map(person => (
          <div key={person.name}>
            {person.name} - {person.number}
            <button onClick={() => deleteRecord(person.name, person.id)}>delete</button>
          </div>
        ))
      }
    </div>
  )
}

export default App