const express = require('express')
const {getProjects, addProject, deleteProject} = require('../controllers/projectController')
const {authMiddleware} = require('../middlewares/auth')
const adminMiddleware = require('../middlewares/admin')
const projectRouter = express.Router()
projectRouter.get('/:clientId', authMiddleware, getProjects)
projectRouter.post('/add-project', authMiddleware, adminMiddleware, addProject)
projectRouter.delete('/:projectId', authMiddleware, adminMiddleware, deleteProject)
module.exports = projectRouter