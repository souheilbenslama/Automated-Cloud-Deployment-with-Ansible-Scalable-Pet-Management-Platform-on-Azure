var User = require("../models/User");
var exports = module.exports = {};

exports.profile = function(req, res, next) {
    User.findById(req.session.userId).exec(function(error,user){
        if(error){
            return next(error);
        }else{
            res.render("profile",user);
        }
    });
}

exports.updateProfile_get = function(req,res,next){
    User.findById(req.session.userId).exec(function(error,user){
        if(error){
            return next(error);
        }else{
            res.render("updateProfile",user);
        }
    });
}

exports.updateProfile_post = function(req,res,next){
    User.findById(req.session.userId).exec(function(error,user){
        if(error){
            return next(error);
        }else{
            var defaultAvatar = user.avatar;
            User.findOneAndUpdate({_id:req.session.userId},{$set:{
                name:req.body.name,
                surname:req.body.surname,
                email:req.body.email,
                adress:req.body.adress,
                avatar:(req.file)?"uploads/" + req.file.filename:defaultAvatar,
                phone:req.body.phone}},function(err){
                    if(err){
                        next(err);
                    }else{
                        res.redirect("/profile");
                    }
            });
        }
    });
}