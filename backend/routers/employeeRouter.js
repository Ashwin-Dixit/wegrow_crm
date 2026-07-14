const express = require('express')
const employeeRouter = express.Router()
const {getEmployees} = require('../controllers/employeeController')
const {authMiddleware} = require('../middlewares/auth')
const adminMiddleware = require('../middlewares/admin')
employeeRouter.get('/', authMiddleware, adminMiddleware, getEmployees)
module.exports = employeeRouter