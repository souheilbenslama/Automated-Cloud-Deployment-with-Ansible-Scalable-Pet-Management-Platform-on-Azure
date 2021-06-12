var mongoose = require("mongoose");


var CommentSchema = new mongoose.Schema({
    name:{type:String,required:true,trim:true},
    post:{type:mongoose.Schema.Types.ObjectId,ref:'Post'},
    comment:{type: String},
    commenter:{type:mongoose.Schema.Types.ObjectId,ref:'User'}
},
{timestamps:true});

var Pet = mongoose.model("Pet",PetSchema);

module.exports = Pet ;