const express = require('express');
const router = express.Router();
const jobTitleCtrl = require('../controllers/jobTitle');
const departmentCtrl = require('../controllers/department');
const authHelper = require('../Helpers/AuthHelper');
const { IsSignedIn } = require('../controllers/auth');

// PARAMS
router.param('jobTitleId', jobTitleCtrl.JobTitleByID);
router.param('departmentId', departmentCtrl.DepartmentByID);


// ROUTES
// Create
router.post('/jobTitle', IsSignedIn, authHelper.VerifyToken, jobTitleCtrl.CreateJobTitle);

// Read
router.get('/jobTitle', IsSignedIn, authHelper.VerifyToken, jobTitleCtrl.GetAllJobTitle);
router.get('/jobTitle/:jobTitleId', IsSignedIn, authHelper.VerifyToken, jobTitleCtrl.GetJobTitleById);
router.get('/jobTitle/:departmentId', IsSignedIn, authHelper.VerifyToken, jobTitleCtrl.GetAllJobTitleByDepartmentId);


// Update
router.put('/jobTitle/:jobTitleId', IsSignedIn, authHelper.VerifyToken, jobTitleCtrl.UpdateJobTitleById);

// Delete
router.delete('/jobTitle/:jobTitleId', IsSignedIn, authHelper.VerifyToken, jobTitleCtrl.DeleteJobTitleById);

module.exports = router;
