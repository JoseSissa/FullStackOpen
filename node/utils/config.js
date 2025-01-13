
const {
    PORT = 3001,
    TURSO_AUTH_TOKEN,
    TURSO_DATABASE_URL
} = process.env

export const config = {
    PORT,
    DB_TOKEN: TURSO_AUTH_TOKEN,
    DB_URL: TURSO_DATABASE_URL
}