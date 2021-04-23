var jwt = require("jsonwebtoken");

function loggedOut(req,res,next){
    const token = req.headers["authorization"];
    if(typeof token !== "undefined"){
        return res.status(403).send("not authorized");
    }else{
        return next(); 
    }
}

function loggedIn(req,res,next){
    const token = req.headers["authorization"];
    if(typeof token !== "undefined"){
        req.user = jwt.verify(token,"petsiKey");
        next();
    }else{
        return res.status(403).send("not authorized");
    }
}

module.exports.loggedOut = loggedOut;
module.exports.loggedIn = loggedIn;