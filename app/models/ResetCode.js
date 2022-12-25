var mongoose = require("mongoose");

var CodeSchema = new mongoose.Schema({
    value:{type:String,required:true,trim:true,unique:true},
    owner:{type:String,required:true},
    expiredAt: {type: Date,default: Date.now, expires: '500000'}
}); 
var ResetCode = mongoose.model("ResetCode",CodeSchema);

module.exports = ResetCode ;