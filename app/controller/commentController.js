var Comment = require("../models/Comment");
var exports = module.exports = {};

exports.addComment = function(req,res,next){
    req.body.commenter=req.user._id;
    req.body.post = req.params.postId;
    Comment.create(req.body,function(error){ 
        if(error){
            error.message="Wrong data! Comment can't be created!";
            return next(error.message);
        }else{
            return res.status(200).send("Comment added");
        }
    });
}

exports.getComments = function(req,res,next){
    Comment.find({post:req.params.postId}).populate('commenter').exec(function(err,comments){
        if(err){
            err.message="comments not found!";
            return next(err.message);
        }else{
            return res.send(comments);
        }
    })
}

exports.updateComment = function(req,res,next){
    Comment.findById(req.params.commentId).exec(function(error,comment){
        if(error){
            return next(error);
        }else{
            Comment.findOneAndUpdate({_id:req.params.commentId},{$set:{comment:req.body.comment}},function(err){
                if(err){
                    next(err);
                }else{
                    res.status(200).send("comment updated");
                }
            });
        }
    });
}

exports.deleteComment = function(req,res,next){
    Comment.findById(req.params.commentId).exec(function(error){
        if(error){
            return next(error);
        }else{
            Comment.findOneAndRemove({ _id: req.params.commentId }, function(err) {
                if (err) {
                    next(err);
                }
                else {
                    res.status(200).send("comment deleted");
                }
            });
        }
    });
}

