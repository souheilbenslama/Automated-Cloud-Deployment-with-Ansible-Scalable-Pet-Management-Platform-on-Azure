var User = require("../models/User");
var exports = module.exports = {};

exports.profile = function(req, res, next) {
    User.findById(req.session.userId).exec(function(error,user){
        if(error){
            return next(error);
        }else{
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
                        res.status(200).send("profile updated");
                    }
            });
        }
    });
}