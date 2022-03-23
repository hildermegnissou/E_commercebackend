import  mongoose from "mongoose";
const { Schema, model } = mongoose;

const productschema = Schema ({
    name:{
        type:String
    },
    product_type:{
        type:String
    },
    description:{
        type:String
    },
    price:{
        type:int
    },
    country_of_origin:{
        type:String
    },
    production_date:{
        type:String,
    },
    expiration_date:{
        type: String
    },
    

})
const product=model("products",productschema)
export default product;

