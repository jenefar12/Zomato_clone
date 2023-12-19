let mongoose=require('mongoose');
let schema=mongoose.Schema;

let userSchema=new schema({
    name:{type: String},
    mobile:{type: String},
    email: {type: String},
    address:{type: String},
    password:{type: String}
})

let userModel=mongoose.model("user",userSchema,"users");

module.exports=userModel;