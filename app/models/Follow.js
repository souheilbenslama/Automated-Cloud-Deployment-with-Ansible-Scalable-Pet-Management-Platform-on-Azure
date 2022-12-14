var mongoose = require("mongoose");

var FollowSchema = new mongoose.Schema({
    confirm:{type:Boolean,default:false,required:true},
    follower:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    followed:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}
},
{timestamps:true});

var Follow = mongoose.model("Follow",FollowSchema);

module.exports = Follow ;