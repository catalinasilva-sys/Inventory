const {
   get,
   add,
   update,
   delete: deleteProduct,
   seed,
} = require('#controllers/products.controller');
const router = require('express').Router();

router.get('/', get);
router.post('/', add);
router.post('/seed', seed);
router.put('/:id', update);
router.delete('/:id', deleteProduct);

module.exports = router;
