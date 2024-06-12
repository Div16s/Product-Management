const express = require('express');
const router = express.Router();
const {getProducts, getFeaturedProducts, addProduct, deleteProduct, getProduct, updateProduct, getProductsWithSpecificRating, getProductsWithSpecificPrice} = require('../controllers/productController');
const authenticateToken  = require('../middlewares/authenticateToken');
const errorHandler = require('../middlewares/errorMiddleware');

router.use(authenticateToken);
router.use(errorHandler);

router.get('/all/:email', getProducts);
router.get('/featured/:email', getFeaturedProducts);
router.get('/:id', getProduct);
router.post('/add', addProduct);
router.put('/update/:id', updateProduct);
router.delete('/delete/:id', deleteProduct);
router.get('/specificRating/:email/:rating', getProductsWithSpecificRating);
router.get('/specificPrice/:email/:price', getProductsWithSpecificPrice);

module.exports = router;