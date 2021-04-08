var User = require("../models/User");
var exports = module.exports = {};

exports.profile = function(req, res, next) {
    User.findById(req.session.userId).exec(function(error,user){
        if(error){
            return next(error);
        }else{
            res.render("profile",user);
        }
    });
}