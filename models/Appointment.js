var mongoose = require("mongoose");

var AppointmentSchema = new mongoose.Schema({
    date:{type:Date,required:true},
    lieu:{type:String},
    rapport:{type:String},
    pet:{type:String,required:true},
    vet:{type:String,required:true}
});

var Appointment = mongoose.model("Appointment",AppointmentSchema);

module.exports = Appointment ;