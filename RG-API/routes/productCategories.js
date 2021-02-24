const express = require('express');
const router = express.Router();
const productCategoriesCtrl = require('../controllers/productCategories');
const authHelper = require('../Helpers/AuthHelper');
const { IsSignedIn } = require('../controllers/auth');

// PARAMS
router.param('prodCategoryId', productCategoriesCtrl.ProductCategoriesByID);

// ROUTES
// Create
router.post('/prodCategory', IsSignedIn, authHelper.VerifyToken, productCategoriesCtrl.CreateProductCategories);

// Read
router.get('/prodCategory', IsSignedIn, authHelper.VerifyToken, productCategoriesCtrl.GetAllProductCategories);
router.get('/prodCategory/:prodCategoryId', IsSignedIn, authHelper.VerifyToken, productCategoriesCtrl.GetProductCategoriesById);

// Update
router.put('/prodCategory/:prodCategoryId', IsSignedIn, authHelper.VerifyToken, productCategoriesCtrl.UpdateProductCategoriesById);

// Delete
router.delete('/prodCategory/:prodCategoryId', IsSignedIn, authHelper.VerifyToken, productCategoriesCtrl.DeleteProductCategoriesById);

module.exports = router;
