var Pet = require("../models/Pet");
var Appointment = require("../models/Appointment");
var Bath = require("../models/Bath");
var Food = require("../models/Food");
var Treatment = require("../models/Treatment");
var Vaccine = require("../models/Vaccine");
var Weight = require("../models/Weight");
var exports = module.exports = {};

exports.addAppointment_get = function(req,res,next){
    Pet.findById(req.params.petId).exec(function(err,pet){
        if(err){
            return next(err);
        }else{
            res.send(pet);
        }
    });
}
exports.addAppointment_post = function(req,res,next){
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
                                res.redirect("/profile/petProfile/"+req.params.petId);
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
            res.send(pet);
        }
    });
}
exports.updateAppointment_get = function(req,res,next){
    Appointment.findById(req.params.appointmentId).exec(function(error,appointment){
        if(error){
            return next(error);
        }else{
            res.send({appointment:appointment,petId:req.params.petId});
        }
    });
}
exports.updateAppointment_post = function(req,res,next){
    Appointment.findById(req.params.appointmentId).exec(function(error,appointment){
        if(error){
            return next(error);
        }else{
            Appointment.findOneAndUpdate({_id:req.params.appointmentId},{$set:req.body
                },function(err,appointment){
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

exports.addVaccine_get = function(req,res,next){
    Pet.findById(req.params.petId).exec(function(err,pet){
        if(err){
            return next(err);
        }else{
            res.send(pet);
        }
    });
}
exports.addVaccine_post = function(req,res,next){
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
                                res.redirect("/profile/petProfile/"+pet._id);
                            }
                    });
                }
            });
        }
    });
    res.redirect("/profile/petProfile/"+req.params.petId);
}
exports.showVaccines = function(req,res,next){
    Pet.findById(req.params.petId).populate("vaccine").exec(function(error,pet){
        if(error){
            return next(error);
        }else{
            res.send(pet);
        }
    });
}
exports.updateVaccine_get = function(req,res,next){
    Vaccine.findById(req.params.vaccineId).exec(function(error,vaccine){
        if(error){
            return next(error);
        }else{
            res.send({vaccine:vaccine,petId:req.params.petId});
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

exports.addFood_get = function(req,res,next){
    Pet.findById(req.params.petId).exec(function(err,pet){
        if(err){
            return next(err);
        }else{
            res.send(pet);
        }
    });
}
exports.addFood_post = function(req,res,next){
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
                                res.redirect("/profile/petProfile/"+pet._id);
                            }
                    });
                }
            });
        }
    });
    res.redirect("/profile/petProfile/"+req.params.petId);
}
exports.showFood = function(req,res,next){
    Pet.findById(req.params.petId).populate("food").exec(function(error,pet){
        if(error){
            return next(error);
        }else{
            res.send(pet);
        }
    });
}
exports.updateFood_get = function(req,res,next){
    Food.findById(req.params.foodId).exec(function(error,food){
        if(error){
            return next(error);
        }else{
            res.send({food:food,petId:req.params.petId});
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
                quantity:req.body.quantity
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

exports.addBath_get = function(req,res,next){
    Pet.findById(req.params.petId).exec(function(err,pet){
        if(err){
            return next(err);
        }else{
            res.send(pet);
        }
    });
}
exports.addBath_post = function(req,res,next){
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
                                res.redirect("/profile/petProfile/"+pet._id);
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
            res.send(pet);
        }
    });
}
exports.updateBath_get = function(req,res,next){
    Bath.findById(req.params.bathId).exec(function(error,bath){
        if(error){
            return next(error);
        }else{
            res.send({bath:bath,petId:req.params.petId});
        }
    });
}
exports.updateBath_post = function(req,res,next){
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

exports.addWeight_get = function(req,res,next){
    Pet.findById(req.params.petId).exec(function(err,pet){
        if(err){
            return next(err);
        }else{
            res.send(pet);
        }
    });
}
exports.addWeight_post = function(req,res,next){
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
                                res.redirect("/profile/petProfile/"+pet._id);
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
            res.send(pet);
        }
    });
}
exports.updateWeight_get = function(req,res,next){
    Weight.findById(req.params.weightId).exec(function(error,weight){
        if(error){
            return next(error);
        }else{
            res.send({bath:weight,petId:req.params.petId});
        }
    });
}
exports.updateWeight_post = function(req,res,next){
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
                        res.redirect("/profile/petProfile/"+req.params.petId);
                    }
            });
        }
    });
}
exports.deleteWeight = function(req,res,next){
    Bath.remove({ _id: req.params.weightId }, function(err) {
        if (err) {
            next(err);
        }
        else {
            res.redirect("/profile/petProfile/"+req.params.petId);
        }
    });
}

exports.addTreatment_get = function(req,res,next){
    Pet.findById(req.params.petId).exec(function(err,pet){
        if(err){
            return next(err);
        }else{
            res.send(pet);
        }
    });
}
exports.addTreatment_post = function(req,res,next){
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
                                res.redirect("/profile/petProfile/"+pet._id);
                            }
                    });
                }
            });
        }
    });
    res.redirect("/profile/petProfile/"+req.params.petId);
}
exports.showTreatments = function(req,res,next){
    Pet.findById(req.params.petId).populate("treatment").exec(function(error,pet){
        if(error){
            return next(error);
        }else{
            res.send(pet);
        }
    });
}
exports.updateTreatment_get = function(req,res,next){
    Treatment.findById(req.params.appointmentId).exec(function(error,treatment){
        if(error){
            return next(error);
        }else{
            res.send({treatment:treatment,petId:req.params.petId});
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
                description:req.body.description
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