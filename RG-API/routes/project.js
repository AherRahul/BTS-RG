const express = require('express');
const router = express.Router();
const projectCtrl = require('../controllers/project');
const { IsSignedIn, authCtrl } = require('../controllers/auth');

// PARAMS
router.param('projectId', projectCtrl.ProjectByID);

// ROUTES
// Create
router.post('/project', projectCtrl.CreateProject);

// Read
router.get('/project', projectCtrl.GetAllProject);
router.get('/project/:projectId', projectCtrl.GetProjectById);

// Update
router.put('/project/:projectId', projectCtrl.UpdateProjectById);

// Delete
router.delete('/project/:projectId', projectCtrl.DeleteProjectById);

module.exports = router;
