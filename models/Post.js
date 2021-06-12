var mongoose = require("mongoose");


var PostSchema = new mongoose.Schema({
    photo:{type:String},
    desc:{type:String,required:true,trim:true},
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User'}
},
{timestamps:true});

var Post = mongoose.model("Post",PostSchema);

module.exports = Post ;