const express = require("express")
const cors = require("cors")
const routes = require("./routes/routes")
const connectDB = require("./config/db")
const path = require("path")


const app = express()
app.use(express.json())
app.use(cors())
app.use("/api",routes)
app.use("/uploads",express.static(path.resolve("uploads")))
connectDB()

const PORT = 5000
app.listen(PORT,()=>{
    console.log("Server Started At PORT:"+PORT)
})