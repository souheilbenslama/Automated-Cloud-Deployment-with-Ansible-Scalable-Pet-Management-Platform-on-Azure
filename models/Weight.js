var mongoose = require("mongoose");

var WeightSchema = new mongoose.Schema({
    weight:{type:Number,required:true},
    date:{type:Date,required:true},
    pet:{type:mongoose.Schema.Types.ObjectId,ref:'Pet',required:true}
},
{timestamps:true});

var Weight = mongoose.model("Weight",WeightSchema);

module.exports = Weight ;