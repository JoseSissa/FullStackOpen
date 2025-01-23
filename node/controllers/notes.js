import { NoteModel } from '../models/turso/note.js'
import { UserModel } from '../models/turso/user.js'
import { BadRequestError } from '../utils/errors.js'

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
        try {
            const body = req.body
            
            if (!body.content) next(new BadRequestError('Content Missing, cannot create note'));
            if(!body.userId) next(new BadRequestError('UserId Missing, cannot create note'));
            
            const note = {
                content: body.content,
                important: Boolean(body.important) || false,
            }
            
            // // check if userId exists
            const checkUser = await UserModel.getUserById(body.userId)
            if (!checkUser) next(new BadRequestError('UserId does not exist in DB'))
            note.userId = body.userId   
        
            const newNote = await NoteModel.createNote(note)
            if(!newNote) next(new BadRequestError('Cannot create note'))
            res.status(201).json(newNote)

        } catch (error) {
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