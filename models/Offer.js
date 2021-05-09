var mongoose = require("mongoose");


var OfferSchema = new mongoose.Schema({
    type:{type:String,require:true},
    price:{type:Number},
    description:{type:String},
    confirmation:{type:Boolean,default:false,require:true},
    pet:{type:mongoose.Schema.Types.ObjectId,ref:'Pet',required:true,unique:true},
    buyers:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}]
},
{timestamps:true});

var Offer = mongoose.model("Offer",OfferSchema);

module.exports = Offer ;