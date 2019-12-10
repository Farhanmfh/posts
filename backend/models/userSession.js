const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    userId: {
        type: Number,
        default: -1
    },

    isActive: {
        type: Boolean,
        default: false
    },


},
    { timestamps: true }
)

UserSchema.methods.genrateHash = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

}

UserSchema.methods.validPassword = password => {
    return bcrypt.compareSync(password, this.password);
}



const user = mongoose.model('users', UserSchema)

module.exports = user