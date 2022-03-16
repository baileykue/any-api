const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Cat = require('../lib/models/Cat');

describe('any-api routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a cat', async () => {
    const expected = {
      name: 'Xena',
      age: 1,
      favoriteToy: 'Hair tie',
    };
    const res = await request(app).post('/api/v1/cats').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('should be able to gather all cats', async () => {
    const expected = await Cat.getAll();
    const res = await request(app).get('/api/v1/cats');

    expect(res.body).toEqual(expected);
  });

  it('should retrieve the individual cat with mtaching id', async () => {
    const data = {
      name: 'Xena',
      age: 1,
      favoriteToy: 'Hair tie',
    };
    const cat = await Cat.insert(data);
    const res = await request(app).get(`/api/v1/cats/${cat.id}`);

    expect(res.body).toEqual(cat);
  });
});
