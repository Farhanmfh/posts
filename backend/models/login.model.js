const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LoginSchema = new Schema({

    email: {
        type: String,
        require: true,
        minlength: 5
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    date: {type: Date, default: Date.now}

})

const login = mongoose.model('register' , LoginSchema)

module.exports = login