import { MovieModel } from '../models/turso/note.js'

export class NotesController {
    static async getAllNotes(req, res, next) {
        try {
            const notes = await MovieModel.getAllNotes()
            console.log({notes});
            
            res.json(notes)
        } catch (error) {
            next(error)
        }
    }

    static async getNoteById(req, res, next) {
        const id = req.params.id
        try {
            const note = await MovieModel.getNoteById(id)
            note
                ? res.json(note)
                : res.status(404).end()
        } catch (error) {
            next(error)
        }
    }

    static async createNote(req, res, next) {
        const body = req.body

        if (!body.content) res.status(400).json({ error: 'Content missing' })    

        const note = {
            content: body.content,
            important: Boolean(body.important) || false,
        }

        try {
            const newNote = await MovieModel.createNote(note)
            res.json(newNote)
        } catch (error) {
            next(error)
        }
    }

    static async updateNote(req, res, next) {
        const id = req.params.id
        const body = req.body

        try {
            const noteModified = await MovieModel.updateNote({ id, content: body.content, important: body.important })
            res.json(noteModified)      
        } catch (error) {
            next(error)
        }
    }

    static async deleteNote(req, res, next) {
        const id = Number(req.params.id)
        try {
            const result = await MovieModel.deleteNote(id)
            !result ? res.status(404).end() : res.json(result)
        } catch (error) {
            next(error)
        }
    }
}