const express = require('express');
const app = express();
const User = require('./src/routers/UserRouter')
const Post = require('./src/routers/PostRouter')
const connectDb = require('./src/db/DbConfig')
require('dotenv').config();

// Middleware setup
app.use(express.urlencoded({ extended: true })) // Parse URL-encoded bodies
app.use(express.json()) // Parse JSON bodies

// Route setup
app.use('/api', User) // Mount User routes under /api
app.use('/api', Post) // Mount Post routes under /api

// Connect to database and start server
connectDb().then(() => {
    // Start the server after successful database connection
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on ${process.env.PORT}`)
    })
})

