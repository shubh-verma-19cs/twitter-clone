const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
class MongoDatabase{

    constructor(){
        this.connect();
    }

    connect(){
        mongoose.connect("mongodb+srv://test:test@twitter-clone.0g6bp.mongodb.net/Twitter-Clone?retryWrites=true&w=majority").then(()=>{console.log("MongoDB connected successfully")}).catch((err)=>{
        console.log("Couldn't connect to Database");
        })
    }
}

module.exports = new MongoDatabase();