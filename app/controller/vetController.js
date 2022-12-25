var User = require("../models/User");
var exports = module.exports = {};

exports.getVets = function(req,res,next){
    User.find({role:"Veterinary"}).exec(function(error,users){
        if(error){
            return next(error);
        }else{
            users.forEach(user => {
                user.password=null;
            });
            res.send(users);
        }
    });
}