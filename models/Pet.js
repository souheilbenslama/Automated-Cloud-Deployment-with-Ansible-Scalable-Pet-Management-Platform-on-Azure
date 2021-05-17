var mongoose = require("mongoose");


var PetSchema = new mongoose.Schema({
    name:{type:String,required:true,trim:true},
    photo:{type:String},
    type:{type:String,required:true,trim:true},
    breed:{type:String,trim:true},
    birthday:{type:Date,required:true},
    sex:{type:String,required:true},
    weight:{type:Number,required:true},
    status:{type:String,default:"o",required:true},
    owner:{type:mongoose.Schema.Types.ObjectId,ref:'User'}
},
{timestamps:true});

var Pet = mongoose.model("Pet",PetSchema);

module.exports = Pet ;