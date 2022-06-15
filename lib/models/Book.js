const pool = require('../utils/pool');

module.exports = class Book {
  id;
  title;
  publisher;
  released;
  authors;
  constructor(row){
    this.id = row.id;
    this.title = row.title;
    this.publisher = row.publisher;
    this.released = row.released;
    this.authors = row.authors ?? [];
  }

  static async insert({ title, publisher, released }){
    const { rows } = await pool.query('INSERT INTO books (title, publisher, released) VALUES ($1, $2, $3) RETURNING *',
      [title, publisher, released]);
    return new Book(rows[0]);
  } 

  static async getAllBooksWithAuthors() {
    const { rows } = await pool.query('SELECT * FROM books'
    //   `SELECT books.*,
    // COALESCE(
    //     json_agg(to_jsonb(authors))
    //     FILTER (WHERE authors.id IS NOT NULL), '[]'
    // ) AS authors FROM books
    // LEFT JOIN books_authors ON books.id = books_authors.book_id
    // LEFT JOIN authors ON authors.id = books_authors.author_id 
    // GROUP BY books.id`
    );
    return rows.map((row) => new Book(row));
  }

  static async getById(id){
    const { rows } = await pool.query(
      `SELECT books.*,
          COALESCE(
              json_agg(to_jsonb(authors))
              FILTER (WHERE authors.id IS NOT NULL), '[]'
          ) AS authors FROM books
          LEFT JOIN books_authors ON books.id = books_authors.book_id
          LEFT JOIN authors ON authors.id = books_authors.author_id 
          WHERE books.id = $1
          GROUP BY books.id`, 
      [id]
    );
    return new Book(rows[0]);
  }

  async addAuthorById(authorId) {
    await pool.query('INSERT INTO books_authors (author_id, book_id) VALUES ($1, $2) RETURNING *', 
      [authorId, this.id]);
    return this;
  }
};
