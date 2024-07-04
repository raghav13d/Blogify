import express from 'express';
import cors from 'cors';
import {connectDb} from './config/db.js'
import 'dotenv/config'
import userRouter from './routes/userRoutes.js';
import Post from './models/Post.js';
import cookieParser from 'cookie-parser';
import multer from 'multer';
const uploadMiddleware = multer({ dest: 'uploads/' });
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const salt = bcrypt.genSaltSync(10);
const secret=process.env.JWT_SECRET;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//app config
const app = express();
const port= process.env.PORT || 4000

//middleware
app.use(cors({credentials:true,origin:'http://localhost:5173'}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads',express.static(__dirname+'/uploads'));


//db connection
connectDb();


//api and end Points
app.use('/api/user',userRouter);

app.get('/profile',(req,res)=>{
    const {token}=req.cookies;
    jwt.verify(token,secret,{},(err,info)=>{
        if(err) throw err;
        res.json(info);
    });
});

app.post('/logout', (req,res)=>{
    res.cookie('token','').json('ok');
})

app.post('/post',uploadMiddleware.single('file'),async (req,res)=>{
    const {originalname,path}=req.file;
    const parts=originalname.split('.');
    const ext=parts[parts.length-1];
    const newPath=path+'.'+ext
    fs.renameSync(path,newPath);
    const {token}=req.cookies;
    jwt.verify(token,secret,{},async(err,info)=>{ 
        if(err) throw err;
        const {title,summary,content}=req.body;
        const postDoc=await Post.create({
            title,
            summary,
            content,
            cover:newPath,
            author:info.id,
        })
        res.json(postDoc);
    });

})

app.put('/post', uploadMiddleware.single('file'),async (req,res)=>{
    let newPath=null;
    if(req.file){
        const {originalname,path}=req.file;
        const parts=originalname.split('.');
        const ext=parts[parts.length-1];
        newPath=path+'.'+ext
        fs.renameSync(path,newPath);
    }

    const {token}=req.cookies;
    jwt.verify(token,secret,{},async(err,info)=>{ 
        if(err) throw err;
        const {id,title,summary,content}=req.body;
        const postDoc =await Post.findById(id);
        const isAuthor=JSON.stringify(postDoc.author)===JSON.stringify(info.id);
        if (!isAuthor){
            res.status(400).json('you are not the author')
        }
        await postDoc.updateOne({
            title,
            summary, 
            content,
            cover:newPath?newPath:postDoc.cover
        })
        res.json(postDoc);
    });

})

app.get('/post', async (req,res) => {
    res.json(
      await Post.find()
        .populate('author', ['username'])
        .sort({createdAt: -1})
        .limit(20)
    );
  });

  app.get('/post/:id', async (req, res) => {
    const {id} = req.params;
    const postDoc = await Post.findById(id).populate('author', ['username']);
    res.json(postDoc);
  })



app.get('/',(req,res)=>{
    res.send('API WORKING')
})

app.listen(port,()=>{
    console.log(`server started on http://localhost:${port}`);
})
