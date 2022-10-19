const mogoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const validator=require('validator');

const userSchema=new mogoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid');
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        trim:true,
        validate(value){
            //Minimum eight characters, at least one letter and one number:
            if(!value.match("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$")){
                throw new Error("Pwd must contain Minimum eight characters, at least one letter and one number")
            } 
        }
    },
    profileName:{
        type:String,
        trim:true
    },
    tokens:[
        {
            type:String,
            required:true
        }
    ]
},{
    timestamps:true
})

const User=mogoose.model('User',userSchema)
module.exports=User;