const express = require("express")
const router = express.Router()
const {getClients, createClient} = require("../controllers/clientController")
const {authMiddleware} = require("../middlewares/auth")
router.get("/", authMiddleware, getClients)
router.post("/create", authMiddleware, createClient)
module.exports = router