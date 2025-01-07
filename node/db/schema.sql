DROP TABLE IF EXISTS "Notes";

CREATE TABLE Notes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  content TEXT NOT NULL,
  important BOOLEAN NOT NULL DEFAULT false
);

INSERT INTO Notes (content, important) VALUES ('HTML is easy', false);
INSERT INTO Notes (content, important) VALUES ('Browser can execute only JavaScript', false);
INSERT INTO Notes (content, important) VALUES ('GET and POST are the most important methods of HTTP protocol', true);