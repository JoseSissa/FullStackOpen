import { NoteModel } from '../models/turso/note.js'
import { UserModel } from '../models/turso/user.js'

export class NotesController {
    static async getAllNotes(req, res, next) {
        try {
            const notes = await NoteModel.getAllNotes()            
            res.json(notes)
        } catch (error) {
            next(error)
        }
    }

    static async getNoteById(req, res, next) {
        const id = req.params.id
        try {
            const note = await NoteModel.getNoteById(id)
            note
                ? res.json(note)
                : res.status(404).end()
        } catch (error) {
            next(error)
        }
    }

    static async createNote(req, res, next) {
        const body = req.body

        if (!body.content) res.status(400).json({ error: 'Content Missing' })
        if(!body.userId) res.status(400).json({ error: 'UserId Missing, cannot create note' })
        
        const note = {
            content: body.content,
            important: Boolean(body.important) || false,
        }
        // check if userId exists
        try {
            const checkUser = await UserModel.getUserById(body.userId)
            if (!checkUser) res.status(400).json({ error: 'UserId does not exist in DB' })
            note.userId = body.userId
        } catch (error) {
            error.message= "Error verifying userId - REQUEST POST"
            next(error)
        }        

        try {
            const newNote = await NoteModel.createNote(note)
            res.status(201).json(newNote)
        } catch (error) {
            error.message= "Error creating note - REQUEST POST"            
            next(error)
        }
    }

    static async updateNote(req, res, next) {
        const id = req.params.id
        const body = req.body

        try {
            const noteModified = await NoteModel.updateNote({ id, content: body.content, important: body.important })
            res.json(noteModified)      
        } catch (error) {
            next(error)
        }
    }

    static async deleteNote(req, res, next) {
        const id = Number(req.params.id)
        try {
            const result = await NoteModel.deleteNote(id)
            !result ? res.status(404).end() : res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
}