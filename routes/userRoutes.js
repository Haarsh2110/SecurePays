const express = require("express")
const router = express.Router()
const {loginUser,verifyUser,checkUserDetails,updateUserDetails} = require("../controller/userController")

router.post("/create",function(req,resp){
    resp.send({message:"Api working correct",status:true});    
})
router.post("/login",loginUser)
router.post("/verify",verifyUser)
router.get("/checkUserDetails",checkUserDetails)
router.put("/updateUserDetails",updateUserDetails)

module.exports = router