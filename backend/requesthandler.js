import userSchema from './models/user.model.js'
import bcrypt from 'bcrypt';
import pkg from 'jsonwebtoken';
const {sign}=pkg;

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