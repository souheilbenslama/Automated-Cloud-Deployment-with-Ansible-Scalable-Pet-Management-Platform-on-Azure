var User = require("../models/User");
var nodemailer = require("nodemailer");
require("dotenv").config();
var exports = module.exports = {};
var smtpTransport = require("nodemailer-smtp-transport");
exports.login_post = function(req, res, next) {
    User.authenticate(req.body.email,req.body.password,function(error,user){
        if(!user || error){
            var err = new Error("Wrong credentials!");
            err.status=401;
            return next(err);
        }else{
            req.session.userId=user._id;
            res.redirect("/profile");
        }
    });
}

exports.register_post = function(req, res, next) {
    if(req.body.password !== req.body.confirmPassword){
        var err = new Error("Passwords do not match");
        err.status = 400;
        res.render("error",{"error":err});
    }
    var userData = {
        name:req.body.name,
        surname:req.body.surname,
        email:req.body.email,
        password:req.body.password,
        avatar:"uploads/" + req.file.filename,
        adress:req.body.adress || "empty",
        phone:req.body.phone,
        birthday:req.body.birthday,
        gender:req.body.gender || "empty",
        role:req.body.role
    };
    User.create(userData,function(error,user){ 
        if(error){
            return next(error);
        }else{
            req.session.userId=user._id;
            res.redirect("/profile");
        }
    }); 
}

exports.logout = function(req,res,next){
    req.session.destroy(function(err){
        if(err){
            return next(err);
        }else{
            return res.redirect("/");
        }
    });
}
  
exports.forgetPassword_post = function(req,res,next){
    var transporter = nodemailer.createTransport(smtpTransport({
        service:"Gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    }));
    var code = Math.floor(Math.random()*899999)+100000;
    var mailOptions = {
        from: process.env.EMAIL,
        to: req.body.email,
        subject: "Verification Code",
        text: "Your code is "+code
    };
    transporter.sendMail(mailOptions, function(err, info){
        if (err) {
            return next(err);
        }else {
            res.render("forgetPassword",{code:"code sent"});
        }
    });
}