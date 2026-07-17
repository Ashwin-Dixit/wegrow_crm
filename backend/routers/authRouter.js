const express = require("express");
const { signup, login, authme, logout, refreshSession } = require("../controllers/authController");
const { authMiddleware } = require("../middlewares/auth");
const authRouter = express.Router();
authRouter.post('/refresh', refreshSession)
authRouter.get("/me", authMiddleware, authme);
authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout)
module.exports = authRouter