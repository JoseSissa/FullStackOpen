import express from 'express'
const app = express()
import cors from 'cors'
import { getAllNotes, createNote } from './db/notes.js'


app.use(cors())
app.use(express.json())

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', async (request, response) => {
  try {
    const notes = await getAllNotes()
    response.json(notes)
  } catch (error) {
    console.log('Error to get all Notes');
  }
})

// app.get('/api/notes/:id', (request, response) => {
//     const id = request.params.id
//     const note = notes.find(note => note.id === id)
//     if (note) {
//         response.json(note)
//     } else {
//         response.status(404).end()
//     }
// })

// app.put('/api/notes/:id', (request, response) => {
//     const id = request.params.id
//     const body = request.body

//     const note = notes.find(note => note.id === id)
//     if (note) {
//         const newNote = { ...note, ...body }
//         notes = notes.map(note => note.id === id ? newNote : note)
//         response.json(newNote)
//     } else {
//         response.status(404).end()
//     }
// })

// const generateId = () => {
//   const maxId = notes.length > 0
//     ? Math.max(...notes.map(n => n.id))
//     : 0
//   return maxId + 1
// }

app.post('/api/notes', async (request, response) => {
  const body = request.body

  if (!body.content) response.status(400).json({ error: 'Content missing' })    

  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
  }

  try {
    const newNote = await createNote(note)
    response.json(newNote)
  } catch (error) {
    console.error(error)
    return new Response('Error to create a new Note', { status: 500 })
  }

  // response.json(note)
})

// app.delete('/api/notes/:id', (request, response) => {
//     const id = Number(request.params.id)
//     notes = notes.filter(note => note.id !== id)
  
//     response.status(204).end()
// })

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})