const mongoose = require("mongoose")

const usersSchema = mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    nickname:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
})

module.exports = mongoose.model("User",usersSchema)