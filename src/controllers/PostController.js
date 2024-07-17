const { Post, Comment } = require('../models/PostModel')

// Create a new post
const createPost = async (req, res, next) => {
    try {
        const { content } = req.body
        const authUser = req.user
        // Create a new post with user ID, content, and initial likes count
        const post = await Post.create({
            userId: authUser.id,
            content,
            likes: 0
        })
        res.status(201).json(post)
    } catch (error) {
        next(error)
    }
}

// Get all posts of a user
const getPostsOfUser = async (req, res, next) => {
    try {
        const user = req.user
        // Find all posts of the user and populate comments
        const posts = await Post.find({ userId: user.id })
            .populate({
                path: 'comments',
                select: 'text user',
                options: { sort: { createdAt: -1 } }
            })
        res.status(200).json(posts)
    } catch (error) {
        next(error)
    }
}

// Get all posts 
const getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find()
            .populate({
                path: 'comments',
                select: 'text user',
                options: { sort: { createdAt: -1 } }
            })
        res.status(200).json(posts)
    } catch (error) {
        next(error)
    }
}

// Update a post
const updatePost = async (req, res, next) => {
    try {
        const { content } = req.body
        const { id } = req.params
        // Find post by ID and update content
        const post = await Post.findByIdAndUpdate(id, { content }, { new: true })
        res.status(200).json(post)
    } catch (error) {
        next(error)
    }
}

// Add a comment to a post
const createComment = async (req, res, next) => {
    try {
        const { id } = req.params
        const { text } = req.body
        const user = req.user
        // Create a new comment
        const comment = new Comment({
            postId: id,
            user: user.username,
            text
        })
        const savedComment = await comment.save()
        // Add comment to the post
         await Post.findByIdAndUpdate(
            id,
            { $push: { comments: savedComment._id } },
            { new: true }
        )
        res.status(201).json({ comment: savedComment });
    } catch (error) {
        next(error)
    }
}

// Like a post
const likePost = async (req, res, next) => {
    try {
        const { id } = req.params
        const post = await Post.findById(id)
        if (!post) {
            return res.status(404).json({ message: 'Post not found' })
        }
        // Increment likes count
        post.likes += 1
        await post.save()
        res.status(200).json(post)
    } catch (error) {
        next(error)
    }
}

// Delete a post
const deletePost = async (req, res, next) => {
    try {
        const { id } = req.params
        const post = await Post.findByIdAndDelete(id)
        if (!post) {
            return res.status(404).json({ message: 'Post not found' })
        }
        res.status(200).json({ message: 'Post deleted successfully!' })
    } catch (error) {
        next(error)
    }
}

// Delete a comment from a post
const deleteComment = async (req, res, next) => {
    try {
        const { id, commentId } = req.params;
        // Delete the comment
        const deletedComment = await Comment.findByIdAndDelete(commentId)
        if (!deletedComment) {
            return res.status(404).json({ message: 'Comment not found!' })
        }
        // Remove comment reference from the post
        const post = await Post.findByIdAndUpdate(
            id,
            { $pull: { comments: { _id: commentId } } },
            { new: true }
        );
        if (!post) {
            return res.status(404).json({ message: "Comment not found" });
        }
        res.status(200).json({ message: "Comment deleted" });
    } catch (error) {
        next(error);
    }
};

// Unlike a post (decrease likes count)
const deleteLikes = async (req, res, next) => {
    try {
        const { id } = req.params
        const post = await Post.findById(id)
        if (!post) {
            return res.status(404).json({ message: 'Post not found' })
        }
        // Decrement likes count
        post.likes -= 1;
        post.save()
        res.status(200).json(post)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createPost,
    getPostsOfUser,
    getAllPosts,
    updatePost,
    createComment,
    likePost,
    deletePost,
    deleteComment,
    deleteLikes
}