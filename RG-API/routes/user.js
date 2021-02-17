const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const authHelper = require('../Helpers/AuthHelper');
const { IsSignedIn } = require('../controllers/auth');

// PARAMS
router.param('userId', userCtrl.UserById);
router.param('adminId', userCtrl.AdminById);
router.param('emailId', userCtrl.UserByEmailId);
router.param('token', userCtrl.UserByToken);

// ROUTES

// Create
router.post('/resetpassword', userCtrl.ResetPassword);

// Read
router.get('/users/:adminId', IsSignedIn, authHelper.VerifyToken, userCtrl.getAllUsers);
router.get('/user/:userId', IsSignedIn, authHelper.VerifyToken, userCtrl.getUserById);
router.get('/user/:emailId', IsSignedIn, authHelper.VerifyToken, userCtrl.getUserByEmailId);

// Update
router.put('/change-password/:userId', IsSignedIn, authHelper.VerifyToken, userCtrl.ChangePassword);
router.put('/user/:userId/:adminId', IsSignedIn, authHelper.VerifyToken, userCtrl.UpdateUser);
router.put('/reset/:token', userCtrl.Reset);

// Delete
router.delete('/user/:userId/:adminId', IsSignedIn, userCtrl.deleteUser);



module.exports = router;