const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    username: {
        type: String,
        require: true,
        minlength: 3
    },
    email: {
        type: String,
        require: true,
        minlength: 5
    },
    password: {
        type: String,
        require: true,
        minlength: 3
    },
    password2: {
        type: String,
        require: true,
        minlength: 3
    },
    
    isActive : {type : Boolean},

    secretToken : {type : String}

},
    { timestamps: true }
)

UserSchema.methods.genrateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8),null);

}

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

UserSchema.methods.genrateHash = function(password2) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8),null);

}

UserSchema.methods.validPassword = function(password2) {
    return bcrypt.compareSync(password, this.password);
}


const user = mongoose.model('users', UserSchema)

module.exports = user