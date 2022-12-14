var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

var UserSchema = new mongoose.Schema({
    name:{type:String,required:true,trim:true},
    surname:{type:String,required:true,trim:true},
    email:{type:String,required:true,unique:true,trim:true},
    password:{type:String,required:true,trim:true},
    avatar:{type: String},
    adress:{type:String,trim:true},
    phone:{type:String,required:true,unique:true,trim:true},
    birthday:{type:Date,required:true,trim:true},
    gender:{type:String},
    role:{type:String,required:true}
},
{timestamps:true});

UserSchema.statics.authenticate = function(email,password,callback){
    User.findOne({email:email}).exec(function(error,user){
        if(error){
            return callback(error);
        }else if(!user){
            var err=new Error("User not found!");
            err.status=401;
            return callback(err);
        }
        bcrypt.compare(password,user.password,function(error,result){
            if(result){
                return callback(null,user);
            }else{
                return callback();
            }
        });
    });
}

UserSchema.methods.generateToken = function () {
    return jwt.sign({_id:this._id},"petsiKey");
}

UserSchema.pre("save",function(next){
    var user = this;
    bcrypt.hash(user.password,10,function(err,hash){
        if(err){
            return next(err);
        }
        user.password=hash;
        next();
    });
});
var User = mongoose.model("User",UserSchema);

module.exports = User ;