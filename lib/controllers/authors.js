const { Router } = require('express');
const Author = require('../models/Author');

module.exports = Router()
  .get('/:id', async (req, res) => {
    const id = req.params.id;
    const authorID = await Author.getById(id);
    res.json(authorID);
  })
  .get('/', async (req, res) => {
    const allAuthors = await Author.getAllAuthorsWithBooks();
    const authorData = allAuthors.map(({ id, name }) => ({ id, name }));
    res.json(authorData);
  })
  .post('/', async (req, res, next) => {
    try{
      const newAuthor = await Author.insert(req.body);
      res.json(newAuthor);
    }
    catch(e){
      next(e);
    }
  })
;
