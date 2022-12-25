var User = require("../models/User");
var ResetCode = require("../models/ResetCode");
var nodemailer = require("nodemailer");
require("dotenv").config();
var exports = module.exports = {};
var smtpTransport = require("nodemailer-smtp-transport");
var jwt = require("jsonwebtoken");
var Mailgun = require('mailgun-js');



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
    if(req.body.password !== req.body.confirmPassword ){
        var err = new Error("Passwords do not match");
        return res.status(400).send(err.message);
    }
    if(req.body.password.length<4 ){
        var error = new Error("Passwords too short! Minimum length is 4");
        return res.status(400).send(error.message);
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
                        req.body.avatar = (req.file)? req.file.filename:"male.png";
                    }else if(req.body.gender == "Female"){
                        req.body.avatar = (req.file)? + req.file.filename:"female.png";
                    }else{
                        req.body.avatar = (req.file)? + req.file.filename:"default.jpg";
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
    console.log("hello world") ;
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            err.message = "user not found";
            return next(err);
        }else if(!user){
            
                var error = new Error("mail not found!");
                return res.status(401).send(error.message);
        }else{
            

//We pass the api_key and domain to the wrapper, or it won't be able to identify + send emails

var mailgun = new Mailgun({apiKey: "548bd0d958e911ef9ab0be9d6c8fa81e-24e2ac64-94e69bcd", domain: "sandbox4e4467e881824450bcb2ed4ff368fa49.mailgun.org"});
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

var data = {
    //Specify email data
      from: "petsi760@gmail.com",
    //The email to contact
      to: req.body.email,
    //Subject and text data  
    subject: "Verification Code",
    text: "Your code is "+code
    }
    
    //Invokes the method to send emails given the above data with the helper library
    mailgun.messages().send(data, function (err, body) {
        //If there is an error, render the error page
        if (err) {
            console.log(err) ;
            err.message="mail not sent";
                    return next(err);
        }
        //Else we can greet    and leave
        else {
            //Here "submitted.jade" is the view file for this landing page 
            //We pass the variable "email" from the url parameter in an object rendered by Jade
            res.send("code sent");
        }
    });
           /* var transporter = nodemailer.createTransport(smtpTransport({
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
            });*/
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