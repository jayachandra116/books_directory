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
        let responseObject={
            email:user.email,
            profileName:user.profileName,
            lastUpdated:user.updatedAt
        }
        res.status(status).send(user?responseObject:null);
    } catch (e) {
        console.error(e);
        res.status(404).send()
    }
})

router.post('/users', async (req,res)=>{
    try {
        const user=req.body.user;
        const dbUserObject=new User(user);
        await dbUserObject.save();
        res.status(200).send({user:dbUserObject})
    } catch (e) {
        res.status(404).send(e)
    }
})

module.exports=router;