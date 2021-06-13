var mongoose = require("mongoose");


var CommentSchema = new mongoose.Schema({
    post:{type:mongoose.Schema.Types.ObjectId,ref:'Post',required:true},
    comment:{type: String,required:true},
    commenter:{type:mongoose.Schema.Types.ObjectId,ref:'User',require:true}
},
{timestamps:true});

var Comment = mongoose.model("Comment",CommentSchema);

module.exports = Comment ;