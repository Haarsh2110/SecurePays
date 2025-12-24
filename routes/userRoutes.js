const express = require("express")
const router = express.Router()
const {loginUser,verifyUser} = require("../controller/userController")

router.post("/create",function(req,resp){
    resp.send({message:"Api working correct",status:true});    
})
router.post("/login",loginUser)
router.post("/verify",verifyUser)

module.exports = router