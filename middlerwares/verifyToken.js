const jwt = require("jsonwebtoken")
require("dotenv").config()
const mongoose = require("mongoose")
const User = require("../model/user")
const disposableEmailDomains = require("disposable-email-domains")
const verifyToken = async(req,resp,next) => {
    try {
        const token = req.headers.authorization
       if(!token || !token.startsWith("Bearer ")){
          resp.status(400).send({message:"Invalid or Missing Token"})
          return
       }
       const authToken = token.split(" ")[1]
       if(!authToken){
        resp.status(400).send({message:"Invalid or Missing Token"})
        return
       }
       const decoded = jwt.verify(authToken,process.env.SECRET_KEY)
       if(!decoded?.email || !decoded?.id || !mongoose.isValidObjectId(decoded?.id)){
        resp.status(400).send({message:"Unauthorised User"})
        return
       }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(typeof decoded?.email !== "string" || !emailRegex.test(decoded?.email)){
            resp.status(400).send({message:"Invalid Email Format"})
            return
        }

        const updatedEmail = decoded?.email?.trim()?.toLowerCase()
        const domain = updatedEmail?.split("@")[1]
        if(disposableEmailDomains.includes(domain)){
           resp.status(400).send({message:"Spam Email found. Invalid Email"}) 
           return
        }
    
        const existingUser = await User.findOne({email:updatedEmail,_id:decoded.id}).select("-password")
        if(!existingUser){
            resp.status(400).send({message:"Unauthorised User"})
            return
        }
        req.user = existingUser
        next()
    } catch (error) {
        resp.status(400).send({message:"Invalid Token: Token Mismatch"})
    }
} 
module.exports = verifyToken
