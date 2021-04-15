var mongoose = require("mongoose");

var BathSchema = new mongoose.Schema({
    date:{type:Date,required:true},
    description:{type:String},
    done:{type:Boolean,default:false}
    //pet:{type:Schema.Types.ObjectId,ref:"Pet",required:true}
});

var Bath = mongoose.model("Bath",BathSchema);

module.exports = Bath ;