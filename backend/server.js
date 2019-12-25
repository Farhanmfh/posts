const express = require('express')
//const session = require('express-session')
const app = express()
const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/posts'
const connectStore = require('connect-mongo')
//const MongoStore = connectStore(session)

const timeOut = 1000 * 60 * 60 * 2

app.use(express.urlencoded({ extended: false}));
app.use(express.json());


const { PORT = 5000,
    NODE_ENV = 'devlopment',
    SESS_LIFETIME = timeOut,
    SESS_NAME = 'sid',
    SESS_SECRET = 'mfh'
} = process.env

const IN_PROD = NODE_ENV === 'production'


mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true , useFindAndModify : false}, err => {
    if (!err) {
        console.log('Connected to DataBase "Posts" ')
    } else {
        console.log(err)
    }
})

const postRoute = require('./Routes/post')
const register = require('./Routes/Register')
const signIn = require('./Routes/signIn')
const hash = require('./Routes/hash')
const verify =require('./Routes/VerifyUser')



//Session
// app.use(session({
//     name: SESS_NAME,
//     resave : false,
//     saveUninitialized : false,
//     secret : SESS_SECRET,
//     store: new MongoStore({
//         mongooseConnection: mongoose.connection,
//         collection: 'session',
//         ttl: parseInt(SESS_LIFETIME) / 1000
//       }),
//     cookie: {
//         maxAge: SESS_LIFETIME,
//         secure: IN_PROD,
//     }

// }))


// Routes 

app.use('/post', postRoute)
app.use('/', register)
app.use('/', signIn)
app.use('/', hash)
app.use('/', verify)



app.listen(PORT, () => {
    console.log(`Express Server Running on Port: ${PORT}`)
})