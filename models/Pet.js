var mongoose = require("mongoose");
const User = require("./User");

var PetSchema = new mongoose.Schema({
    name:{type:String,required:true,trim:true},
    photo:{type:String},
    breed:{type:String,required:true,trim:true},
    birthday:{type:Date,required:true},
    sex:{type:String,required:true},
    weight:{type: Number},
    owner:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    food:[{type:mongoose.Schema.Types.ObjectId,ref:'Food'}],
    bath:[{type:mongoose.Schema.Types.ObjectId,ref:'Bath'}],
    appointment:[{type:mongoose.Schema.Types.ObjectId,ref:'Appointment'}],
    vaccine:[{type:mongoose.Schema.Types.ObjectId,ref:'Vaccine'}],
    treatment:[{type:mongoose.Schema.Types.ObjectId,ref:'Treatment'}]
    //owner:{type:String,required:true}
});

var Pet = mongoose.model("Pet",PetSchema);

module.exports = Pet ;