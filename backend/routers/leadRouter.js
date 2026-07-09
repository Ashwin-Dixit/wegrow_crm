const express = require('express')
const {createLead, getLeads, deleteLeadById, updateLeadById} = require('../controllers/leadController')
const { authMiddleware } = require('../middlewares/auth')
const leadRouter = express.Router()

leadRouter.get('/', authMiddleware, getLeads)
leadRouter.post('/create', authMiddleware, createLead)
leadRouter.delete('/delete/:id', authMiddleware, deleteLeadById)
leadRouter.post('/update/:id', authMiddleware, updateLeadById)

module.exports = leadRouter