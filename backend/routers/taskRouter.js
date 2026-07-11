const express = require('express')
const {createTask} = require('../controllers/taskController')
const {authMiddleware} = require('../middlewares/auth')
const taskRouter = express.Router()

taskRouter.post('/create', authMiddleware, createTask)

module.exports = taskRouter