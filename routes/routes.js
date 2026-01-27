const express = require("express")
const userRoutes = require("./userRoutes")
const kycRoutes = require("./kycRoutes")
const router = express.Router()

router.use("/auth",userRoutes)
router.use("/kyc",kycRoutes)

module.exports = router