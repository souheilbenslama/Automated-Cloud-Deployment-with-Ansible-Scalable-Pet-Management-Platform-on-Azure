var mongoose = require("mongoose");


var OfferSchema = new mongoose.Schema({
    date:{type:Date,required:true,default:Date.now()},
    type:{type:String,require:true},
    price:{type:Number,required:true},
    description:{type:String},
    confirmation:{type:Boolean,default:false,require:true},
    pet:{type:mongoose.Schema.Types.ObjectId,ref:'Pet',required:true},
    buyers:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}]
},
{timestamps:true});

var Offer = mongoose.model("Offer",OfferSchema);

module.exports = Offer ;