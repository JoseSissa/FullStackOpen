import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [showPersons, setShowPersons] = useState(persons)

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  const addName = e => {
    e.preventDefault()
    const result = persons.find(person => person.name === newName)
    if (result) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons([...persons, { name: newName, number: newNumber }])
    setNewName('')
    setNewNumber('')
  }

  const updateRecords = e => {
    const value = e.target.value
    setFilterName(value)
    const a = persons.filter(person => {
      return person.name.toLowerCase().includes(value.toLowerCase())
    })
    setShowPersons(a)
    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with
        <input value={filterName} onChange={updateRecords} />
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
            {person.name} -
             {person.number}
          </div>
        ))
      }
    </div>
  )
}

export default App