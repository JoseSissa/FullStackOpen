import { NotesController } from "../controllers/notes.js";
import { Router } from "express";
const notesRouter = Router();
console.log('log desde el router');

notesRouter.get("/", NotesController.getAllNotes)

notesRouter.get("/:id", NotesController.getNoteById)

notesRouter.post("/", NotesController.createNote)

notesRouter.put("/:id", NotesController.updateNote)

notesRouter.delete("/:id", NotesController.deleteNote)

export default notesRouter