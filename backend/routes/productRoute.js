const express = require('express');
const { handleGetAllProducts,
    handleCreateProduct,
    handleUpdateProduct,
    handleDeleteProduct,
    handleGetProductById } = require('../controllers/productController');

const router = express.Router();

router.route('/products')
    .get(handleGetAllProducts);

router.route('/product/new')
    .post(handleCreateProduct);

router.route('/product/:id')
    .get(handleGetProductById)
    .put(handleUpdateProduct)
    .delete(handleDeleteProduct);


module.exports = router;