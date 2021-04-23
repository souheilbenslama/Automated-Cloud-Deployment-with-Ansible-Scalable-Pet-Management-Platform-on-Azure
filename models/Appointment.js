var mongoose = require("mongoose");

var AppointmentSchema = new mongoose.Schema({
    date:{type:Date,required:true},
    lieu:{type:String},
    rapport:{type:String},
    //pet:{type:Schema.Types.ObjectId,ref:"Pet",required:true},
    done:{type:Boolean,default:false},
    vet:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}
},
{timestamps:true});

var Appointment = mongoose.model("Appointment",AppointmentSchema);

module.exports = Appointment ;