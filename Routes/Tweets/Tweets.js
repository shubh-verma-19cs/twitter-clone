const router = require('express').Router();
const tweetModel = require('../../Model/Tweets/Tweets');
const userModel = require('../../Model/User/User');
const cloudinary = require('cloudinary').v2;
const JWT = require('jsonwebtoken');
const mongoose = require('mongoose');
const Formidable = require('formidable');
const Pusher = require('pusher');
require('dotenv').config();



const pusher = new Pusher({
  appId: "1215941",
  key: "0916e12672e14b9b3e01",
  secret: "3404e835215a492aac1b",
  cluster: "ap2",
  useTLS: true
});

const db = mongoose.connection;

// const changeStream = twitterFeed.watch();
// changeStream.once('change', (change)=>{
//     console.log();
// })
db.once("open", ()=>{
    const twitterFeed = db.collection('tweetmodels');
    // const tweetCollection = db.collection("tweetmodels");
    const changeStream = twitterFeed.watch();
    changeStream.on("change",(change)=>{
        pusher.trigger("twitterFeed", "insert",{
            content: change.fullDocument,
        })
    })
})


router.post('/api/tweet-upload',async(request, response)=>{
    // const token = request.header("x-auth-token");
    // const verifiedToken = JWT.verify(token, process.env.jwt_passkey);
    // const userID = verifiedToken.id;

    // const user = await userModel.findOne({_id:userID});

    // console.log(user);

    const form = new Formidable.IncomingForm();
    form.parse(request,async(error, fields, files)=>{
        const {tweet} = fields;
        const {file} = files;

        if(!file){
            
            const newTweet = new tweetModel({
                // user:user.username,
                
                tweet:tweet,
                // profile:user.profPic,

            });
            const savedTweet = newTweet.save();

        }else{
            cloudinary.uploader.upload(file.path, {folder:'/TWEETS/FILES'},async(error,res)=>{
                if(error){
                    console.log(error);
                }
                const fileURL=res.secure_url

                const newTweet = new tweetModel({
                    // user:user.username,
                    
                    tweet:tweet,
                    // profile:userModel.profPic,
                    file:fileURL
                })
                const savedTweet = await newTweet.save();
            })
        }
        return response.status(200).json({msg: "Tweet sent!"});
    })
})

router.get('/api/feeds', async(request, response)=>{
    await tweetModel.find().exec().then(data=>{
        return response.status(200).json(data)
    }).catch((error)=>{
        console.log(error);
    });
});

module.exports = router;