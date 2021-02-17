const express = require('express');
const router = express.Router();
const clientCtrl = require('../controllers/client');
const { IsSignedIn } = require('../controllers/auth');
const authHelper = require('../Helpers/AuthHelper');

// PARAMS
router.param('clientId', clientCtrl.ClientByID);

// ROUTES
// Create
router.post('/client', IsSignedIn, authHelper.VerifyToken, clientCtrl.CreateClient);

// Read
router.get('/client', IsSignedIn, authHelper.VerifyToken, clientCtrl.GetAllClient);
router.get('/client/:clientId', IsSignedIn, authHelper.VerifyToken, clientCtrl.GetClientById);

// Update
router.put('/client/:clientId', IsSignedIn, authHelper.VerifyToken, clientCtrl.UpdateClientById);

// Delete
router.delete('/client/:clientId', IsSignedIn, authHelper.VerifyToken, clientCtrl.DeleteClientById);

module.exports = router;
