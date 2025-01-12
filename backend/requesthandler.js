import userSchema from './models/user.model.js'
import bcrypt from 'bcrypt';
import pkg from 'jsonwebtoken';
const {sign}=pkg;
import chatMemberSchema from './models/chatmember.model.js'
import messageSchema from './models/message.model.js'

export async function signIn(req, res){
    try {
        const {email,password}=req.body;        
        if(!(email&&password))
            return res.status(404).send({msg:"Fields are empty"})
        const user=await userSchema.findOne({email});
        if(user==null)
            return res.status(404).send({msg:"Invalid Email"})
        const success=await bcrypt.compare(password,user.password)
        if(success!==true)
            return res.status(404).send({msg:"Invalid email or password"})       
        const token=await sign({userId:user._id},process.env.JWT_KEY,{expiresIn:"24h"});
        return res.status(200).send({msg:"Succefully logged in",token})                                                                                                                                     
    } catch (error) {
        return res.status(404).send({msg:"error"})
    }
}
export async function signUp(req,res) {
    try {
        const {email,password,username,cpassword,phone,profile}=req.body;
        
        if(!(email&&username&&password&&cpassword&&phone&&profile))
            return res.status(404).send({msg:"fields are empty"});
  
        if(password!==cpassword)
            return res.status(404).send({msg:"password not matched"})
  
        bcrypt.hash(password,10).then((hashedPassword)=>{
          userSchema.create({email,username,password:hashedPassword,phone,profile}).then(()=>{
                return res.status(201).send({msg:"success"});
            }).catch((error)=>{
                return res.status(404).send({msg:"Not registered"})
            })
        }).catch((error)=>{
            return res.status(404).send({msg:"error"}); 
        })
    } catch (error) {
        return res.status(404).send({msg:"error"});
    }
  }
  export async function home(req,res) {
    try {
        const _id=req.user.userId;
        
        const user=await userSchema.findOne({_id});
        if(!user)
           return res.status(403).send({msg:"Login to continue"});
        const receivers=await chatMemberSchema.find({$or:[{senderId:_id},{receiverId:_id}]});
        const chatMemberPromises = receivers.map(async (receiver) => {
            if(receiver.senderId==_id)
                return await userSchema.findOne({ _id: receiver.receiverId },{username:1,profile:1});
            if(receiver.receiverId==_id)
                return await userSchema.findOne({ _id: receiver.senderId },{username:1,profile:1});
        });
        const chatMember = await Promise.all(chatMemberPromises);
        return res.status(200).send({chatMember});
    } catch (error) {
        return res.status(404).send({msg:"error"})
    }
}
export async function nav(req,res) {
    try {
        const _id=req.user.userId;
        const user=await userSchema.findOne({_id});
        if(!user)
           return res.status(403).send({msg:"Login to continue"});
        return res.status(200).send({user});
    } catch (error) {
        return res.status(404).send({msg:"error"})
    }
}
export async function listpeople(req,res){
    try {
        const _id=req.user.userId
        
        const user=await userSchema.findOne({_id})
        if(!user)
            return res.status(403).send({msg:"Login to continue"})
        const people=await userSchema.find({_id:{$ne:_id}});
        
        return res.status(200).send({people})
        
    } catch (error) {
        return res.status(404).send({msg:"error"})
    }
}
export async function chat(req,res) {
    try {
        const {rid}=req.params;
        const sid=req.user.userId;
        const user=await userSchema.findOne({_id:sid});
        if(!user)
           return res.status(403).send({msg:"Login to continue"});
        const receiver=await userSchema.findOne({_id:rid},{profile:1,username:1})
        const chats=await messageSchema.find({$or:[{senderId:sid,receiverId:rid},{senderId:rid,receiverId:sid}]});
        
        return res.status(200).send({chats,receiver,uid:sid});
    } catch (error) {
        return res.status(404).send({msg:"error"})
    }
}
export async function addMessage(req,res) {
    try {
        const {rid}=req.params;
        const sid=req.user.userId;
        const {message,date,time}=req.body;
        const chatmember=await chatMemberSchema.findOne({senderId:sid,receiverId:rid});
        if(!chatmember)
           await chatMemberSchema.create({senderId:sid,receiverId:rid})
        const chats=await messageSchema.create({senderId:sid,receiverId:rid,message,date,time});
        return res.status(201).send({msg:"success"});
    } catch (error) {
        return res.status(404).send({msg:"error"})
    }
}
