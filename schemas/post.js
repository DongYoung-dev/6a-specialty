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
    contents: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: Number,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Post", postSchema);