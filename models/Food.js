var mongoose = require("mongoose");

var FoodSchema = new mongoose.Schema({
    name:{type:String,required:true},
    date:{type:Date,required:true},
    quantity:{type:Number},
    done:{type:Boolean,default:false},
    pet:{type:mongoose.Schema.Types.ObjectId,ref:'Pet',required:true}
},
{timestamps:true});

var Food = mongoose.model("Food",FoodSchema);

module.exports = Food ;