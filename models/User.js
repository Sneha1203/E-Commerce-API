const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please provide a name'],
        maxlength: 50,
        minlength: 3
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'please provide an email'],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide a valid email'
        }
    },
    password: {
        type: String,
        required: [true, 'please provide a password'],
        minlength: 6
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
})


UserSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})


UserSchema.methods.comparePassword = async function(candidatePassword) {
    const isMatching = await bcrypt.compare(this.password, candidatePassword)   
    return isMatching
}

const User = mongoose.model('User', UserSchema)

module.exports = User