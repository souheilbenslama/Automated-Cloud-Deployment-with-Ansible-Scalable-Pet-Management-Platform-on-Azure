var mongoose = require("mongoose");

var MessageSchema = new mongoose.Schema({
    sender:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    receiver:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    message:{type:String,required:true}
},
{timestamps:true});

var Message = mongoose.model("Message",MessageSchema);

module.exports = Message ;