const express = require('express')
const {createTask, updateTaskStatus} = require('../controllers/taskController')
const {authMiddleware} = require('../middlewares/auth')
const taskRouter = express.Router()

taskRouter.post('/create', authMiddleware, createTask)
taskRouter.post('/:id/update-status', authMiddleware, updateTaskStatus)

module.exports = taskRouter