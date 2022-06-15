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
    const bookData = allBooks.map(({ id, title, released }) => ({ id, title, released }));
    res.json(bookData);
  })
  .post('/', async (req, res, next) => {
    try{
      const newBook = await Book.insert(req.body);
      if (req.body.authorIds){
        await Promise.all(req.body.authorIds.map((id) => newBook.addAuthorById(id))); 
      }
      res.json(newBook);
    }
    catch(e){
      next(e);
    }
  })
;
