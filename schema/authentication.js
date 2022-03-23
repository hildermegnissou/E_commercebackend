import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = Schema ({
    name:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    number:{
        type:String,
        required:true
    },
    city:{
        type:String,
        require:true,
    },
})
const userModel= model("users",UserSchema);
export default userModel;