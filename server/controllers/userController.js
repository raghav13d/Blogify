import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const secret=process.env.JWT_SECRET;


const loginUser=async(req,res)=>{
    const {username,password}=req.body;
    const userDoc=await User.findOne({username});
    const isPassOk=bcrypt.compareSync(password,userDoc.password);
    if(isPassOk){
        jwt.sign({username,id:userDoc._id},secret,{},(err,token)=>{
            if(err) throw err;
            res.cookie('token',token).json({
                id:userDoc._id,
                username,
            });
        });
    }else{
        res.status(400).json('wrong credentials');
    }
}

const registerUser=async(req,res)=>{
    
    const {username,password}=req.body;
    try{
        const salt = bcrypt.genSaltSync(10);
        const userDoc=await User.create({
            username,
            password:bcrypt.hashSync(password,salt)
        });
        res.json(userDoc);
    }catch(e){
        console.log(e);
        res.status(400).json(e);
    }
}
 
export {loginUser,registerUser}