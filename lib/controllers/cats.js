const { Router } = require('express');
const Cat = require('../models/Cat');

module.exports = Router()
  .post('/', async (req, res) => {
    try {
      const cat = await Cat.insert(req.body);
      return res.json(cat);
    } catch (error) {
      console.error(error.message);
      return null;
    }
  })

  .get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const cat = await Cat.getById(id);
      return res.json(cat);
    } catch (error) {
      console.error(error.message);
      return null;
    }
  })

  .get('/', async (req, res) => {
    try {
      const cats = await Cat.getAll();
      return res.json(cats);
    } catch (error) {
      console.error(error.message);
      return null;
    }
  })

  .patch('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updatedCat = await Cat.updateById(id, req.body);
      return res.json(updatedCat);
    } catch (error) {
      console.error(error.message);
      return null;
    }
  })

  .delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const deleteCat = await Cat.deleteById(id);
      return res.json(deleteCat);
    } catch (error) {
      console.error(error.message);
      return null;
    }
  });
