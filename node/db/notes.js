import { createClient } from "@libsql/client";
import { config } from "../utils/config.js";

export const turso = createClient({
    authToken: config.DB_TOKEN,
    url: config.DB_URL,
});

export const getAllNotes = async () => {
    const result = await turso.execute("SELECT * FROM notes");
    return result.rows;
};

export const getNoteById = async (id) => {
    const result = await turso.execute("SELECT * FROM notes WHERE id = ?", [id]);
    return result.rows[0];
};

export const createNote = async ({ content, important }) => {
    const result = await turso.batch(
        [
            {
                sql: "INSERT INTO notes (content, important) VALUES (?, ?) RETURNING *",
                args: [content, important]
            }
        ], 
        "write"
    );
    
    return result[0].rows[0];
};

export const updateNote = async ({ id, content, important }) => {
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


export const deleteNote = async (id) => {
    const result = await turso.execute("DELETE FROM notes WHERE id = ? RETURNING *", [id]);  
    return result.rows[0];
};