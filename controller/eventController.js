var Appointment = require("../models/Appointment");
var Bath = require("../models/Bath");
var Food = require("../models/Food");
var Treatment = require("../models/Treatment");
var Vaccine = require("../models/Vaccine");
var Weight = require("../models/Weight");
const { response } = require("express");
const Pet = require("../models/Pet");
var exports = module.exports = {};

exports.findAppointment = function(req,res,next){
    Appointment.findById(req.params.appointmentId).populate("vet").populate("pet").exec(function(err,appointment){
        if(err){
            return next(err);
        }else{
            res.send(appointment);
        }
    });
}
exports.addAppointment = function(req,res,next){
    req.body.pet = req.params.petId;
    Appointment.create(req.body,function(error,appointment){ 
        if(error){
            return next(error);
        }else{
            res.status(200).send("appointment added");
        }
    }); 
}
exports.showAppointments = function(req,res,next){
    Appointment.find({pet:req.params.petId}).populate('vet').exec(function(error,appointments){
        if(error){
            return next(error);
        }else{
            res.send(appointments);
        }
    });
}
exports.updateAppointment = function(req,res,next){
    Appointment.findById(req.params.appointmentId).exec(function(error,appointment){
        if(error){
            return next(error);
        }else{
            Appointment.findOneAndUpdate({_id:req.params.appointmentId},{$set:req.body
                },function(err,appointment){
                    if(err){
                        next(err);
                    }else{
                        res.status(200).send("appointment modified");
                    }
            });
        }
    });
}
exports.deleteAppointment = function(req,res,next){
    Appointment.remove({ _id: req.params.appointmentId }, function(err) {
        if (err) {
            next(err);
        }
        else {
            res.status(200).send("appointment deleted");
        }
    });
}

exports.findVaccine = function(req,res,next){
    Vaccine.findById(req.params.vaccineId).populate("vet").populate("pet").exec(function(err,vaccine){
        if(err){
            return next(err);
        }else{
            res.send(vaccine);
        }
    });
}
exports.addVaccine = function(req,res,next){
    req.body.pet = req.params.petId;
    Vaccine.create(req.body,function(error,vaccine){ 
        if(error){
            return next(error);
        }else{
            res.status(200).send("vaccine added");
        }
    });
}
exports.showVaccines = function(req,res,next){
    Vaccine.find({pet:req.params.petId}).populate("vet").exec(function(error,vaccines){
        if(error){
            return next(error);
        }else{
            res.send(vaccines);
        }
    });
}
exports.updateVaccine = function(req,res,next){
    Vaccine.findById(req.params.vaccineId).exec(function(error,vaccine){
        if(error){
            return next(error);
        }else{
            Vaccine.findOneAndUpdate({_id:req.params.vaccineId},{$set:req.body},function(err,vaccine){
                if(err){
                    next(err);
                }else{
                    res.status(200).send("vaccine modified");
                }
            });
        }
    });
}
exports.deleteVaccine = function(req,res,next){
    Vaccine.remove({ _id: req.params.vaccineId }, function(err) {
        if (err) {
            next(err);
        }
        else {
            res.status(200).send("vaccine deleted");
        }
    });
}

exports.findFood = function(req,res,next){
    Food.findById(req.params.foodId).populate("pet").exec(function(err,food){
        if(err){
            return next(err);
        }else{
            res.send(food);
        }
    });
}
exports.addFood = function(req,res,next){
    req.body.pet = req.params.petId;
    Food.create(req.body,function(error,food){ 
        if(error){
            return next(error);
        }else{
            res.status(200).send("food added");
        }
    });
}
exports.showFood = function(req,res,next){
    Food.find({pet:req.params.petId}).exec(function(error,food){
        if(error){
            return next(error);
        }else{
            res.send(food);
        }
    });
}
exports.updateFood = function(req,res,next){
    Food.findById(req.params.foodId).exec(function(error,food){
        if(error){
            return next(error);
        }else{
            Food.findOneAndUpdate({_id:req.params.foodId},{$set:req.body},function(err,food){
                if(err){
                    next(err);
                }else{
                    res.status(200).send("food modified");
                }
            });
        }
    });
}
exports.deleteFood = function(req,res,next){
    Food.remove({ _id: req.params.foodId }, function(err) {
        if (err) {
            next(err);
        }
        else {
            res.status(200).send("food deleted");
        }
    });
}

exports.findBath = function(req,res,next){
    Bath.find({_id:req.params.bathId}).populate("pet").exec(function(err,bath){
        if(err){
            return next(err);
        }else{
            res.send(bath);
        }
    });
}
exports.addBath = function(req,res,next){
    req.body.pet = req.params.petId;
    Bath.create(req.body,function(error,bath){ 
        if(error){
            return next(error);
        }else{
            res.status(200).send("bath added");
        }
    }); 
}
exports.showBaths = function(req,res,next){
    Bath.find({pet:req.params.petId}).exec(function(error,baths){
        if(error){
            return next(error);
        }else{
            res.send(baths);
        }
    });
}
exports.updateBath = function(req,res,next){
    Bath.findById(req.params.bathId).exec(function(error,bath){
        if(error){
            return next(error);
        }else{
            Bath.findOneAndUpdate({_id:bath._id},{$set:req.body},function(err,bath){
                if(err){
                    next(err);
                }else{
                    res.status(200).send("bath modified");
                }
            });
        }
    }); 
}
exports.deleteBath = function(req,res,next){
    Bath.remove({ _id: req.params.bathId }, function(err) {
        if (err) {
            next(err);
        }
        else {
            res.status(200).send("bath deleted");
        }
    });
}

exports.findWeight = function(req,res,next){
    Weight.findById(req.params.weightId).populate("pet").exec(function(err,weight){
        if(err){
            return next(err);
        }else{
            res.send(weight);
        }
    });
}
exports.addWeight = function(req,res,next){
    req.body.pet = req.params.petId;
    Weight.create(req.body,function(error,weight){ 
        if(error){
            error.message="wrong data! weight can't be created!";
            return next(error.message);
        }else{

            Pet.findById(req.params.petId).exec(function(error){
                if(error){
                    error.message ="pet not found";
                    return next(error.message);
                }else{
                    var date = new Date();
                    console.log(Date(date.setHours( 0 )*1000));
                    Weight.remove({ createdAt:{ $gte:date.setHours( 0,0,0,0 ), $lte: date } }, function(err) {
                        if (err) {
                            next(err);
                        }
                        else {
                            Pet.findOneAndUpdate({_id:req.params.petId},{$set:{
                                weight:weight.weight,
                            }},function(err){
                                if(err){
                                    next(err);
                                }else{
                                    res.status(200).send("weight added");
                                }
                            });
                        }
                    });
                }
            }); 
        }
    });
}
exports.showWeights = function(req,res,next){
    Weight.find({pet:req.params.petId}).exec(function(error,weights){
        if(error){
            return next(error);
        }else{
            res.send(weights);
        }
    });
}
exports.updateWeight = function(req,res,next){
    Weight.findById(req.params.weightId).exec(function(error,bath){
        if(error){
            return next(error);
        }else{
            Weight.findOneAndUpdate({_id:weight._id},{$set:req.body},function(err,weight){
                if(err){
                    next(err);
                }else{
                    res.status(200).send("weight modified");
                }
            });
        }
    });
}
exports.deleteWeight = function(req,res,next){
    Weight.remove({ _id: req.params.weightId }, function(err) {
        if (err) {
            next(err);
        }
        else {
            res.status(200).send("weight deleted");
        }
    });
}

exports.findTreatment = function(req,res,next){
    Treatment.findById(req.params.treatmentId).populate("pet").exec(function(err,treatment){
        if(err){
            return next(err);
        }else{
            res.send(treatment);
        }
    });
}
exports.addTreatment = function(req,res,next){
    req.body.pet = req.params.petId;
    Treatment.create(req.body,function(error,treatment){ 
        if(error){
            return next(error);
        }else{
            res.status(200).send("treatment added");
        }
    });
}
exports.showTreatments = function(req,res,next){
    Treatment.find({pet:req.params.petId}).exec(function(error,treatments){
        if(error){
            return next(error);
        }else{
            res.send(treatments);
        }
    });
}
exports.updateTreatment = function(req,res,next){
    Treatment.findById(req.params.treatmentId).exec(function(error,treatment){
        if(error){
            return next(error);
        }else{
            Treatment.findOneAndUpdate({_id:req.params.treatmentId},{$set:req.body},function(err,treatment){
                if(err){
                    next(err);
                }else{
                    res.status(200).send("treatment modified");
                }
            });
        }
    });
}
exports.deleteTreatment = function(req,res,next){
    Treatment.remove({ _id: req.params.treatmentId }, function(err) {
        if (err) {
            next(err);
        }
        else {
            res.status(200).send("treatment deleted");
        }
    });
}
