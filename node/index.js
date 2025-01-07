import express from 'express'
const app = express()
import cors from 'cors'
import { getAll } from './db/notes.js'


app.use(cors())
app.use(express.json())

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', async (request, response) => {
  try {
    const notes = await getAll()
    response.json(notes)
  } catch (error) {
    console.log(error)
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

// app.post('/api/notes', (request, response) => {
//   const body = request.body

//   if (!body.content) {
//     return response.status(400).json({ 
//       error: 'content missing' 
//     })
//   }

//   const note = {
//     content: body.content,
//     important: Boolean(body.important) || false,
//     id: generateId(),
//   }

//   notes = notes.concat(note)

//   response.json(note)
// })

// app.delete('/api/notes/:id', (request, response) => {
//     const id = Number(request.params.id)
//     notes = notes.filter(note => note.id !== id)
  
//     response.status(204).end()
// })

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})