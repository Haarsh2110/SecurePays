const express = require("express")
const router = express.Router()
const {loginUser,verifyUser,checkUserDetails,updateUserDetails} = require("../controller/userController")
const verifyToken = require("../middlerwares/verifyToken")

router.post("/create",function(req,resp){
    resp.send({message:"Api working correct",status:true});    
})
router.post("/login",loginUser)
router.post("/verify",verifyUser)
router.get("/checkUserDetails",verifyToken,checkUserDetails)
router.put("/updateUserDetails",verifyToken,updateUserDetails)

module.exports = router