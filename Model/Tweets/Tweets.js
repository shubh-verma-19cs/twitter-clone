const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
    // user:{type:String, required:true},
    tweet:{type:String, required:true},
    file:{type:String, required:false, default:null},
    // profile:{type:String, required:true},
    likes:{type:Number, required:false, default:0},
    comments:{type:Array, required:true, default:[]},
});

const tweetModel = mongoose.model("tweetModel", tweetSchema);

module.exports = tweetModel;