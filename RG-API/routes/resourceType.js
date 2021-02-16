const express = require('express');
const router = express.Router();
const resourceTypeCtrl = require('../controllers/resourceType');
const { IsSignedIn, authCtrl } = require('../controllers/auth');

// PARAMS
router.param('resourceId', authCtrl.IsAuthenticated, resourceTypeCtrl.ResourceByID);

// ROUTES
// Create
router.post('/resourceType', authCtrl.IsAuthenticated, resourceTypeCtrl.CreateResource);

// Read
router.get('/resourceType', authCtrl.IsAuthenticated, resourceTypeCtrl.GetAllResources);
router.get('/resourceType/:resourceId', authCtrl.IsAuthenticated, resourceTypeCtrl.GetResourceById);

// Update
router.put('/resourceType/:resourceId', authCtrl.IsAuthenticated, resourceTypeCtrl.UpdateResourceById);

// Delete
router.delete('/resourceType/:resourceId', authCtrl.IsAuthenticated, resourceTypeCtrl.DeleteResourceById);

module.exports = router;
