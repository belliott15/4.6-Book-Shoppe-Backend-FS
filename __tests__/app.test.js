const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Book = require('../lib/models/Book');
const Author = require('../lib/models/Author');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('GET book route returns all books in the data set', async () => {
    const res = await request(app).get('/books');
    const book = res.body.find((book) => book.id === '1');
    expect(book).toHaveProperty('title', 'Slaughterhouse Five');
  });

  it('GET single book with author data', async () => {
    const res = await request(app).get('/books/1');
    const expected = {
      'id': '1',
      'title': 'Slaughterhouse Five',
      'publisher': 'Delacorte',
      'released': 1969,
      'authors': [
        {
          'id': 1,
          'dob': 'November 11, 1922',
          'pob': 'Indiana, US',
          'name': 'Kurt Vonnegut'
        }
      ]
    };
    expect(res.body).toEqual(expected);
  });

  it('GET author route returns all authors with their respective books', async () => {
    const res = await request(app).get('/authors');
    const author = res.body.find((author) => author.id === '2');
    expect(author).toHaveProperty('name', 'Neil Gaiman');
  });

  it('should add a new book and link with authors', async () => {
    const res = await request(app)
      .post('/books')
      .send({ 
        title: 'How to become a God', 
        publisher: 'Penguin Randomhouse', 
        released: 2022, 
        authorIds: [3, 5] });
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('How to become a God');
    const { body: title } = await request(app).get(`/books/${res.body.id}`);
    expect(title.authors.length).toBe(2);
  });

  it('GET single author with all the books they authored', async () => {
    const res = await request(app).get('/authors/2');
    const expected = {
      'id': '2',
      'name': 'Neil Gaiman',
      'dob': 'November 10, 1960',
      'pob': 'Porchester, UK',
      'books': [
        {
          'id': 2,
          'title': 'American Gods',
          'released': 2001,
          'publisher': 'William Morrow'
        },
        {
          'id': 3,
          'title': 'Good Omens',
          'released': 1990,
          'publisher': 'Gollancz'
        }
      ],
    };
    expect(res.body).toEqual(expected);
  });

  it('should add a new author', async () => {
    const newAuthor = new Author({
      'name': 'Tyler Bills', 
      'dob': 'December 17, 1989', 
      'pob': 'New Jersey, US'
    });
    const res = await request(app).post('/books').send(newAuthor);
    expect(res.body.title).toEqual(newAuthor.title);
    expect(res.body.publisher).toEqual(newAuthor.publisher);
    expect(res.body.released).toEqual(newAuthor.released);
  });

  afterAll(() => {
    pool.end();
  });
});
