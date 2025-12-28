const crypto = require("crypto")

const otpMap = new Map()
const OTP_EXPIRY_TIME = 5 * 60 * 1000

const generateOtp = (email)=>{
    const number = crypto.randomInt(0,1000000)
    const otp = String(number).padStart(6,"0")
    const expiry = Date.now() + OTP_EXPIRY_TIME
    otpMap.set(email,{otp,expiry})

    setTimeout(()=>{
        const otpEntry = otpMap.get(email)
        if(otpEntry) otpMap.delete(email)
    },OTP_EXPIRY_TIME)

    return otp

}

module.exports = { generateOtp };