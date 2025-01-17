DROP TABLE IF EXISTS "Notes";
DROP TABLE IF EXISTS "Users";

CREATE TABLE Notes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  content TEXT NOT NULL,
  important BOOLEAN NOT NULL DEFAULT false,
  userId INTEGER NOT NULL
);

CREATE TABLE Users (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  passwordHash TEXT NOT NULL
);

INSERT INTO Notes (content, important, userId) VALUES ('HTML is easy', false, 1);
INSERT INTO Notes (content, important, userId) VALUES ('Browser can execute only JavaScript', false, 1);
INSERT INTO Notes (content, important, userId) VALUES ('GET and POST are the most important methods of HTTP protocol', true, 1);

INSERT INTO Users (id, name, passwordHash) VALUES (1, 'John Doe', 'hash1');
INSERT INTO Users (id, name, passwordHash) VALUES (2, 'Jose Sissa', 'hash2');