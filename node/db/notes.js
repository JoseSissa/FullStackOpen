import { createClient } from "@libsql/client";

export const turso = createClient({
authToken: process.env.TURSO_AUTH_TOKEN,
  url: process.env.TURSO_DATABASE_URL,
});

export const getAll = async () => {
  const result = await turso.execute("SELECT * FROM notes");
  return result.rows;
};

