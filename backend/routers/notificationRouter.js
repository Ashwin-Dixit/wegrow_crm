const express = require('express')
const {fetchNotifications, markNotificationsRead} = require('../controllers/notificationController')
const {authMiddleware} = require('../middlewares/auth')

const notificationRouter = express.Router()

notificationRouter.get('/', authMiddleware, fetchNotifications)
notificationRouter.post('/read', authMiddleware, markNotificationsRead)

module.exports = notificationRouter