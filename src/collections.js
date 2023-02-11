const mongoose=require("mongoose");

const RegisterSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true
        
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:7,
    },
    confirmpass:{
        type:String,
        required:true,
        trim:true,
        minlength:7,
    }
})


const StorySchema=new mongoose.Schema({
   
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    StoryData:{
        type:Array
    }
})


const Register=mongoose.model("Register",RegisterSchema);
const Story=mongoose.model("Story",StorySchema);
module.exports={
    Register,Story
};