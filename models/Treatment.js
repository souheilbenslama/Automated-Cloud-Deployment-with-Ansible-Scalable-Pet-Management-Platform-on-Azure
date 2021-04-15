var mongoose = require("mongoose");

var TreatmentSchema = new mongoose.Schema({
    type:{type:String,required:true},
    date:{type:Date,required:true},
    description:{type:String},
    done:{type:Boolean,default:false}
    //pet:{type:Schema.Types.ObjectId,ref:"Pet",required:true}
});

var Treatment = mongoose.model("Treatment",TreatmentSchema);

module.exports = Treatment ;