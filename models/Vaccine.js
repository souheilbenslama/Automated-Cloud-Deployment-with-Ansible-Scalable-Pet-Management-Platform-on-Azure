var mongoose = require("mongoose");

var VaccineSchema = new mongoose.Schema({
    name:{type:String,required:true},
    date:{type:Date,required:true},
    description:{type:String},
    done:{type:Boolean,default:false},
    //pet:{type:String,required:true}
    vet:{type:mongoose.Schema.Types.ObjectId,ref:"Pet",required:true}
},
{timestamps:true});

var Vaccine = mongoose.model("Vaccine",VaccineSchema);

module.exports = Vaccine ;