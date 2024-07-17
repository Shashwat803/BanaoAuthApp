const express = require('express')
const validateUser = require('../middleware/ValidateToken')
const { createPost, getPosts, createComment, updatePost, likePost, deleteComment, deletePost, deleteLikes } = require('../controllers/PostController')

const router = express.Router()

// Route for create post
router.post('/post', validateUser, createPost)
// Route for get post
router.get('/post', validateUser, getPosts)
// Route for update post
router.put('/post/:id', validateUser, updatePost)
// Route for create comment
router.post('/post/:id/comment', validateUser, createComment)
// Route for like post
router.post('/post/:id/like', validateUser, likePost)
// Route for delete post
router.delete('/post/:id', validateUser, deletePost)
// Route for delete comment
router.delete('/post/:id/comment/:commentId', validateUser, deleteComment)
// Route for delete likes
router.delete('/post/:id/like', validateUser, deleteLikes)

module.exports = router