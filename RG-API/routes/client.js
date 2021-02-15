const express = require('express');
const router = express.Router();
const clientCtrl = require('../controllers/client');
const { IsSignedIn, authCtrl } = require('../controllers/auth');

// PARAMS
router.param('clientId', clientCtrl.ClientByID);

// ROUTES
// Create
router.post('/client', clientCtrl.CreateClient);

// Read
router.get('/client', clientCtrl.GetAllClient);
router.get('/client/:clientId', clientCtrl.GetClientById);

// Update
router.put('/client/:clientId', clientCtrl.UpdateClientById);

// Delete
router.delete('/client/:clientId', clientCtrl.DeleteClientById);

module.exports = router;
