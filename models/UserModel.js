const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserModel = new Schema({
    firstName:{ type: String, required: true},
    lastName:{ type: String, required: true},
    userName:{ type: String, required: true, unique: true},
    email:{ type: String, required: true, unique: true},
    password:{ type: String, required: true},
    profilePic:{ type: String, default: "/images/profilePic.png"}
});

var UserModel = mongoose.model('User', UserModel);
module.exports = UserModel;