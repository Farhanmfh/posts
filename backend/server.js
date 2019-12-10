const express = require('express')
const session = require('express-session')
const app = express()
const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/posts'

const timeOut = 1000 * 60 * 60 * 2

app.use(express.json());


const { PORT = 5000,
    NODE_ENV = 'devlopment',
    SESS_LIFETIME = timeOut,
    SESS_NAME = 'sid',
    SESS_SECRET = 'mfh'
} = process.env

const IN_PROD = NODE_ENV === 'production'


mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
    if (!err) {
        console.log('Connected to DataBase')
    } else {
        console.log(err)
    }
})

const postRoute = require('./Routes/post')
const register = require('./Routes/Register')



//Session
app.use(session({
    name: SESS_NAME,
    resave : false,
    saveUninitialized : false,
    secret : SESS_SECRET,
    cookie: {
        maxAge: SESS_LIFETIME,
        secure: IN_PROD,
    }

}))


// Routes 

app.use('/post', postRoute)
app.use('/', register)



app.listen(PORT, () => {
    console.log('Server Running on Port 5000')
})