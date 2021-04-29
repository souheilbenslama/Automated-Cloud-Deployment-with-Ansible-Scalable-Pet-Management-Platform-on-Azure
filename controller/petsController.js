var Pet = require("../models/Pet");
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
    var petData = {
        name:req.body.name,
        photo:(req.file)?"uploads/" + req.file.filename:"images/avatar.jpg",
        breed:req.body.breed,
        birthday:req.body.birthday,
        sex:req.body.sex,
        owner:req.user._id
    };
    var weightData={
        weight:req.body.weight,
        date:Date()
    }
    console.log(weightData);
    Pet.create(petData,function(error,pet){ 
        if(error){
            return next(error);
        }else{
            Weight.create(weightData,function(error,weight){ 
                if(error){
                    return next(error);
                }else{
                    Pet.findById(pet._id).exec(function(error,pet){
                        if(error){
                            return next(error);
                        }else{
                            Pet.findOneAndUpdate({_id:pet._id},{$push:{
                                weight:weight._id}},function(err){
                                    if(err){
                                        next(err);
                                    }
                            });
                        }
                    });
                }
            });
            res.status(200).send("pet added");
        }
    }); 
}

exports.petProfile = function(req,res,next){
    Pet.findById(req.params.petId)
        .populate("bath")
        .populate("food")
        .populate("appointment")
        .populate("vaccine")
        .populate("treatment")
        .populate("owner")
        .exec(function(err,pet){
            if(err){
                return next(err);
            }else{
                res.send(pet);
            }
        });
}

exports.updatePetProfile = function(req,res,next){
    Pet.findById(req.params.petId).exec(function(error,pet){
        if(error){
            return next(error);
        }else{
            var defaultPhoto = pet.photo;
            Pet.findOneAndUpdate({_id:req.params.petId},{$set:{
                name:req.body.name,
                breed:req.body.breed,
                weight:req.body.weight,
                photo:(req.file)?"uploads/" + req.file.filename:defaultPhoto,
                birthday:req.body.birthday,
                sex:req.body.sex
                }},function(err,pet){
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
    Pet.remove({ _id: req.params.petId }, function(err) {
        if (err) {
            next(err);
        }
        else {
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

exports.sold = function(req,res,next){
    Pet.findById(req.params.petId).exec(function(error,pet){
        if(error){
            return next(error);
        }else{
            Pet.findOneAndUpdate({_id:req.params.petId},{$set:{
                owner:req.user._id
                }},function(err,pet){
                    if(err){
                        next(err);
                    }else{
                        res.status(200).send("pet sold");
                    }
            });
        }
    });
}
