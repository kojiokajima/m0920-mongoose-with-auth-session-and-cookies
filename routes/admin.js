const express = require('express');
const adminController = require('../controllers/admin')

const router = express.Router();

// @route   GET /admin/add-product
// @desc    Add products form 
// @access  Private
router.get('/add-product', adminController.getAddProduct);

// @route   POST /admin/add-product
// @desc    Add a product in products collection
// @access  Private
router.post('/add-product', adminController.postAddProduct);

// @route   GET /admin/edit-product
// @desc    Edit product form
// @access  Private
router.get('/edit-product/:productId', adminController.getEditProduct)

// @route   POST /admin/edit-product
// @desc    Edit a certain product
// @access  Private
router.post('/edit-product', adminController.postEditProduct)

// @route   POST /admin/delete-product
// @desc    Delete a certain product
// @access  Private
router.post('/delete-product', adminController.deleteProduct)

// @route   GET /admin/products
// @desc    Get all products
// @access  Private
router.get('/products', adminController.getProducts);

module.exports = router;