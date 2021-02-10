const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const { IsSignedIn, authCtrl } = require('../controllers/auth');

// PARAMS
router.param('userId', userCtrl.UserById);
router.param('adminId', userCtrl.AdminById);
router.param('emailId', userCtrl.UserByEmailId);
router.param('token', userCtrl.UserByToken);

// ROUTES

// Create
router.post('/resetpassword', userCtrl.ResetPassword);

// Read
router.get('/users/:adminId', IsSignedIn, authCtrl.IsAuthenticated, authCtrl.IsAdmin, userCtrl.getAllUsers);
router.get('/user/:userId', IsSignedIn, authCtrl.IsAuthenticated, userCtrl.getUserById);
router.get('/user/:emailId', IsSignedIn, authCtrl.IsAuthenticated, userCtrl.getUserByEmailId);

// Update
router.put('/change-password/:userId', IsSignedIn, authCtrl.IsAuthenticated, userCtrl.ChangePassword);
router.put('/user/:userId/:adminId', IsSignedIn, authCtrl.IsAuthenticated, authCtrl.IsAdmin, userCtrl.UpdateUser);
router.put('/reset/:token', userCtrl.Reset);

// Delete
router.delete('/user/:userId/:adminId', IsSignedIn, authCtrl.IsSuperAdmin, userCtrl.deleteUser);



module.exports = router;