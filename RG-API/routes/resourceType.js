const express = require('express');
const router = express.Router();
const resourceTypeCtrl = require('../controllers/resourceType');
const { IsSignedIn, authCtrl } = require('../controllers/auth');

// PARAMS
router.param('resourceId', resourceTypeCtrl.ResourceByID);

// ROUTES
// Create
router.post('/resourceType', resourceTypeCtrl.CreateResource);

// Read
router.get('/resourceType', resourceTypeCtrl.GetAllResources);
router.get('/resourceType/:resourceId', resourceTypeCtrl.GetResourceById);

// Update
router.put('/resourceType/:resourceId', resourceTypeCtrl.UpdateResourceById);

// Delete
router.delete('/resourceType/:resourceId', resourceTypeCtrl.DeleteResourceById);

module.exports = router;
