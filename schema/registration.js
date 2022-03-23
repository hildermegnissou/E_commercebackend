import  mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = Schema ({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    address:{
        type:String
    },
    Number:{
        type:String,
    },
    city:{
        type:String
    },

})
const userModel=model("users",UserSchema)
export default userModel;

