var mongoose = require("mongoose");

var AppointmentSchema = new mongoose.Schema({
    date:{type:Date,required:true},
    lieu:{type:String},
    rapport:{type:String},
    done:{type:Boolean,default:false},
    vet:{type:mongoose.Schema.Types.ObjectId,ref:"User"}
},
{timestamps:true});

var Appointment = mongoose.model("Appointment",AppointmentSchema);

module.exports = Appointment ;