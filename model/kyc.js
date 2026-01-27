const mongoose = require("mongoose")

const baseSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    video:{
        type:String,
        required:true
    },
    pdf:{
        type:String,
        required:true
    }
})
const KYC = mongoose.model("kyc",baseSchema)
module.exports = KYC 