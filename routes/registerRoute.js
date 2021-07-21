const express = require('express');
const app = express();
const router = express.Router();
const bodyparser = require('body-parser');
const UserModel = require('../models/UserModel');

app.set("view engine", "pug");
app.set("views", "template");
app.use(bodyparser.urlencoded({extended: false}));
router.get("/", (req, res, next) => {
    res.status(200).render("Register");
})

router.post("/", (req, res, next) => {
    var fname = req.body.firstName.trim();
    var lname = req.body.lastName.trim();
    var uname = req.body.userName.trim();
    var email = req.body.email.trim();
    var password = req.body.loginPassword;

    var payload = req.body;
    if(fname && lname && uname && email && password){
        UserModel.findOne({
            $or: [
                {userName: uname},
                {email: email}
            ]
        }).then((user)=>{
            console.log(user);
        })
        console.log("AAA");

    }else{
        payload.errorMessage = "Please fill all the fields";
        res.status(200).render("register", payload);
    }
    res.status(200).render("Register");
})


module.exports = router;