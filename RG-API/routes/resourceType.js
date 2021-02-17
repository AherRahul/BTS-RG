const express = require('express');
const router = express.Router();
const resourceTypeCtrl = require('../controllers/resourceType');
const authHelper = require('../Helpers/AuthHelper');
const { IsSignedIn } = require('../controllers/auth');

// PARAMS
router.param('resourceId', IsSignedIn, authHelper.VerifyToken, resourceTypeCtrl.ResourceByID);

// ROUTES
// Create
router.post('/resourceType', IsSignedIn, authHelper.VerifyToken, resourceTypeCtrl.CreateResource);

// Read
router.get('/resourceType', IsSignedIn, authHelper.VerifyToken, resourceTypeCtrl.GetAllResources);
router.get('/resourceType/:resourceId', IsSignedIn, authHelper.VerifyToken, resourceTypeCtrl.GetResourceById);

// Update
router.put('/resourceType/:resourceId', IsSignedIn, authHelper.VerifyToken, resourceTypeCtrl.UpdateResourceById);

// Delete
router.delete('/resourceType/:resourceId', IsSignedIn, authHelper.VerifyToken, resourceTypeCtrl.DeleteResourceById);

module.exports = router;
