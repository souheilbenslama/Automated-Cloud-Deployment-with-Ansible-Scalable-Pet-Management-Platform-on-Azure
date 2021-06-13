const { token } = require("morgan");
var User = require("../models/User");
var exports = module.exports = {};

exports.profile = function(req, res, next) {
    User.findById(req.user._id).exec(function(error,user){
        if(error){
            return next(error);
        }else{
            console.log("hello");
            user.password = null;
            res.send(user);
        }
    });
}

exports.getUsers = function(req,res,next){
    User.find().exec(function(error,users){
        if(error){
            return next(error);
        }else{
            users.forEach(user => {
                user.password=null;
            });
            res.send(users);
        }
    });
}

exports.updateProfile = function(req,res,next){
    User.findById(req.user._id).exec(function(error,user){
        if(error){
            return next(error);
        }else{
            User.find({phone:req.body.phone,_id: {$ne: user._id}},function(err,users){
                if(err){
                    err.message = "phone not saved";
                    return next(err.message);
                }else if(users.length > 0){
                    return res.status(401).send("phone already exists");
                }else{
                    var defaultAvatar = user.avatar;
                    req.body.avatar = (req.file)?"uploads/" + req.file.filename:defaultAvatar;
                    User.findOneAndUpdate({_id:req.user._id},{$set:req.body},function(err){
                        if(err){
                            next(err);
                        }else{
                            user.password = null;
                            res.status(200).send(user);
                        }
                    });
                }
            });
        }
    });
}