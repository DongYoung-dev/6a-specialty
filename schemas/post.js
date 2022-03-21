const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    postId: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    contents: {
        type: String,
        required: true,
    },
    dates: {
        type: Date,
        required: true,
    }
});

module.exports = mongoose.model("Post", postSchema);