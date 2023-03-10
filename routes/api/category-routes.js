const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll(
    {
      include: [
        Product
      ]
    }
  ).then(categoryData => res.json(categoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne(
    {
      where: {
        id: req.params.id
      },
      include: {
        model: Product,
        attributes: ['category_id']
      }
    }
  ).then(categoryData => res.json(categoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
  })
  .then(categoryData => res.json(categoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  ).then(categoryData => {
    if(!categoryData) {
      res.status(404).json({ message: 'No category found with that ID.' });
      return;
    }
    res.json(categoryData)})
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(categoryData => {
    if (!categoryData) {
      res.status(404).json({ message: 'No Category found with that ID.' })
      return;
    }
    res.json(categoryData);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

module.exports = router;
