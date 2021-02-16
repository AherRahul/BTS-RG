const express = require('express');
const router = express.Router();
const productCategoriesCtrl = require('../controllers/productCategories');
const { IsSignedIn, authCtrl } = require('../controllers/auth');

// PARAMS
router.param('prodCategoryId', authCtrl.IsAuthenticated, productCategoriesCtrl.ProductCategoriesByID);

// ROUTES
// Create
router.post('/prodCategory', authCtrl.IsAuthenticated, productCategoriesCtrl.CreateProductCategories);

// Read
router.get('/prodCategory', authCtrl.IsAuthenticated, productCategoriesCtrl.GetAllProductCategories);
router.get('/prodCategory/:prodCategoryId', authCtrl.IsAuthenticated, productCategoriesCtrl.GetProductCategoriesById);

// Update
router.put('/prodCategory/:prodCategoryId', authCtrl.IsAuthenticated, productCategoriesCtrl.UpdateProductCategoriesById);

// Delete
router.delete('/prodCategory/:prodCategoryId', authCtrl.IsAuthenticated, productCategoriesCtrl.DeleteProductCategoriesById);

module.exports = router;
