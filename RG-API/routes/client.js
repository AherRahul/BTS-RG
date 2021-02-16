const express = require('express');
const router = express.Router();
const clientCtrl = require('../controllers/client');
const { IsSignedIn, authCtrl } = require('../controllers/auth');

// PARAMS
router.param('clientId', clientCtrl.ClientByID);

// ROUTES
// Create
router.post('/client', authCtrl.IsAuthenticated, clientCtrl.CreateClient);

// Read
router.get('/client', authCtrl.IsAuthenticated, clientCtrl.GetAllClient);
router.get('/client/:clientId', authCtrl.IsAuthenticated, clientCtrl.GetClientById);

// Update
router.put('/client/:clientId', authCtrl.IsAuthenticated, clientCtrl.UpdateClientById);

// Delete
router.delete('/client/:clientId', authCtrl.IsAuthenticated, clientCtrl.DeleteClientById);

module.exports = router;
