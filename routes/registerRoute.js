const express = require('express');
const app = express();
const router = express.Router();
const bodyparser = require('body-parser');
const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
// const User = require('../models/UserModel');

app.set("view engine", "pug");
app.set("views", "template");
app.use(bodyparser.urlencoded({extended: false}));
router.get("/", (req, res, next) => {
    res.status(200).render("Register");
})

router.post("/", async (req, res, next) => {
    var firstName = req.body.firstName.trim();
    var lastName = req.body.lastName.trim();
    var userName = req.body.userName.trim();
    var email = req.body.email.trim();
    var password = req.body.password;

    var payload = req.body;
    if(firstName && lastName && userName && email && password){
        var user = await UserModel.findOne({
            $or: [
                {userName: userName},
                {email: email}
            ]
        })
        .catch((error)=>{
            console.log(error);
            payload.errorMessage = "Something went wrong";
            res.status(200).render("Register", payload);
        });

        if(user == null){
            var data = req.body;

            data.password = await bcrypt.hash(password, 10);

            UserModel.create(data).then((user)=>{
                req.session.user = user;
                return res.redirect("/");
                
            })
            
        }
        else{
            if(email == user.email){
                payload.errorMessage = "Email is already in use.";
            }
            else{
                payload.errorMessage = "Username is already in use";
            }
            res.status(200).render("Register", payload);
            
        }
        
    }else{
        payload.errorMessage = "Please fill all the fields";
        res.status(200).render("Register", payload);
    }
})


module.exports = router;