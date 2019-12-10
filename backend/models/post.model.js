const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    title: {
        type: String,
        require: true,
        minlength: 3
    },
    body : {
        type: String,
        require: true,
        minlength: 3
    }

})

const post = mongoose.model('post' , postSchema)

module.exports = post