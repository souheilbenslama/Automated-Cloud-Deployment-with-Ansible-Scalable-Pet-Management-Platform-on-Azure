var Post = require("../models/Post");

var exports = module.exports = {};

exports.myPosts = function(req,res,next){
    Post.find({user:req.user._id}).populate('user').exec(function(error,posts){
        if(error){
            return next(error);
        }else{
            res.send(posts);
        }
    });
}

exports.addPost = function(req,res,next){
    if(req.file) {
        req.body.photo = "uploads/" + req.file.filename;
    }
    req.body.user=req.user._id;
    Post.create(req.body,function(error,post){ 
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
                req.body.photo="uploads/" + req.file.filename
            } else {
                req.body.photo = defaultPhoto
            }
            Pet.findOneAndUpdate({_id:req.params.postId},{$set:req.body},function(err){
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
    Post.findById(req.params.postId).exec(function(error,post){
        if(error){
            return next(error);
        }else{
            Post.findOneAndRemove({ _id: req.params.postId }, function(err,post) {
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

