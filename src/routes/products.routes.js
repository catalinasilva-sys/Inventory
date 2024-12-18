const {
  get,
  add,
  update,
  delete: deleteProduct,
  seed,
} = require('#controllers/products.controller');
const authMiddleware = require('#middlewares/auth.middleware');
const router = require('express').Router();

router.get('/', authMiddleware, get);
router.post('/', authMiddleware, add);
router.post('/seed', authMiddleware, seed);
router.put('/:id', authMiddleware, update);
router.delete('/:id', authMiddleware, deleteProduct);

module.exports = router;
