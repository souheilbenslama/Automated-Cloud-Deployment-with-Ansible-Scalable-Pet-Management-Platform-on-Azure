const User = require("../models/User");
const Follow = require("../models/Follow");

var exports = module.exports = {};

exports.visitUser = function(req,res,next){
    User.findById(req.params.userId).exec(function(err,user){
        if(err){
            err.message = "user not found";
            return next(err.message);
        }else{
            user.password = null;
            res.send(user);
        }
    });
}

exports.follow = function(req,res,next){
    req.body.followed = req.params.userId;
    req.body.follower = req.user._id;
    Follow.create(req.body,function(error){ 
        if(error){
            error.message="wrong data! user can't be followed!";
            return next(error.message);
        }else{
            res.send("follow request sent!");
        }
    }); 
}

exports.followers = function(req,res,next){
    Follow.find({followed:req.user._id,confirm:true}).populate("follower","name surname avatar").exec(function(error,followers){
        if(error){
            error.message="followers not found!";
            return next(error.message);
        }else{
            res.send(followers);
        }
    });
}

exports.follows = function(req,res,next){
    Follow.find({follower:req.user._id,confirm:true}).populate("followed","name surname avatar").exec(function(error,follows){
        if(error){
            error.message="follows not found!";
            return next(error.message);
        }else{
            res.send(follows);
        }
    });
}

exports.notFollows = function(req,res,next){
    var notFollows = [];
    User.find().exec(function(err,users){
        if(err){
            return next(err);
        }else{
            var notFollows = [];
            Follow.find({follower:req.user._id}).exec(function(error,follows){
                if(error){
                    error.message="follows not found!";
                    return next(error.message);
                }else{
                    var arr = follows.map(function(obj){return obj.followed.toString()});
                    for(var u of users ){
                        if(arr.indexOf(u._id.toString())<0 && req.user._id != u._id ){
                            u.password=null;
                            notFollows.push(u);
                        }
                    }
                    res.send(notFollows);
                }
            });
        }
    });
}

exports.requestsOnHold = function(req,res,next){
    Follow.find({follower:req.user._id,confirm:false}).populate("followed","name surname avatar").exec(function(error,follows){
        if(error){
            error.message="follows not found!";
            return next(error.message);
        }else{
            res.send(follows);
        }
    });
}

exports.requests = function(req,res,next){
    Follow.find({followed:req.user._id,confirm:false}).populate("follower","name surname avatar").exec(function(error,follows){
        if(error){
            error.message="follows not found!";
            return next(error.message);
        }else{
            res.send(follows);
        }
    });
}

exports.cancelFollow = function(req,res,next){
    Follow.remove({_id:req.params.followId},function(error){
        if(error){
            error.message="user not found!";
            return next(error.message);
        }else{
                res.status(200).send("request canceled");
        }
    });
}

exports.confirmFollow = function(req,res,next){
    Follow.findById(req.params.followId).exec(function(error,follow){
        if(error){
            error.message="confirmation error!";
            return next(error.message);
        }else{
            Follow.findOneAndUpdate({_id:follow._id},{$set:{
                confirm:true
                }},function(err){
                    if(err){
                        next(err);
                    }else{
                        res.send("follow confirmed");
                    }
                }
            );
        }
    });
}
