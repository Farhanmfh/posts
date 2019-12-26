const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HashSchema = new Schema({
      
    userId: {
        type: String
    },


    hash:{
        type : String
    },

    isActive: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true }
)



const hash = mongoose.model('hash', HashSchema)

module.exports = hash