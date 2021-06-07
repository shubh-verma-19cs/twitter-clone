const router = require('express').Router();
const userModel = require('../../Model/User/User')
const Formidable = require('formidable');
const Bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2;
const { response } = require('express');
require('dotenv').config()

cloudinary.config({
    cloud_name:process.env.cloud_name,
    api_key:process.env.api_key,
    api_secret:process.env.api_secret,
});

router.post('/api/user-register',(req,resp)=>{
    const form = new Formidable.IncomingForm();
    form.parse(req, async(error,fields,files)=>{
        const {username, password, verifiedPassword} = fields;
        const {profileImage} = files;

        if(!username || !password || !verifiedPassword ||!profileImage){
            return resp.status(400).json({msg:'Please fill all the fields'})
        }

        const user = await userModel.findOne({username:username})
        if(user){
            return response.status(400).json({msg:'User already exists'})
        }

        cloudinary.uploader.upload(profileImage.path, {folder:'/Twitter-Clone/profiles'}, async(error, res)=>{
            if(error){
                return console.log(error);
            }
            const profileImageURL = res.secure_url;
            const salt = await Bcrypt.genSalt(13);
            const hashedPassword = await Bcrypt.hash(password, salt);
            const newUser = new userModel({
                username:username,
                password:hashedPassword,
                profPic:profileImageURL
            })
            const savedUSER = await newUser.save();
            const token = JWT.sign({id:savedUSER._id}, process.env.jwt_passkey);
            return resp.status(201).json({token:token, profPic:savedUSER.profPic, })
        });
    });
});

router.post('/api/user-login',(req,resp)=>{
    const form = new Formidable.IncomingForm();
    form.parse(req, async(error, fields, files)=>{
        const {username, password} = fields;
        if(!username || !password){
            return resp.status(400).json({msg:'Please enter all fields'})
        }

        const user = await userModel.findOne({username:username})

        if(!user){
            return response.status(400).json({msg:'Username doesn\'t exist'})
        }

        const validatedPassword = await Bcrypt.compare(password, user.password);
        if(!validatedPassword){
            return response.status(400).json({msg: 'Invalid username or password'});
        }

        const token = JWT.sign({id:user._id}, process.env.jwt_passkey);
        return resp.status(200).json({token:token, profPic:user.profPic });

    });
});

module.exports= router;