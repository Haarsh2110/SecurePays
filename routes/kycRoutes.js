 const express = require("express")
const verifyToken = require("../middlewares/verifyToken")
const { createKycDocument } = require("../controller/kycController")
const upload = require("../middlerwares/upload")
const router = express.Router()

router.post("/create",verifyToken,upload.fields([
    {name: "video", maxCount: 1},
    {name: "pdf", maxCount: 1}
]),createKycDocument)

module.exports = router