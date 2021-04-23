var User = require("../models/User");
var nodemailer = require("nodemailer");
require("dotenv").config();
var exports = module.exports = {};
var smtpTransport = require("nodemailer-smtp-transport");
var jwt = require("jsonwebtoken");

exports.login = function(req, res, next) {
    User.authenticate(req.body.email,req.body.password,function(error,user){
        if(!user || error){
            var err = new Error("Wrong credentials!");
            res.status(401).send(err.message);
        }else{
            var token = user.generateToken();
            user.password=null;
            res.send({user:user,token:token});
        }
    });
}

exports.register = function(req, res, next) {
    if(req.body.password !== req.body.confirmPassword){
        var err = new Error("Passwords do not match");
        res.status(400).send(err.message);
    }
    var userData = {
        name:req.body.name,
        surname:req.body.surname,
        email:req.body.email,
        password:req.body.password,
        avatar:(req.file)?"uploads/" + req.file.filename:"images/avatar.jpg",
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
            var token = user.generateToken();
            user.password=null;
            res.send({user:user,token:token});
        }
    }); 
}
  
exports.forgetPassword = function(req,res,next){
    if(req.body.email){
        User.findOne({email:req.body.email},function(err,result){
            if(err){
                return next(err);
            }else{
                if(!result){
                    var error = new Error("mail not found!");
                    return res.status(401).send(error.message);
                }
            }
        });
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
                res.send({msg:"code sent",accessCode:code,email:req.body.email});
            }
        });
    }
    if(req.body.code){
        if(req.body.code === req.body.accessCode){
            return res.send(req.body.userEmail);
        }else{
            var err = new Error("Wrong code");
            res.status(400).send(err.message);
        }
    }
}

exports.resetPassword = function(req,res,next){
    if(req.body.password !== req.body.confirmPassword){
        var err = new Error("Passwords do not match");
        res.status(400).send(err.message);
    }
    User.findOne({ email: req.body.email }, function(err, user){
        if(err){
            return next(err);
        }
        else{
            user.password=req.body.password;
            user.save(function(err,updatedObject){
                if(err){
                    return next(err);
                }else{
                    res.status(200).send("Password reset successfully");
                }
            })
        }
    });
}