var Pet = require("../models/Pet");
var Appointment = require("../models/Appointment");
var Bath = require("../models/Bath");
var Food = require("../models/Food");
var Treatment = require("../models/Treatment");
var Vaccine = require("../models/Vaccine");
var Weight = require("../models/Weight");
const { response } = require("express");
var exports = module.exports = {};

exports.findAppointment = function(req,res,next){
    Appointment.findById(req.params.appointmentId).populate("vet").exec(function(err,appointment){
        if(err){
            return next(err);
        }else{
            res.send(appointment);
        }
    });
}
exports.addAppointment = function(req,res,next){
    Appointment.create(req.body,function(error,appointment){ 
        if(error){
            return next(error);
        }else{
            Pet.findById(req.params.petId).exec(function(error,pet){
                if(error){
                    return next(error);
                }else{
                    Pet.findOneAndUpdate({_id:pet._id},{$push:{
                        appointment:appointment._id}},function(err){
                            if(err){
                                next(err);
                            }else{
                                res.status(200).send("appointment added");
                            }
                    });
                }
            });
        }
    }); 
}
exports.showAppointments = function(req,res,next){
    Pet.findById(req.params.petId).populate("appointment").exec(function(error,pet){
        if(error){
            return next(error);
        }else{
            res.send(pet.appointment);
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
    Pet.findOneAndUpdate({_id: req.params.petId},{$pull: {appointment: req.params.appointmentId}}, function (err) {
        if(err){
            return next(err);
        }else{
            Appointment.remove({ _id: req.params.appointmentId }, function(err) {
                if (err) {
                    next(err);
                }
                else {
                    res.status(200).send("appointment deleted");
                }
            });
        }
    });
}

exports.findVaccine = function(req,res,next){
    Vaccine.findById(req.params.vaccineId).populate("vet").exec(function(err,vaccine){
        if(err){
            return next(err);
        }else{
            res.send(vaccine);
        }
    });
}
exports.addVaccine = function(req,res,next){
    Vaccine.create(req.body,function(error,vaccine){ 
        if(error){
            return next(error);
        }else{
            Pet.findById(req.params.petId).exec(function(error,pet){
                if(error){
                    return next(error);
                }else{
                    Pet.findOneAndUpdate({_id:pet._id},{$push:{
                        vaccine:vaccine._id}},function(err){
                            if(err){
                                next(err);
                            }else{
                                res.status(200).send("vaccine added");
                            }
                    });
                }
            });
        }
    });
}
exports.showVaccines = function(req,res,next){
    Pet.findById(req.params.petId).populate("vaccine").exec(function(error,pet){
        if(error){
            return next(error);
        }else{
            res.send(pet.vaccine);
        }
    });
}
exports.updateVaccine = function(req,res,next){
    Vaccine.findById(req.params.vaccineId).exec(function(error,vaccine){
        if(error){
            return next(error);
        }else{
            Vaccine.findOneAndUpdate({_id:req.params.vaccineId},{$set:{
                name:req.body.name,
                date:req.body.date,
                description:req.body.description,
                vet:req.body.vet
                }},function(err,vaccine){
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
    Pet.findOneAndUpdate({_id: req.params.petId},{$pull: {vaccine: req.params.vaccineId}}, function (err) {
        if(err){
            return next(err);
        }else{
            Vaccine.remove({ _id: req.params.vaccineId }, function(err) {
                if (err) {
                    next(err);
                }
                else {
                    res.status(200).send("vaccine deleted");
                }
            });
        }
    });
}

exports.findFood = function(req,res,next){
    Food.findById(req.params.foodId).exec(function(err,food){
        if(err){
            return next(err);
        }else{
            res.send(food);
        }
    });
}
exports.addFood = function(req,res,next){
    Food.create(req.body,function(error,food){ 
        if(error){
            return next(error);
        }else{
            Pet.findById(req.params.petId).exec(function(error,pet){
                if(error){
                    return next(error);
                }else{
                    Pet.findOneAndUpdate({_id:pet._id},{$push:{
                        food:food._id}},function(err){
                            if(err){
                                next(err);
                            }else{
                                res.status(200).send("food added");
                            }
                    });
                }
            });
        }
    });
}
exports.showFood = function(req,res,next){
    Pet.findById(req.params.petId).populate("food").exec(function(error,pet){
        if(error){
            return next(error);
        }else{
            res.send(pet.food);
        }
    });
}
exports.updateFood = function(req,res,next){
    Food.findById(req.params.foodId).exec(function(error,food){
        if(error){
            return next(error);
        }else{
            Food.findOneAndUpdate({_id:req.params.foodId},{$set:{
                name:req.body.name,
                date:req.body.date,
                quantity:req.body.quantity
                }},function(err,food){
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
    Pet.findOneAndUpdate({_id: req.params.petId},{$pull: {food: req.params.foodId}}, function (err) {
        if(err){
            return next(err);
        }else{
            Food.remove({ _id: req.params.foodId }, function(err) {
                if (err) {
                    next(err);
                }
                else {
                    res.status(200).send("food deleted");
                }
            });
        }
    });
}

exports.findBath = function(req,res,next){
    Bath.find({_id:req.params.bathId}).exec(function(err,bath){
        if(err){
            return next(err);
        }else{
            res.send(bath);
        }
    });
}
exports.addBath = function(req,res,next){
    Bath.create(req.body,function(error,bath){ 
        if(error){
            return next(error);
        }else{
            Pet.findById(req.params.petId).exec(function(error,pet){
                if(error){
                    return next(error);
                }else{
                    Pet.findOneAndUpdate({_id:pet._id},{$push:{
                        bath:bath._id}},function(err){
                            if(err){
                                next(err);
                            }else{
                                res.status(200).send("bath added");
                            }
                    });
                }
            });
        }
    }); 
}
exports.showBaths = function(req,res,next){
    Pet.findById(req.params.petId).populate("bath").exec(function(error,pet){
        if(error){
            return next(error);
        }else{
            res.send(pet.bath);
        }
    });
}
exports.updateBath = function(req,res,next){
    Bath.findById(req.params.bathId).exec(function(error,bath){
        if(error){
            return next(error);
        }else{
            Bath.findOneAndUpdate({_id:bath._id},{$set:{
                date:req.body.date,
                description:req.body.description
                }},function(err,bath){
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
    Pet.findOneAndUpdate({_id: req.params.petId},{$pull: {bath: req.params.bathId}}, function (err) {
        if(err){
            return next(err);
        }else{
            Bath.remove({ _id: req.params.bathId }, function(err) {
                if (err) {
                    next(err);
                }
                else {
                    res.status(200).send("bath deleted");
                }
            });
        }
    });
}

exports.findWeight = function(req,res,next){
    Weight.findById(req.params.weightId).exec(function(err,weight){
        if(err){
            return next(err);
        }else{
            res.send(weight);
        }
    });
}
exports.addWeight = function(req,res,next){
    Weight.create(req.body,function(error,weight){ 
        if(error){
            return next(error);
        }else{
            Pet.findById(req.params.petId).exec(function(error,pet){
                if(error){
                    return next(error);
                }else{
                    Pet.findOneAndUpdate({_id:pet._id},{$push:{
                        weight:weight._id}},function(err){
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
exports.showWeights = function(req,res,next){
    Pet.findById(req.params.petId).populate("weight").exec(function(error,pet){
        if(error){
            return next(error);
        }else{
            res.send(pet.weight);
        }
    });
}
exports.updateWeight = function(req,res,next){
    Weight.findById(req.params.weightId).exec(function(error,bath){
        if(error){
            return next(error);
        }else{
            Weight.findOneAndUpdate({_id:weight._id},{$set:{
                date:req.body.date,
                description:req.body.description
                }},function(err,weight){
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
    Pet.findOneAndUpdate({_id: req.params.petId},{$pull: {weight: req.params.weightId}}, function (err) {
        if(err){
            return next(err);
        }else{
            Bath.remove({ _id: req.params.weightId }, function(err) {
                if (err) {
                    next(err);
                }
                else {
                    res.status(200).send("weight deleted");
                }
            });
        }
    });
}

exports.findTreatment = function(req,res,next){
    Treatment.findById(req.params.treatmentId).exec(function(err,treatment){
        if(err){
            return next(err);
        }else{
            res.send(treatment);
        }
    });
}
exports.addTreatment = function(req,res,next){
    Treatment.create(req.body,function(error,treatment){ 
        if(error){
            return next(error);
        }else{
            Pet.findById(req.params.petId).exec(function(error,pet){
                if(error){
                    return next(error);
                }else{
                    Pet.findOneAndUpdate({_id:pet._id},{$push:{
                        treatment:treatment._id}},function(err){
                            if(err){
                                next(err);
                            }else{
                                res.status(200).send("treatment added");
                            }
                    });
                }
            });
        }
    });
}
exports.showTreatments = function(req,res,next){
    Pet.findById(req.params.petId).populate("treatment").exec(function(error,pet){
        if(error){
            return next(error);
        }else{
            res.send(pet.treatment);
        }
    });
}
exports.updateTreatment = function(req,res,next){
    Treatment.findById(req.params.treatmentId).exec(function(error,treatment){
        if(error){
            return next(error);
        }else{
            Treatment.findOneAndUpdate({_id:req.params.treatmentId},{$set:{
                type:req.body.type,
                date:req.body.date,
                description:req.body.description
                }},function(err,treatment){
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
    Pet.findOneAndUpdate({_id: req.params.petId},{$pull: {treatment: req.params.treatmentId}}, function (err) {
        if(err){
            return next(err);
        }else{
            Treatment.remove({ _id: req.params.treatmentId }, function(err) {
                if (err) {
                    next(err);
                }
                else {
                    res.status(200).send("treatment deleted");
                }
            });
        }
    });
}