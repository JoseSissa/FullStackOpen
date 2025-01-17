import { createClient } from "@libsql/client";
import { config } from "../../utils/config.js";

export const turso = createClient({
    authToken: config.DB_TOKEN,
    url: config.DB_URL,
});

export class UserModel {
    static getAllUsers = async () => {
        const result = await turso.execute("SELECT * FROM users");
        return result.rows;
    };
    static createUser = async ({ id, name, passwordHash }) => {
        const result = await turso.batch(
            [
                {
                    sql: "INSERT INTO users (id, name, passwordHash) VALUES (?, ?, ?) RETURNING *",
                    args: [id, name, passwordHash]
                }
            ], 
            "write"
        );
        console.log('HOLA MUNDO ?');
        
        console.log({ result })
        
        return result[0].rows[0];
    };
}