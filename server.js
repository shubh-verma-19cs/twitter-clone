const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

app.use(cors());

const mongoURI=process.env.mongoURI;
const mongoConnectionEssentials = {
    useCreateIndex:true, 
    useNewUrlParser:true,
    useUnifiedTopology:true,
};
mongoose.connect(mongoURI, mongoConnectionEssentials, (error)=>{
    if(error){
        return console.log(error);
    }
    return console.log("Connection Successful");
});

app.use(require("./Routes/Authentication/UserAuth"));
app.use(require("./Routes/Tweets/Tweets"));


const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log('Server started at PORT');
});
