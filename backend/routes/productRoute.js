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

router.route('/product/new')
    .post(isAuthenticatedUser, authorizedRoles("admin"), handleCreateProduct);

router.route('/product/:id')
    .get(isAuthenticatedUser, authorizedRoles("admin"), handleGetProductById)
    .put(isAuthenticatedUser, authorizedRoles("admin"), handleUpdateProduct)
    .delete(isAuthenticatedUser, authorizedRoles("admin"), handleDeleteProduct);


module.exports = router; 