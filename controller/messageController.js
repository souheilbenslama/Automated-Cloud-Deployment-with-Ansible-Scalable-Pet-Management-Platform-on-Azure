var app = require("../app");
var http = require("http").Server(app);
var io = require("socket.io")(http);
var Message = require("../models/Message");
var exports = module.exports = {};

exports.getmessages = function(req,res,next){
    Message.find().or([{sender:req.user._id,receiver:req.paramas.receiverId},{sender:req.paramas.receiverId,receiver:req.user._id}],function(err, messages) {
        if(err){
            return next(err);
        }else{
            res.send(messages);
        }
    });
}

exports.getallmessages = function(req,res,next){
    console.log('hello from Messages')
    Message.find({sender:req.user._id},function(err, messages) {
        if(err){
            console.log(err)
            return next(err);
        }else{
            console.log(messages)
            res.send(messages);
        }
    });
}


exports.sendMessage = function(req,res,next){
    req.body.sender = req.user._id;
    var message = new Message(req.body);
    message.save((err,message) =>{
        if(err){
            err.message="wrong data! message can't be sent!";
            return next(err.message);
        }else{
            io.emit('message', message);
            res.send("message sent");
        }
    });
}