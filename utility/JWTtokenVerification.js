const jwt=require("jsonwebtoken")

exports.JWTverificationToken=(token,secretKey)=>{
    try {
        const isValid=jwt.verify(token,secretKey)
        if(isValid){
            return isValid
        }
    } catch (error) {
        console.log(error)
     
    }
}