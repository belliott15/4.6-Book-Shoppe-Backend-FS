const { Router } = require('express');
const Book = require('../models/Book');

module.exports = Router()
  .get('/:id', async (req, res) => {
    const id = req.params.id;
    const bookID = await Book.getById(id);
    res.json(bookID);
  })
  .get('/', async (req, res) => {
    const allBooks = await Book.getAllBooksWithAuthors();
    res.json(allBooks);
  })
  .post('/', async (req, res, next) => {
    try{
      const newBook = await Book.insert(req.body);
      res.json(newBook);
    }
    catch(e){
      next(e);
    }
  })
;
