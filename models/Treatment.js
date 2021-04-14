var mongoose = require("mongoose");

var TreatmentSchema = new mongoose.Schema({
    type:{type:String,required:true},
    date:{type:Date,required:true},
    description:{type:String},
    pet:{type:String,required:true}
});

var Treatment = mongoose.model("Treatment",TreatmentSchema);

module.exports = Treatment ;