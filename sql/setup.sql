-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS authors;

CREATE TABLE books (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    title VARCHAR NOT NULL,
    publisher VARCHAR NOT NULL,
    released INT NOT NULL
);

CREATE TABLE authors (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    name VARCHAR NOT NULL,
    dob DATE NOT NULL,
    pob VARCHAR NOT NULL,
    FOREIGN KEY (book_id) REFERENCES books(id)
);

INSERT INTO books (
    title, 
    publisher, 
    released
)
VALUES
('Slaughterhouse Five', 'Delacorte', 1969),
('Slaughterhouse Five', 'Delacorte', 1969),
('Slaughterhouse Five', 'Delacorte', 1969),
('Slaughterhouse Five', 'Delacorte', 1969),
('Slaughterhouse Five', 'Delacorte', 1969),
('Slaughterhouse Five', 'Delacorte', 1969),
('Slaughterhouse Five', 'Delacorte', 1969),
('Slaughterhouse Five', 'Delacorte', 1969),
('Slaughterhouse Five', 'Delacorte', 1969)
;

INSERT INTO authors (
    name, 
    dob, 
    pob,
    book_id
)
VALUES
('Kurt Vonnegut', 1922-11-11, 'Indiana', 1),
('Kurt Vonnegut', 1922-11-11, 'Indiana', ),
('Kurt Vonnegut', 1922-11-11, 'Indiana', ),
('Kurt Vonnegut', 1922-11-11, 'Indiana', ),
('Kurt Vonnegut', 1922-11-11, 'Indiana', ),
('Kurt Vonnegut', 1922-11-11, 'Indiana', ),
('Kurt Vonnegut', 1922-11-11, 'Indiana', ),