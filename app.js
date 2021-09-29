const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')
require('dotenv').config()
const PORT = process.env.PORT || 3000


//middleware
app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())

//view engine
app.set('view engine', 'ejs')

const dbURI = process.env.MONGOURI;
mongoose.connect(dbURI)
    .then(() => {
        app.listen(PORT, () => { console.log('Connected') })
    })
    .catch(e => {
        console.log("Error in connecting to database")
    });

app.use(authRoutes)