
const {
    PORT = 3001,
    TURSO_AUTH_TOKEN,
    TURSO_DATABASE_URL,
    SECRET_KEY_JWT
} = process.env

export const config = {
    PORT,
    DB_TOKEN: TURSO_AUTH_TOKEN,
    DB_URL: TURSO_DATABASE_URL,
    SECRET_KEY_JWT
}