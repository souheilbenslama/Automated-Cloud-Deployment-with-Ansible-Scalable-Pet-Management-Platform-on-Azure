var jwt = require("jsonwebtoken");
const Dossier = require("../models/Dossier");
const Follow = require("../models/Follow");
const User = require("../models/User");

function loggedOut(req,res,next){
    const token = req.headers["authorization"];
    if(typeof token !== "undefined"){
        return res.status(403).send("not authorized");
    }else{
        return next(); 
    }
}

function loggedIn(req,res,next){
    const token = req.headers["authorization"];
    if(typeof token !== "undefined"){
        req.user = jwt.verify(token,"petsiKey");
        next();
    }else{
        return res.status(403).send("not authorized");
    }
}

function vetAccess(req,res,next){
    Dossier.findById(req.params.dossierId).exec(function(err,dossier){
        if(err){
            return next(err);
        }else if(!dossier.confirm){
                return res.status(403).send("not authorized");
        }else{
            return next();
        }
    });
}

function dossierOpen(req,res,next){
    Dossier.findById(req.params.dossierId).exec(function(err,dossier){
        if(err){
            return next(err);
        }else if(dossier.status == "close"){
                return res.status(403).send("not authorized");
        }else{
            return next();
        }
    });
}

function verifyVet(req,res,next){
    User.findById(req.user._id).exec(function(err,user){
        if(err){
            return next(err);
        }else if(user.role != "Veterinary"){
                return res.status(403).send("not authorized");
        }else{
            return next();
        }
    });
}

function verifyPetOwner(req,res,next){
    User.findById(req.user._id).exec(function(err,user){
        if(err){
            return next(err);
        }else if(user.role != "Pet Owner"){
                return res.status(403).send("not authorized");
        }else{
            return next();
        }
    });
}

function verifyFollow(req,res,next){
    Follow.find({follower:req.user._id,followed:req.params.receiverId,confirm:true},function(err,follow){
        if(err){
            return next(err);
        }else if(follow.length <= 0){
            return res.status(403).send("not authorized");
        }else{
            return next();
        }
    });
}

module.exports.loggedOut = loggedOut;
module.exports.loggedIn = loggedIn;
module.exports.vetAccess = vetAccess;
module.exports.dossierOpen = dossierOpen;
module.exports.verifyVet = verifyVet;
module.exports.verifyPetOwner = verifyPetOwner;
module.exports.verifyFollow = verifyFollow;