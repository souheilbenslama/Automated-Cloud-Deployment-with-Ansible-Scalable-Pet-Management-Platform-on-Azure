var mongoose = require("mongoose");

var VaccineSchema = new mongoose.Schema({
    name:{type:String,required:true},
    date:{type:Date,required:true},
    description:{type:String},
    pet:{type:String,required:true},
    vet:{type:String,required:true},
});

var Vaccine = mongoose.model("Vaccine",VaccineSchema);

module.exports = Vaccine ;