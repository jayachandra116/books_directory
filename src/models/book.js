const mongoose=require('mongoose');
const express=require('express');

const bookSchema=new mongoose.Schema({
    title:{
        required:true,
        type:String,
        minlength:1
    },
    author:{
        required:true,
        type:String,
        minlength:1,
        validate(value){
            if(value.match(/[\d+]/)){
                throw new Error('Author name should not contain numbers.')
            }
        }
    },
    noOfPages:{
        required:true,
        type:Number,
        min:1
    }
},{
    timestamps:true
})

const Book=mongoose.model('Book',bookSchema);
module.exports=Book