const express = require('express');
const { handleGetAllProducts,
    handleCreateProduct,
    handleUpdateProduct,
    handleDeleteProduct,
    handleGetProductById } = require('../controllers/productController');
const { isAuthenticatedUser, authorizedRoles } = require('../middlewares/auth');

const router = express.Router();

router.route('/products')
    .get(handleGetAllProducts);

router.route('/admin/product/new')
    .post(isAuthenticatedUser, authorizedRoles("admin"), handleCreateProduct);

router.route('/admin/product/:id')
    .put(isAuthenticatedUser, authorizedRoles("admin"), handleUpdateProduct)
    .delete(isAuthenticatedUser, authorizedRoles("admin"), handleDeleteProduct);

router.route('/product/:id')
    .get(isAuthenticatedUser, authorizedRoles("admin"), handleGetProductById);

module.exports = router; 