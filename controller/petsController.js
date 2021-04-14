const { render } = require("jade");
var Pet = require("../models/Pet");
var User = require("../models/User");
var exports = module.exports = {};

exports.myPets = function(req,res,next){
    Pet.find({owner:req.session.userId},function(error,result){
        if(error){
            return next(error);
        }else{
            res.render("myPets",{pets:result});
        }
    });
}

exports.addPet_post = function(req,res,next){
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
    var pet = Pet.findById(req.params.petId);
    console.log("pet: "+pet);
    /* Pet.findById(req.params.petId).exec(function(error,pet){
        if(error){
            return next(error);
        }else{
            User.findById(pet.owner).exec(function(error,user){
                if(error){
                    return next(error);
                }else{
                    res.render("petProfile",{pet:pet,owner:user});
                }
            });
        }
    });  */
}

exports.updatePetProfile_get = function(req,res,next){
    Pet.findById(req.params.petId).exec(function(error,pet){
        if(error){
            return next(error);
        }else{
            console.log(pet.birthday.toISOString().split("T")[0]);
            res.render("updatePetProfile",pet);
        }
    });
}

exports.updatePetProfile_post = function(req,res,next){
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