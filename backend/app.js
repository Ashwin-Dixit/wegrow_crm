require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRouter = require("./routers/authRouter");
const leadRouter = require("./routers/leadRouter");
const clientRouter = require("./routers/clientRouter")
const projectRouter = require("./routers/projectRouter")
const taskRouter = require("./routers/taskRouter")
const notificationRouter = require("./routers/notificationRouter");
const employeeRouter = require("./routers/employeeRouter");

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
app.use('/api/client', clientRouter)
app.use('/api/project', projectRouter)
app.use('/api/task', taskRouter)
app.use('/api/notification', notificationRouter)
app.use('/api/admin/employee', employeeRouter)

const PORT = process.env.PORT || 5000
app.listen(process.env.PORT, "0.0.0.0", ()=>{console.log(`server on port ${PORT}`)})