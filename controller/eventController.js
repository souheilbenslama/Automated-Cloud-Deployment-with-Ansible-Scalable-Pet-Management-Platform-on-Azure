var Pet = require("../models/Pet");
var User = require("../models/User");
var Appointment = require("../models/Appointment");
var Bath = require("../models/Bath");
var Food = require("../models/Food");
var Treatment = require("../models/Treatment");
var Vaccine = require("../models/Vaccine");
var exports = module.exports = {};

exports.addAppointment_post = function(req,res,next){
    var appointmentData = {
        date:req.body.date,
        lieu:req.body.lieu,
        rapport:req.body.rapport,
        pet:req.params.petId,
        vet:req.body.vet
    };
    Appointment.create(appointmentData,function(error,appointment){ 
        if(error){
            return next(error);
        }else{
            res.redirect("/profile/petProfile/"+req.params.petId);
        }
    }); 
}
exports.showAppointments = function(req,res,next){
    Appointment.find({pet:req.params.petId}).exec(function(error,appointment){
        if(error){
            return next(error);
        }else{
            res.render("appointments",appointments);
        }
    });
}
exports.updateAppointment_get = function(req,res,next){
    Appointment.findById(req.params.appointmentId).exec(function(error,appointment){
        if(error){
            return next(error);
        }else{
            res.render("updateAppointment",appointment);
        }
    });
}
exports.updateAppointment_post = function(req,res,next){
    Appointment.findById(req.params.appointmentId).exec(function(error,appointment){
        if(error){
            return next(error);
        }else{
            Appointment.findOneAndUpdate({_id:req.params.appointmentId},{$set:{
                date:req.body.date,
                lieu:req.body.lieu,
                rapport:req.body.rapport,
                vet:req.body.vet
                }},function(err,appointment){
                    if(err){
                        next(err);
                    }else{
                        res.redirect("/profile/petProfile/"+req.params.petId);
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
            res.redirect("/profile/petProfile/"+req.params.petId);
        }
    });
}

exports.addVaccine_post = function(req,res,next){
    var vaccineData = {
        name:req.body.name,
        date:req.body.date,
        description:req.body.description,
        pet:req.params.petId,
        vet:req.body.vet
    };
    Vaccine.create(vaccineData,function(error,vaccine){ 
        if(error){
            return next(error);
        }else{
            res.redirect("/profile/petProfile/"+req.params.petId);
        }
    }); 
}
exports.updateVaccine_get = function(req,res,next){
    Vaccine.findById(req.params.vaccineId).exec(function(error,vaccine){
        if(error){
            return next(error);
        }else{
            res.render("updateVaccine",vaccine);
        }
    });
}
exports.updateVaccine_post = function(req,res,next){
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
                        res.redirect("/profile/petProfile/"+req.params.petId);
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
            res.redirect("/profile/petProfile/"+req.params.petId);
        }
    });
}

exports.addFood_post = function(req,res,next){
    var foodData = {
        name:req.body.name,
        date:req.body.date,
        quantity:req.body.quantity,
        pet:req.params.petId
    };
    Food.create(foodData,function(error,food){ 
        if(error){
            return next(error);
        }else{
            res.redirect("/profile/petProfile/"+req.params.petId);
        }
    }); 
}
exports.updateFood_get = function(req,res,next){
    Food.findById(req.params.foodId).exec(function(error,food){
        if(error){
            return next(error);
        }else{
            res.render("updateFood",food);
        }
    });
}
exports.updateFood_post = function(req,res,next){
    Food.findById(req.params.foodId).exec(function(error,food){
        if(error){
            return next(error);
        }else{
            Food.findOneAndUpdate({_id:req.params.foodId},{$set:{
                name:req.body.name,
                date:req.body.date,
                quantity:req.body.quantity,
                pet:req.params.petId
                }},function(err,food){
                    if(err){
                        next(err);
                    }else{
                        res.redirect("/profile/petProfile/"+req.params.petId);
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
            res.redirect("/profile/petProfile/"+req.params.petId);
        }
    });
}

exports.addBath_post = function(req,res,next){
    var bathData = {
        date:req.body.date,
        description:req.body.description,
        pet:req.params.petId,
    };
    Bath.create(bathData,function(error,bath){ 
        if(error){
            return next(error);
        }else{
            res.redirect("/profile/petProfile/"+req.params.petId);
        }
    }); 
}
exports.updateBath_get = function(req,res,next){
    Bath.findById(req.params.bathId).exec(function(error,bath){
        if(error){
            return next(error);
        }else{
            res.render("updateBath",bath);
        }
    });
}
exports.updateBath_post = function(req,res,next){
    Bath.findById(req.params.bathId).exec(function(error,bath){
        if(error){
            return next(error);
        }else{
            Bath.findOneAndUpdate({_id:req.params.bathId},{$set:{
                date:req.body.date,
                description:req.body.description
                }},function(err,bath){
                    if(err){
                        next(err);
                    }else{
                        res.redirect("/profile/petProfile/"+req.params.petId);
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
            res.redirect("/profile/petProfile/"+req.params.petId);
        }
    });
}

exports.addTreatment_post = function(req,res,next){
    var treatmentData = {
        type:req.body.type,
        date:req.body.date,
        description:req.body.description,
        pet:req.params.petId
    };
    Treatment.create(treatmentData,function(error,treatment){ 
        if(error){
            return next(error);
        }else{
            res.redirect("/profile/petProfile/"+req.params.petId);
        }
    }); 
}
exports.updateTreatment_get = function(req,res,next){
    Treatment.findById(req.params.appointmentId).exec(function(error,treatment){
        if(error){
            return next(error);
        }else{
            res.render("updateTreatment",treatment);
        }
    });
}
exports.updateTreatment_post = function(req,res,next){
    Treatment.findById(req.params.treatmentId).exec(function(error,treatment){
        if(error){
            return next(error);
        }else{
            Treatment.findOneAndUpdate({_id:req.params.treatmentId},{$set:{
                type:req.body.type,
                date:req.body.date,
                description:req.body.description,
                }},function(err,treatment){
                    if(err){
                        next(err);
                    }else{
                        res.redirect("/profile/petProfile/"+req.params.petId);
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
            res.redirect("/profile/petProfile/"+req.params.petId);
        }
    });
}