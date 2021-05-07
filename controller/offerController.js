const Offer = require("../models/Offer");
const Pet = require("../models/Pet");

var exports = module.exports = {};

exports.findOffer = function(req,res,next){
    Offer.findById(req.params.offerId).populate("pet").populate("buyers").exec(function(err,offer){
        if(err){
            err.message = "offer not found";
            return next(err.message);
        }else{
            res.send(offer);
        }
    });
}

exports.findPetOffer = function(req,res,next){
    Offer.find({pet:req.params.petId}).populate("pet").populate("buyers").exec(function(err,offer){
        if(err){
            err.message = "offer not found";
            return next(err.message);
        }else{
            res.send(offer);
        }
    });
}

exports.addOffer = function(req,res,next){
    req.body.pet = req.params.petId;
    Offer.create(req.body,function(error,offer){ 
        if(error){
            error.message="wrong data! offer can't be created!";
            return next(error.message);
        }else{
            res.status(200).send("offer created");
        }
    }); 
}

exports.showOffers = function(req,res,next){
    Offer.find().populate('pet').exec(function(error,offers){
        if(error){
            error.message="offers not found!"
            return next(error.message);
        }else{
            res.send(offers);
        }
    });
}

exports.showSaleOffers = function(req,res,next){
    Offer.find({type:"For Sale"}).populate('pet').exec(function(error,offers){
        if(error){
            error.message="offers not found!"
            return next(error.message);
        }else{
            res.send(offers);
        }
    });
}

exports.showAdoptionOffers = function(req,res,next){
    Offer.find({type:"For Adoption"}).populate('pet').exec(function(error,offers){
        if(error){
            error.message="offers not found!"
            return next(error.message);
        }else{
            res.send(offers);
        }
    });
}

exports.updateOffer = function(req,res,next){
    Offer.findById(req.params.offerId).exec(function(error,offer){
        if(error){
            error.message="offer not found!";
            return next(error.message);
        }else{
            Offer.findOneAndUpdate({_id:offer._id},{$set:req.body},function(err){
                if(err){
                    next(err);
                }else{
                    res.status(200).send("offer updated");
                }
            });
        }
    });
}

exports.sendOffer = function(req,res,next){
    Offer.findById(req.params.offerId,function(error,offer){
        if(error){
            error.message="offer not found!";
            return next(error.message);
        }else{
            Offer.findOneAndUpdate({_id:offer._id},{$push:{
                buyers:req.user._id
                }},function(err){
                    if(err){
                        next(err);
                    }else{
                        res.status(200).send("request sent");
                    }
                }
            );
        }
    });
}

exports.confirmOffer = function(req,res,next){
    Offer.findById(req.params.offerId).exec(function(error,offer){
        if(error){
            error.message="offer not found!";
            return next(error.message);
        }else{
            Pet.findById(offer.pet).exec(function(error,pet){
                if(error){
                    return next(error);
                }else{
                    Pet.findOneAndUpdate({_id:pet._id},{$set:{
                        owner:req.body.buyer
                        }},function(err){
                            if(err){
                                next(err);
                            }else{
                                Offer.remove({ _id: offer._id }, function(err) {
                                    if (err) {
                                        err.message="offer can't be deleted!";
                                        next(err.message);
                                    }
                                    else {
                                        res.status(200).send("pet sold");
                                    }
                                });
                            }
                        }
                    );
                }
            });
        }
    });
}

exports.deleteOffer = function(req,res,next){
    Offer.remove({ _id: req.params.offerId }, function(err) {
        if (err) {
            err.message="offer can't be deleted!";
            next(err.message);
        }
        else {
            res.status(200).send("offer deleted");
        }
    });
}