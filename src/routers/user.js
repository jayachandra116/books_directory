const User=require('../models/user');
const mongoose=require('mongoose');
const express=require('express');
const { ObjectId } = require('mongodb');
const router=new express.Router();

const isReqIdValid=(id)=>{
    if(mongoose.Types.ObjectId.isValid(id)){
        if((String)(new ObjectId(id))===id){
            return true
        }
        return false;
    }
    return false
}

router.get('/users',async (req,res)=>{
    try{
        const users=await User.find({});
        res.send(users);
    }catch(e){
        res.status(404).send()
    }
})

router.get('/users/:id',async (req,res)=>{
    try {
        let status=200;
        if(!isReqIdValid(req.params.id)){
            status=404
            return res.status(status).send({message:"Provided 'id' value is invalid"})
        }
        const user=await User.findById(req.params.id);
        if(!user){
            status=400
        }
        res.status(status).send(user?user:null);
    } catch (e) {
        console.error(e);
        res.status(404).send()
    }
})

module.exports=router;