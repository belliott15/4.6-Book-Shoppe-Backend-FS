const { Router } = require('express');
const Book = require('../models/Book');

module.exports = Router()
  .get('/:id', async (req, res) => {
    const id = req.params.id;
    const BookID = await Book.getById(id);
    res.json(BookID);
  })
  .get('/', async (req, res) => {
    const allBooks = await Book.getAllBooksWithAuthors();
    res.json(allBooks);
  })
  
;