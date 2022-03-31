const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    postId:{
        type:String,
        required:true,
    },
    comment:{
        type:String,
        required:true,
    },
    nickname:{
        type:String,
        required:true,
    },
    commentId:{
        type:Number,
        required:true,
    }
    
})

module.exports = mongoose.model("Comment", commentSchema)