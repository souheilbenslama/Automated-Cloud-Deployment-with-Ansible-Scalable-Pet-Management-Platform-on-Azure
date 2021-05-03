var mongoose = require("mongoose");


var PetSchema = new mongoose.Schema({
    name:{type:String,required:true,trim:true},
    photo:{type:String},
    breed:{type:String,required:true,trim:true},
    birthday:{type:Date,required:true},
    sex:{type:String,required:true},
    weight:{type:Number,required:true},
    status:{type:String,default:"o"},
    owner:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true}
},
{timestamps:true});

var Pet = mongoose.model("Pet",PetSchema);

module.exports = Pet ;