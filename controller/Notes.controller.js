
const jwt=require("jsonwebtoken")
const notesCollection=require("../models/Notes.Model")
const { JWTverificationToken } = require("../utility/JWTtokenVerification")
exports.createNotes=async(req,res)=>{
    try{
const {title,content}=req.body
const {token}=req.headers


const verifiedUserwithToken=await jwt.verify(token,process.env.SECRET_KEY)


const {userId}=verifiedUserwithToken

const validatedNote=await new notesCollection({userId,title,content , createdAt: new Date()})
const createdNote=await validatedNote.save()

if(!createdNote){
    return res.status(401).send({message:"error while creating notes"})
}

res.status(201).send({result:true,message:"note created Succefffully",note:createdNote})

}catch(er){
console.log(er)
    }
}

exports.getNotesById=async(req,res)=>{
    try {
       const {token}=req.headers

       const validUser=await JWTverificationToken(token,process.env.SECRET_KEY)

const getAllNotes=await notesCollection.find({userId:validUser.userId})

  if(!getAllNotes){
return res.status(401).send({message:"error while getting notes"})
  }

  res.status(200).send({result:true,message:"succefully user retrived",notes:getAllNotes})
} catch (error) {
        console.log(error)
    }
}

exports.deleteNote=async(req,res)=>{
try {
    const {id}=req.params
    const deletedNote=await notesCollection.findByIdAndDelete({_id:id})
if( !deletedNote){
return res.status(400).send({result:false,message:"notes deleted successfully"})
}
res.status(200).send({result:true,message:"successfully user deleted"})
} catch (error) {
    console.log(error)
}
}

exports.updateNotes=async(req,res)=>{
    try {
        const {noteId}=req.params
        const {content,title}=req.body
    
      const updateContent=await notesCollection.findByIdAndUpdate({_id:noteId},{$set:{content,title}})
  if(!updateContent){
return  res.status(401).send({result:false,message:"error while updating content succefully"})

  }
  res.status(201).send({result:true,message:"content updated successfully"})
    } catch (error) {
        console.log(error)
    }
}