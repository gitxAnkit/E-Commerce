const express = require('express');
const { handleGetAllProducts,
    handleCreateProduct,
    handleUpdateProduct,
    handleDeleteProduct,
    handleGetProductById } = require('../controllers/productController');
const { isAuthenticatedUser } = require('../middlewares/auth');

const router = express.Router();

router.route('/products')
    .get(isAuthenticatedUser, handleGetAllProducts);

router.route('/product/new')
    .post(handleCreateProduct);

router.route('/product/:id')
    .get(handleGetProductById)
    .put(handleUpdateProduct)
    .delete(handleDeleteProduct);


module.exports = router;