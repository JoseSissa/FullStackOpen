import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Footer } from './components/Footer.jsx'
import { CreateNew } from './components/CreateNew.jsx'
import { Menu } from './components/Menu.jsx'
import { AnecdoteDetail } from './components/AnecdoteDetail.jsx'
import { AnecdoteList } from './components/AnecdoteList.jsx'
import { About } from './components/About.jsx'


const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <BrowserRouter>
      <Menu />
      <h1>Software anecdotes</h1>
      <Routes>
          <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
          <Route path="/create" element={<CreateNew addNew={addNew} />} />
          <Route path="/about" element={<About />} />
          <Route path="/anecdotes/:anecId" element={<AnecdoteDetail anecdotes={anecdotes} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
