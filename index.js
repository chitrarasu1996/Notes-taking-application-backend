require("dotenv").config()
const cors=require("cors")
const express=require("express")

const db=require("./Db/Connect")
const UserRoute=require("./Routes/User.routes")
const notesRoutes=require("./Routes/Notes.routes")
const app=express();
app.use(cors())
app.use(express.json())
app.use("/user",UserRoute)
app.use("/notes",notesRoutes)
db()


const port=process.env.PORT||3000
app.listen(port,()=>{
    console.log("port is running",port)
})
app.get("/",(req,res)=>{
    res.status(200).send({message:"CAREER FAIR PROJECTS"})
})

