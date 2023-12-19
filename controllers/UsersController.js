const locationModel = require('../models/locationModel');
const userModel = require('../models/userModel');
const jwt = require("jsonwebtoken");
const KEY = "SYS^%DFDDA+_)D(D*D";

module.exports.homePage=(req,res)=>{
    res.send({
        status:true,
        msg:"APi is working"
    })
}

module.exports.getLocationList=async (req,res)=>{
    let result=await locationModel.find()
    res.send({
        status:true,
        result
    })
}

module.exports.createUserAccont=async(req,res)=>{
    let data=req.body;
    //save single user
    //by creating a instance
    let newUser=new userModel({
        name: data.name,
        mobile:data.mobile,
        email: data.email,
        address: data.address,
        password:data.password
    })
    //save user
    let result=await newUser.save()
    if(result){
        res.send({
            status:true,
            msg:"your registration is done successfully, you can login now"
        })
    }else{
        res.send({
            status:false,
            msg:"your registration failed"
        })
    }
}
module.exports.userLogin=async (req,res)=>{
    let data=req.body;
    console.log(data);
    let result=await userModel.findOne({
        email: data.email,
        password: data.password
    },{
        password:0,
        __v:0

    })
    if(result){
        let data={
            name: result.name,
            id: result._id,
            email: result.email,
            mobile: result.mobile,
        };
        let token = jwt.sign(data,KEY,{expiresIn: "24h"});
        res.send({
            status:true,
            msg:"login successfully",
            token,
        })
    }else{
        res.send({
            status:false,
            msg:"invalid username or password"
        })
    }
}





