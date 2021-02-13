const express = require('express');
const router = express.Router();
const productCategoriesCtrl = require('../controllers/productCategories');
const { IsSignedIn, authCtrl } = require('../controllers/auth');

// PARAMS
router.param('prodCategoryId', productCategoriesCtrl.ProductCategoriesByID);

// ROUTES
// Create
router.post('/prodCategory', productCategoriesCtrl.CreateProductCategories);

// Read
router.get('/prodCategory', productCategoriesCtrl.GetAllProductCategories);
router.get('/prodCategory/:prodCategoryId', productCategoriesCtrl.GetProductCategoriesById);

// Update
router.put('/prodCategory/:prodCategoryId', productCategoriesCtrl.UpdateProductCategoriesById);

// Delete
router.delete('/prodCategory/:prodCategoryId', productCategoriesCtrl.DeleteProductCategoriesById);

module.exports = router;
