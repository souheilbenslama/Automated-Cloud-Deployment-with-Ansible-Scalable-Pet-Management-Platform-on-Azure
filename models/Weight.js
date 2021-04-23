var mongoose = require("mongoose");

var WeightSchema = new mongoose.Schema({
    name:{type:String,required:true},
    date:{type:Date,required:true},
    description:{type:String},
    //pet:{type:String,required:true}
    vet:{type:mongoose.Schema.Types.ObjectId,ref:"Pet",required:true}
},
{timestamps:true});

var Weight = mongoose.model("Weight",WeightSchema);

module.exports = Weight ;