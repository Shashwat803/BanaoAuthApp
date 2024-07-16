const { Post, Comment } = require('../models/PostModel')


// same for like as comment
// comment should come first 


const addPost = async (req, res, next) => {
    try {
        const { content, likes } = req.body
        const authUser = req.user
        const post = await Post.create({
            userId: authUser.id,
            content,
            likes
        })
        res.status(201).json(post)
    } catch (error) {
        next(error)
    }
}

const getPosts = async (req, res, next) => {
    try {
        const user = req.user
        console.log(user)
        const posts = await Post.find({ userId: user.id }).populate('comments')
        res.status(200).json(posts)
    } catch (error) {
        next(error)
    }
}

const updatePost = async (req, res, next) => {
    try {
        const { content, likes } = req.body
        const { id } = req.params
        const post = await Post.findByIdAndUpdate(id, { content, likes }, { new: true })
        res.status(200).json(post)
    } catch (error) {
        next(error)
    }
}

const addComment = async (req, res, next) => {
    try {
        const { id } = req.params
        const { text } = req.body
        const user = req.user

        const comment = new Comment({
            postId: id,
            user: user.id,
            text
        })
        await comment.save()
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { $push: { comments: comment } },
            { new: true }
        )
        res.status(201).json(updatedPost);

    } catch (error) {
        next(error)
    }
}

module.exports = { addPost, getPosts, updatePost, addComment }