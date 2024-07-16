const express = require('express')
const validateUser = require('../middleware/ValidateToken')
const { addPost, getPosts, addComment, updatePost } = require('../controllers/PostController')

const router = express.Router()

router.post('/post', validateUser, addPost)
router.get('/post', validateUser, getPosts)
router.put('/post/:id', updatePost)
router.post('/post/:id/comment', validateUser, addComment)


module.exports = router