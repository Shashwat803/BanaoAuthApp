const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    user: { type: String, required: true },
    text: { type: String, required: true },
},
    { timestamp: true });    

const Post = mongoose.Schema({
    userId: { type: String, required: true },
    content: { type: String, required: true },
    likes: { type: Number, default: 0 },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
},{ timestamp: true })

module.exports = { Post: mongoose.model("Post", Post), Comment: mongoose.model("Comment", commentSchema) }