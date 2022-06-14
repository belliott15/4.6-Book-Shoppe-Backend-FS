const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('GET book route returns all books in the data set', async () => {
    const res = await request(app).get('/books');
    const bookTitle = res.body.find((book) => book.id === '1');
    expect(bookTitle).toHaveProperty('author', 'Kurt Vonnegut');
  });

  it('GET book route returns all books in the data set', async () => {
    const res = await request(app).get('/books/1');
    const expected = {
      
    };
    expect(res.body).toEqual(expected);
  });

  afterAll(() => {
    pool.end();
  });
});
