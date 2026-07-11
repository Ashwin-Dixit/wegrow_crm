const express = require('express')
const {getProjects} = require('../controllers/projectController')
const {authMiddleware} = require('../middlewares/auth')
const projectRouter = express.Router()
projectRouter.get('/:clientId', authMiddleware, getProjects)
module.exports = projectRouter