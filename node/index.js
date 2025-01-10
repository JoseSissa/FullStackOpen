import express from 'express'
const app = express()
import cors from 'cors'
import { getAllNotes, getNoteById, createNote, updateNote, deleteNote } from './db/notes.js'


app.use(cors())
app.use(express.json())

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    next(error)
}


app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', async (request, response, next) => {
    try {
        const notes = await getAllNotes()
        response.json(notes)
    } catch (error) {
        next(error)
    }
})

app.get('/api/notes/:id', async (request, response, next) => {
    const id = request.params.id
    try {
        const note = await getNoteById(id)
        note
            ? response.json(note)
            : response.status(404).end()
    } catch (error) {
        next(error)
    }
})

app.post('/api/notes', async (request, response, next) => {
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
        next(error)
    }
})

app.put('/api/notes/:id', async (request, response, next) => {
    const id = request.params.id
    const body = request.body

    try {
        const noteModified = await updateNote({ id, content: body.content, important: body.important })
        response.json(noteModified)      
    } catch (error) {
        next(error)
    }
})

app.delete('/api/notes/:id', async (request, response, next) => {
    const id = Number(request.params.id)
    try {
        const res = await deleteNote(id)
        !res ? response.status(404).end() : response.json(res)
    } catch (error) {
        next(error)
    }
})

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
})