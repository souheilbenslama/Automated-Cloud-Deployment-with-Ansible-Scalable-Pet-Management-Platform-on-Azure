var mongoose = require("mongoose");
const Pet = require("./Pet");

var BathSchema = new mongoose.Schema({
    date:{type:Date,required:true},
    description:{type:String},
    done:{type:Boolean,default:false}
},
{timestamps:true});

var Bath = mongoose.model("Bath",BathSchema);

module.exports = Bath ;