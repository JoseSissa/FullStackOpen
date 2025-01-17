import { createClient } from "@libsql/client";
import { config } from "../../utils/config.js";

export const turso = createClient({
    authToken: config.DB_TOKEN,
    url: config.DB_URL,
});

export class NoteModel {
    static getAllNotes = async () => {
        const result = await turso.execute("SELECT * FROM notes");
        return result.rows;
    };

    static getNoteById = async (id) => {
        const result = await turso.execute("SELECT * FROM notes WHERE id = ?", [id]);
        return result.rows[0];
    };

    static createNote = async ({ content, important, userId }) => {
        const result = await turso.batch(
            [
                {
                    sql: "INSERT INTO notes (content, important, userId) VALUES (?, ?, ?) RETURNING *",
                    args: [content, important, userId]
                }
            ], 
            "write"
        );
        
        return result[0].rows[0];
    };

    static updateNote = async ({ id, content, important }) => {
        const result = await turso.batch(
            [
                {
                    sql: "UPDATE notes SET content = ?, important = ? WHERE id = ? RETURNING *",
                    args: [content, important, id]
                }
            ], 
            "write"
        );
      
        return result[0].rows[0];
    }; 

    static deleteNote = async (id) => {
        const result = await turso.execute("DELETE FROM notes WHERE id = ? RETURNING *", [id]);  
        return result.rows[0];
    };
}

