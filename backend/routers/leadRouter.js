const express = require('express')
const {createLead, getLeads} = require('../controllers/leadController')
const { authMiddleware } = require('../middlewares/auth')
const leadRouter = express.Router()

leadRouter.get('/', authMiddleware, getLeads)
leadRouter.post('/create', authMiddleware, createLead)

module.exports = leadRouter