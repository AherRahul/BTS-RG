const express = require('express');
const router = express.Router();
const projectCtrl = require('../controllers/project');
const { IsSignedIn, authCtrl } = require('../controllers/auth');

// PARAMS
router.param('projectId', authCtrl.IsAuthenticated, projectCtrl.ProjectByID);

// ROUTES
// Create
router.post('/project', authCtrl.IsAuthenticated, projectCtrl.CreateProject);

// Read
router.get('/project', authCtrl.IsAuthenticated, projectCtrl.GetAllProject);
router.get('/project/:projectId', authCtrl.IsAuthenticated, projectCtrl.GetProjectById);

// Update
router.put('/project/:projectId', authCtrl.IsAuthenticated, projectCtrl.UpdateProjectById);

// Delete
router.delete('/project/:projectId', authCtrl.IsAuthenticated, projectCtrl.DeleteProjectById);

module.exports = router;
