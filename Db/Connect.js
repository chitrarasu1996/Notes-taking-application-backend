const mongoose=require("mongoose")
const url=process.env.URL
const db=async()=>{
    try {
     const connected=  await  mongoose.connect(url)
   console.log("db connected")
    } catch (error) {
        console.log(error,"error while connecting db")
        
    }
}

module.exports=db