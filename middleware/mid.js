function loggedOut(req,res,next){
    if(req.session && req.session.userId){
        return res.status(401).send("not authorized");
    }
    return next();
}

function loggedIn(req,res,next){
    if(req.session && req.session.userId){
        return next();
    }else{
        return res.status(401).send("not authorized");
    }
}

module.exports.loggedOut = loggedOut;
module.exports.loggedIn = loggedIn;