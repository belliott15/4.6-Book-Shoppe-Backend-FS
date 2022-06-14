const pool = require('../utils/pool');

module.exports = class Author {
  id;
  name; 
  dob; 
  pob;
  books;
  constructor(row){
    this.id = row.id;
    this.name = row.name;
    this.dob = row.dob;
    this.pob = row.pob;
    this.books = row.books ?? [];
  }

  static async insert({ name, dob, pob }){
    const { rows } = await pool.query('INSERT INTO authors (name, dob, pob) VALUES ($1, $2, $3) RETURNING *',
      [name, dob, pob]);
    return new Author(rows[0]);
  } 

  static async getAllAuthors() {
    const { rows } = await pool.query('SELECT * FROM authors');
    return rows.map((row) => new Author(row));
  }

  static async getById(id){
    const { rows } = await pool.query(
      `SELECT authors.*,
          COALESCE(
              json_agg(to_jsonb(books))
              FILTER (WHERE books.id IS NOT NULL), '[]'
          ) AS books FROM authors
          LEFT JOIN authors_books ON authors.id = authors_books.author_id
          LEFT JOIN books ON books.id = authors_books.book_id 
          `
    );
  }

};
