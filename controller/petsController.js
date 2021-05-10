var Pet = require("../models/Pet");
var Appointment = require("../models/Appointment");
var Bath = require("../models/Bath");
var Food = require("../models/Food");
var Treatment = require("../models/Treatment");
var Vaccine = require("../models/Vaccine");
var Weight = require("../models/Weight");
var exports = module.exports = {};

exports.myPets = function(req,res,next){
    Pet.find({owner:req.user._id},function(error,pets){
        if(error){
            return next(error);
        }else{
            res.send(pets);
        }
    });
}

exports.addPet = function(req,res,next){
    req.body.photo = (req.file)?"uploads/" + req.file.filename:"images/avatar.jpg";
    req.body.owner=req.user._id;
    Pet.create(req.body,function(error,pet){ 
        if(error){
            return next(error);
        }else{
            var weightData={
                weight:req.body.weight,
                date:Date(),
                pet:pet._id
            }
            Weight.create(weightData,function(error){ 
                if(error){
                    return next(error);
                }else{
                    res.status(200).send("pet added");
                }
            });
        }
    });
}

exports.petProfile = function(req,res,next){
    Pet.findById(req.params.petId).exec(function(err,pet){
        if(err){
            err.message="pet not found";
            return next(err.message);
        }else{
            console.log(new Date());
            Bath.find({pet:pet._id,date:{$gte:new Date()}},function(err,baths){
                if(err){
                    err.message="bath not found";
                    next(err.message);
                }else{
                    if(!baths){
                        baths = [];
                    }
                    baths.sort(function(a,b){return a.date-b.date;});
                    Food.find({pet:pet._id,date:{$gte:new Date()}},function(err,food){
                        if(err){
                            err.message="food not found";
                            next(err.message);
                        }else{
                            if(!food){
                                food = [];
                            }
                            food.sort(function(a,b){return a.date-b.date;});
                            Appointment.find({pet:pet._id,date:{$gte:new Date()}},function(err,appointments){
                                if(err){
                                    err.message="appointment not found";
                                    next(err.message);
                                }else{
                                    if(!appointments){
                                        appointments = [];
                                    }
                                    appointments.sort(function(a,b){return a.date-b.date;});
                                    Treatment.find({pet:pet._id,date:{$gte:new Date()}},function(err,treatments){
                                        if(err){
                                            err.message="treatment not found";
                                            next(err.message);
                                        }else{
                                            if(!treatments){
                                                treatments = [];
                                            }
                                            treatments.sort(function(a,b){return a.date-b.date;});
                                            Vaccine.find({pet:pet._id,date:{$gte:new Date()}},function(err,vaccines){
                                                if(err){
                                                    err.message="vaccine not found";
                                                    next(err.message);
                                                }else{
                                                    if(!vaccines){
                                                        vaccines = [];
                                                    }
                                                    vaccines.sort(function(a,b){return a.date-b.date;});
                                                    return res.send({pet:pet,bath:baths[0],food:food[0],appointment:appointments[0],Treatment:treatments[0],vaccine:vaccines[0]});
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
}

exports.updatePetProfile = function(req,res,next){
    Pet.findById(req.params.petId).exec(function(error,pet){
        if(error){
            return next(error);
        }else{
            var defaultPhoto = pet.photo;
            req.body.photo = (req.file)?"uploads/" + req.file.filename:defaultPhoto;
            Pet.findOneAndUpdate({_id:req.params.petId},{$set:req.body},function(err){
                if(err){
                    next(err);
                }else{
                    res.status(200).send("pet updated");
                    
                }
            });
        }
    });
}

exports.deletePet = function(req,res,next){
    Pet.remove({ _id: req.params.petId }, function(err,pet) {
        if (err) {
            next(err);
        }
        else {
            Treatment.remove({ pet:pet._id }, function(err) {
                if (err) {
                    next(err);
                }
            });
            Appointment.remove({ pet:pet._id }, function(err) {
                if (err) {
                    next(err);
                }
            });
            Bath.remove({ pet:pet._id }, function(err) {
                if (err) {
                    next(err);
                }
            });
            Food.remove({ pet:pet._id }, function(err) {
                if (err) {
                    next(err);
                }
            });
            Vaccine.remove({ pet:pet._id }, function(err) {
                if (err) {
                    next(err);
                }
            });
            Weight.remove({ pet:pet._id }, function(err) {
                if (err) {
                    next(err);
                }
            });
            res.status(200).send("pet deleted");
        }
    });
}

exports.updateStatus = function(req,res,next){
    Pet.findById(req.params.petId).exec(function(error){
        if(error){
            return next(error);
        }else{
            Pet.findOneAndUpdate({_id:req.params.petId},{$set:{
                status : req.body.status
                }},function(err){
                    if(err){
                        next(err);
                    }else{
                        res.status(200).send("pet put for adoption");
                    }
            });
        }
    });
}

exports.getForSale = function(req,res,next){
    Pet.find({status:"s"},function(err,pets){
        if(err){
            return next(err);
        }else{
            res.send(pets);
        }
    });
}

exports.getForAdoption = function(req,res,next){
    Pet.find({status:"a"},function(err,pets){
        if(err){
            return next(err);
        }else{
            res.send(pets);
        }
    });
}