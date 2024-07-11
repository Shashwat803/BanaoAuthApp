const express = require('express');
const app = express();
const User = require('../routers/UserRouter')
const connectDb = require('../db/DbConfig')
require('dotenv').config();


//middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api', User)

connectDb().then(() => {
    app.listen(process.env.SERVERPORT, () => {
        console.log(`Server is running on ${process.env.SERVERPORT}`)
    })
})


