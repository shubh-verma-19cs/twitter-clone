const express = require('express');
const app = express();
const PORT = 5000;
const server = app.listen(PORT, ()=>{
    console.log(`PORT ${PORT} is active`);
});
const middleWare = require("./middleWare");
const path = require('path');
const bodyparser = require('body-parser');
// const mongoose = require('mongoose');

const mongoose = require('./mongodatabase');




app.set("view engine", "pug");
app.set("views", "template");

app.use(bodyparser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));

const loginRoute = require('./routes/loginRoute');
const registerRoute = require('./routes/registerRoute')
app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.get("/", middleWare.requireLogin,    (req, res, next) => {
    res.status(200).render("Home");
})