require('dotenv').config()
const express = require('express')
const cors = require('cors')

const authRouter = require('./routers/authRouter')

const app = express()

app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
}))

app.use(express.json())

app.use('api/auth', authRouter)

const PORT = process.env.PORT || 5000
app.listen(process.env.PORT, "0.0.0.0", ()=>{console.log(`server on port ${PORT}`)})