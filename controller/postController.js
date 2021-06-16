var Post = require("../models/Post");
var Comment = require("../models/Comment");
var Follow = require("../models/Follow");
const User = require("../models/User");

var exports = module.exports = {};

exports.myPosts = function(req,res,next){
    Post.find({user:req.user._id}).populate("user","name surname avatar").exec(function(error,posts){
        if(error){
            return next(error);
        }else{
            res.send(posts);
        }
    });
}

exports.getPosts = function(req,res,next){
    Post.find({user:req.params.receiverId}).populate("user","name surname avatar").exec(function(error,posts){
        if(error){
            return next(error);
        }else{
            res.send(posts);
        }
    });
}

exports.getFollowPosts = function(req,res,next){
    Follow.find({follower:req.user._id,confirm:true}).exec(function(error,follows){
        if(error){
            error.message="follows not found!";
            return next(error.message);
        }else{
            Post.find().populate("user","name surname avatar").exec(function(error,posts){
                if(error){
                    return next(error);
                }else{
                    var allPosts = [];
                    var arr = follows.map(function(obj){return obj.followed.toString()});
                    for(var p of posts ){
                        if(arr.indexOf(p.user._id.toString())>=0 ){
                            allPosts.push(p);
                        }
                    }
                    allPosts.sort(function(a,b){return b.createdAt-a.createdAt;});
                    return res.send(allPosts); 
                }
            }); 
        }
    });
}

exports.addPost = function(req,res,next){
    if(req.file) {
        req.body.photo =   req.file.filename;
    }
    req.body.user=req.user._id;
    Post.create(req.body,function(error){ 
        if(error){
            return next(error);
        }else{
            return res.status(200).send("Post added");
        }
    });
}

exports.updatePost = function(req,res,next){
    Post.findById(req.params.postId).exec(function(error,post){
        if(error){
            return next(error);
        }else{
            var defaultPhoto = post.photo;
            if(req.file) {
                req.body.photo= req.file.filename
            } else {
                req.body.photo = defaultPhoto
            }
            Post.findOneAndUpdate({_id:req.params.postId},{$set:req.body},function(err){
                if(err){
                    next(err);
                }else{
                    res.status(200).send("post updated");
                }
            });
        }
    });
}

exports.deletePost = function(req,res,next){
    Post.remove({ _id: req.params.postId }, function(err) {
        if (err) {
            next(err);
        }
        else {
            Comment.remove({ post: req.params.postId }, function(err) {
                if (err) {
                    next(err);
                }
                else {
                    res.status(200).send("post deleted");
                }
            });
        }
    });
}