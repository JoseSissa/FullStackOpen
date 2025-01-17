import express from 'express'
const app = express()
import cors from 'cors'
import notesRouter from './routes/notes.js'
import usersRouter from './routes/users.js'
import { middleware } from './utils/middleware.js'

app.use(cors())
app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/notes', notesRouter)
app.use(middleware.errorHandler)

export default app