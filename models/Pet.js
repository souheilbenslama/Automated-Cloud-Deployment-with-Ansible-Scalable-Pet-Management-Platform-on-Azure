var mongoose = require("mongoose");

var PetSchema = new mongoose.Schema({
    name:{type:String,required:true,trim:true},
    photo:{type:String},
    breed:{type:String,required:true,trim:true},
    birthday:{type:Date,required:true},
    sex:{type:String,required:true},
    weight:{type: Number},
    owner:{type:String,required:true}
});

var Pet = mongoose.model("Pet",PetSchema);

module.exports = Pet ;