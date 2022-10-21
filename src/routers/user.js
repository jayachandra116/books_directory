const User=require('../models/user');
const mongoose=require('mongoose');
const express=require('express')
const router=new express.Router();

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
        const user=await User.findById(req.params.id);
        let status=200;
        if(!user){
            status=400
        }
        res.status(status).send(user?user:null);
    } catch (e) {
        console.error(e);
        res.status(404).send()
    }
})