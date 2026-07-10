const express = require("express")
const router = express.Router()
const {getClients} = require("../controllers/clientController")
const {authMiddleware} = require("../middlewares/auth")
router.get("/", authMiddleware, getClients)
module.exports = router