var User = require("../models/User");
var ResetCode = require("../models/ResetCode");
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
        return res.status(400).send(err.message);
    }
    User.find({email:req.body.email},function(error,users){
        if(error){
            return next(error);
        }else if(users.length > 0){
            return res.status(401).send("email already exists");
        }else{
            User.find({phone:req.body.phone},function(error,users){
                if(error){
                    return next(error);
                }else if(users.length>0){
                    return res.status(401).send("phone already exists");
                }else{
                    if(req.body.gender == "Male"){
                        req.body.avatar = (req.file)?"uploads/" + req.file.filename:"images/male.png";
                    }else if(req.body.gender == "Female"){
                        req.body.avatar = (req.file)?"uploads/" + req.file.filename:"images/female.png";
                    }else{
                        req.body.avatar = (req.file)?"uploads/" + req.file.filename:"images/default.jpg";
                    }
                    User.create(req.body,function(error,user){ 
                        if(error){
                            return next(error);
                        }else{
                            var token = user.generateToken();
                            user.password=null;
                            return res.send({user:user,token:token});
                        }
                    });
                }
            }); 
        }
    });
}
  
exports.forgetPassword = function(req,res,next){
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            err.message = "user not found";
            return next(err);
        }else if(!user){
                var error = new Error("mail not found!");
                return res.status(401).send(error.message);
        }else{
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
            var codeData = {
                value:code,
                owner:user.email
            };
            ResetCode.create(codeData,function(error){ 
                if(error){
                    error.message="code not saved successfully!";
                    return next(error);
                }
            });
            var mailOptions = {
                from: process.env.EMAIL,
                to: req.body.email,
                subject: "Verification Code",
                text: "Your code is "+code
            };
            transporter.sendMail(mailOptions, function(err, info){
                if (err) {
                    err.message="mail not sent";
                    return next(err);
                }else {
                    res.send("code sent");
                }
            });
        }
    });
}

exports.verifyCode = function(req,res,next){
    ResetCode.findOne({value:req.body.code},function(err,code){
        if(!code){
            return res.status(400).send("Wrong code");
        }else{
            User.findOne({email:code.owner},function(err,user){
                if(err){
                    err.message="user not found";
                    return next(err.message);
                }else{
                    var token = user.generateToken();
                    res.send(token);
                }
            });
        }
    });
}

exports.resetPassword = function(req,res,next){
    if(req.body.password !== req.body.confirmPassword){
        var err = new Error("Passwords do not match");
        return res.status(400).send(err.message);
    }
    User.findById(req.user._id , function(err, user){
        if(err){
            return next(err);
        }
        else{
            user.password=req.body.password;
            user.save(function(err){
                if(err){
                    return next(err);
                }else{
                    res.status(200).send("Password updated");
                }
            })
        }
    });
}