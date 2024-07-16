const express = require('express');
const app = express();
const User = require('./src/routers/UserRouter')
const Post = require('./src/routers/PostRouter')
const connectDb = require('./src/db/DbConfig')
require('dotenv').config();


//middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api', User)
app.use('/api', Post)

connectDb().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on ${process.env.PORT}`)
    })
})


