require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRouter = require("./routers/authRouter");
const leadRouter = require("./routers/leadRouter");

const app = express();

app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
}))

app.use(cookieParser())
app.use(express.json())

app.get('/', (req, res, next)=>{res.status(200).json({message: "welcome"})})
app.use('/api/auth', authRouter)
app.use('/api/lead', leadRouter)

const PORT = process.env.PORT || 5000
app.listen(process.env.PORT, "0.0.0.0", ()=>{console.log(`server on port ${PORT}`)})