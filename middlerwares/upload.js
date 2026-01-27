const multer = require("multer")
const fs = require("fs")
const path = require("path")

const uploadDir = path.resolve("uploads");
if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir)
}
const videoDir = path.join(uploadDir,"videos")
if(!fs.existsSync(videoDir)){
    fs.mkdirSync(videoDir)
}
const pdfDir = path.join(uploadDir,"pdfs")
if(!fs.existsSync(pdfDir)){
    fs.mkdirSync(pdfDir)
}

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        if(file.mimetype === "application/pdf"){
            cb(null, pdfDir);
        } else {
            cb(null, videoDir);
        }
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    }
})

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["application/pdf","video/mp4"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF and video files are allowed"), false);
  }
};

const upload = multer({
    storage:storage,
    fileFilter,
    limits: {
    fileSize: 10 * 1024 * 1024 
  }
})

module.exports = upload