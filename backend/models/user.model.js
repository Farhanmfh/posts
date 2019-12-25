const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Bcrypt = require('bcrypt')

const UserSchema = new Schema({
    username: {
        type: String,
        minlength: 3,
        require: true,
    },
    email: {
        type: String,
        require: true,
        minlength: 5,     
    },
    password: {
        type: String,
        require: true,
        minlength: 3
    },
  
    isActive : {type : Boolean},

    secretToken : {type : String}

},
    { timestamps: true }
)

// UserSchema.pre("save", function(next) {
//     if(!this.isModified("password")) {
//         return next();
//     }
//     this.password = Bcrypt.hashSync(this.password, 10);
//     next();
// });

// UserSchema.methods.comparePassword = function(plaintext, callback) {
//     return callback(null, Bcrypt.compareSync(plaintext, this.password));
// };



const user = mongoose.model('users', UserSchema)

module.exports = user