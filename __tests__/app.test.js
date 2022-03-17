const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Cat = require('../lib/models/Cat');
const { createTestScheduler } = require('jest');

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
    const data = {
      name: 'Xena',
      age: 1,
      favoriteToy: 'Hair tie',
    };
    const cat = await Cat.insert(data);

    const [expected] = await Cat.getAll();
    //const res = await request(app).get('/api/v1/cats');

    expect(expected).toEqual(cat);
  });

  it('should retrieve the individual cat with matching id', async () => {
    const data = {
      name: 'Xena',
      age: 1,
      favoriteToy: 'Hair tie',
    };
    const cat = await Cat.insert(data);
    const res = await request(app).get(`/api/v1/cats/${cat.id}`);

    expect(res.body).toEqual(cat);
  });

  it('should be able to update a cat', async () => {
    const data = {
      name: 'Xena',
      age: 1,
      favoriteToy: 'Hair tie',
    };
    const cat = await Cat.insert(data);

    const update = { age: 2, favoriteToy: 'mini soccer ball' };
    const res = await request(app).patch(`/api/v1/cats/${cat.id}`).send(update);

    const expected = {
      id: expect.any(String),
      name: 'Xena',
      age: 2,
      favoriteToy: 'mini soccer ball',
    };

    expect(res.body).toEqual(expected);
    expect(await Cat.getById(cat.id)).toEqual(expected);
  });

  it('should be able to delete individual cat', async () => {
    const data = {
      name: 'Xena',
      age: 1,
      favoriteToy: 'Hair tie',
    };
    const cat = await Cat.insert(data);

    const res = await request(app).delete(`/api/v1/cats/${cat.id}`);

    expect(res.body).toEqual(cat);
    const cats = await Cat.getAll();
    expect(cats).not.toContain(cat);
  });
});
