const mongoose=require("mongoose")
const notesSchema=mongoose.Schema({
    userId:{
        
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true      
    },
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    }, 
      createdAt: {
        type: Date,
        default: Date.now
    }
})
module.exports=mongoose.model("notes",notesSchema)