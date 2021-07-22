const mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);

class Database {

    constructor() {
        this.connect();
    }

    connect() {
        mongoose.connect("mongodb+srv://test:test@twitter-clone.0g6bp.mongodb.net/Twitter-Clone?retryWrites=true&w=majority")
        .then(() => {
            console.log("MongoDatabase connected");
        })
        .catch((err) => {
            console.log("couldn't connect to database " + err);
        })
    }
}

module.exports = new Database();