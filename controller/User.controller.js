
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const usersCollection=require("../models/User.model")
exports.registerUser=async(req,res)=>{
    try {
        const {username,password}=req.body
     const oldUser=await usersCollection.findOne({username})
  
     if(oldUser){
        return res.status(200).send({
            result:false,
            message:"already user registered"})
     }
        const saltingRound=10;
        const hashesPass= await bcrypt.hash(password,saltingRound)

const schemaVerified= new usersCollection({username,password:hashesPass})
const userRegisterd=await schemaVerified.save()

userRegisterd?res.status(201).send({result:true,message:"user successfully registered"}):
res.status(401).send({result:false,message:"error while registering user"})

    } catch (error) {
        console.log(error)
    }
}

exports.allUsers=async(req,res)=>{
    try {

        const allUser=await usersCollection.find()
       allUser?res.status(200).send({message:"all Users succefully retrived",allUser})
        :res.status(401).send({message:"error while on retiving users"})
    } catch (error) {
        console.log(error)
    }
}

exports.login=async(req,res)=>{

try {
    const {username,password}=req.body
 
    const mathedUsername=await usersCollection.findOne({username:username.toLowerCase()})
    
    if(!mathedUsername) {
       return  res.status(200).send({result:false,message:"user not found kindly register"})
    }
    const mathedPass=await bcrypt.compare(password,mathedUsername.password)
    if(!mathedPass){
        return  res.status(200).send({result:false,message:"password doesn't match"})
    }


const jwtToken=await jwt.sign({userId:mathedUsername._id},process.env.SECRET_KEY,{expiresIn:"7d"})
 res.status(201).send({result:true,message:"user successfully logged",token:jwtToken})

} catch (error) {
    console.log(error)
}
}

exports.getUserNameById=async(req,res)=>{
    try {
        const {token}=req.headers
     
        const verifiedToken=await jwt.verify(token,process.env.SECRET_KEY)
        if(!verifiedToken){
return res.status(401).send({result:false,message:"error while getting the name"})
        }
        const user=await usersCollection.findById({_id:verifiedToken.userId})
    
        res.status(200).send({result:true,message:"succefuly user name retrived",user})
    } catch (error) {
        console.log(error)
        
    }
}