const express = require('express')
const {createTask, updateTaskStatus, deleteTask} = require('../controllers/taskController')
const {authMiddleware} = require('../middlewares/auth')
const adminMiddleware = require('../middlewares/admin')
const taskRouter = express.Router()

taskRouter.post('/create', authMiddleware, createTask)
taskRouter.post('/:id/update-status', authMiddleware, updateTaskStatus)
taskRouter.delete('/:taskId', authMiddleware, adminMiddleware, deleteTask)

module.exports = taskRouter