var mongoose = require("mongoose");

var DossierSchema = new mongoose.Schema({
    confirm:{type:Boolean,default:false,required:true},
    status:{type:String,required:true,default:"open"},
    rapport:{type:String},
    vet:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    pet:{type:mongoose.Schema.Types.ObjectId,ref:"Pet",required:true}
},
{timestamps:true});

var Dossier = mongoose.model("Dossier",DossierSchema);

module.exports = Dossier ;