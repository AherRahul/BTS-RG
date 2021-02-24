const express = require('express');
const router = express.Router();
const departmentCtrl = require('../controllers/department');
const authHelper = require('../Helpers/AuthHelper');
const { IsSignedIn } = require('../controllers/auth');

// PARAMS
router.param('departmentId', departmentCtrl.DepartmentByID);

// ROUTES
// Create
router.post('/department', IsSignedIn, authHelper.VerifyToken, departmentCtrl.CreateDepartment);

// Read
router.get('/department', IsSignedIn, authHelper.VerifyToken, departmentCtrl.GetAllDepartment);
router.get('/department/:departmentId', IsSignedIn, authHelper.VerifyToken, departmentCtrl.GetDepartmentById);

// Update
router.put('/department/:departmentId', IsSignedIn, authHelper.VerifyToken, departmentCtrl.UpdateDepartmentById);

// Delete
router.delete('/department/:departmentId', IsSignedIn, authHelper.VerifyToken, departmentCtrl.DeleteDepartmentById);

module.exports = router;
