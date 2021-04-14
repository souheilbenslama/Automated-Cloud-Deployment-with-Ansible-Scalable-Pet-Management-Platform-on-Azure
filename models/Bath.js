var mongoose = require("mongoose");

var BathSchema = new mongoose.Schema({
    date:{type:Date,required:true},
    description:{type:String},
    pet:{type:String,required:true}
});

var Bath = mongoose.model("Bath",BathSchema);

module.exports = Bath ;