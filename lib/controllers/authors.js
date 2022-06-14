const { Router } = require('express');
const { Author } = require('../models/Author');

module.exports = Router()
  .get('/', async (req, res) => {
    const allAuthors = await Author.getAllAuthorsWithBooks();
    res.json(allAuthors);
  });
