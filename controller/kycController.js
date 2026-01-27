const KYC = require("../model/kyc")
const createKycDocument = async(req,res)=>{
    try {
        const id = req.user._id
        if(!req.files || !req.files.video || !req.files.video[0] || !req.files.pdf || !req.files.pdf[0]){
            resp.status(400).send({message:"File does not exists"})
            return
        }
        const video = req.files.video[0]
        const pdf = req.files.pdf[0]
        const videoLink = `http://localhost:5000/uploads/videos/${video.filename}`
        const pdfLink = `http://localhost:5000/uploads/pdfs/${pdf.filename}`
        const result = await KYC.create({userId:id,video:videoLink,pdf:pdfLink})
        resp.status(201).send({message:"File uploaded successfully",result})
    } catch (error) {
        return resp.status(500).send({message:"Internal Server Error"})
    }
}
module.exports = {createKycDocument}