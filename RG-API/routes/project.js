const express = require('express');
const router = express.Router();
const projectCtrl = require('../controllers/project');
const authHelper = require('../Helpers/AuthHelper');
const { IsSignedIn } = require('../controllers/auth');

// PARAMS
router.param('projectId', IsSignedIn, authHelper.VerifyToken, projectCtrl.ProjectByID);

// ROUTES
// Create
router.post('/project', IsSignedIn, authHelper.VerifyToken, projectCtrl.CreateProject);

// Read
router.get('/project', IsSignedIn, authHelper.VerifyToken, projectCtrl.GetAllProject);
router.get('/project/:projectId', IsSignedIn, authHelper.VerifyToken, projectCtrl.GetProjectById);

// Update
router.put('/project/:projectId', IsSignedIn, authHelper.VerifyToken, projectCtrl.UpdateProjectById);

// Delete
router.delete('/project/:projectId', IsSignedIn, authHelper.VerifyToken, projectCtrl.DeleteProjectById);

module.exports = router;
