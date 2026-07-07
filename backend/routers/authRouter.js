const express = require('express')
const { signup } = require('../controllers/authController')
const authRouter = express.Router()
authRouter.get('/me', (req,res,next)=>{})
authRouter.post('/signup', signup)
authRouter.post('/login', (req,res,next)=>{})

module.exports = authRouter