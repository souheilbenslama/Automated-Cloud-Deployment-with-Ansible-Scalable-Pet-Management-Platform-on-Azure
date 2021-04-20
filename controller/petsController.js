var Pet = require("../models/Pet");
var exports = module.exports = {};

exports.myPets = function(req,res,next){
    Pet.find({owner:req.session.userId},function(error,result){
        if(error){
            return next(error);
        }else{
            res.send({pets:result});
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
        weight:req.body.weight,
        owner:req.session.userId
    };
    Pet.create(petData,function(error,pet){ 
        if(error){
            return next(error);
        }else{
            res.redirect("/profile/petProfile/"+pet._id);
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
                        res.redirect("/profile/petProfile/"+pet._id);
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
            res.redirect("/profile/myPets");
        }
    });
}