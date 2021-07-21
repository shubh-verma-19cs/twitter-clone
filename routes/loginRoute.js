const express = require('express');
const app = express();
const router = express.Router();
const bodyparser = require('body-parser');
const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');

app.set("view engine", "pug");
app.set("views", "template");
app.use(bodyparser.urlencoded({extended: false}));

router.get("/", (req, res, next) => {
    res.status(200).render("Login");
})

router.post("/", async (req, res, next) => {
    var payload = req.body;
    if(req.body.loginName && req.body.loginPassword){
        var user = await UserModel.findOne({
            $or: [
                {userName: req.body.loginName},
                {email: req.body.loginName}
            ]
        })
        .catch((error)=>{
            console.log(error);
            payload.errorMessage = "Couldn't login";
            res.status(200).render("Login", payload);
        });

        if(user!=null){
            var result = await bcrypt.compare(req.body.loginPassword, user.password);

            if(result == true){
                req.session.user = user;
                return res.redirect("/");
            }
        }

        payload.errorMessage = "Invalid Username/Password";
        console.log(user);
        return res.status(200).render("Login", payload);
    }
    payload.errorMessage = "Please fill all values";
    res.status(200).render("Login");
})

module.exports = router;