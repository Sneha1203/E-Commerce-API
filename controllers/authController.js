const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')

const register = async(request, response) => {
    const {name, email, password} = request.body

    const emailAlreadyExists = await User.findOne({email})

    if(emailAlreadyExists) {
        throw new CustomError.BadRequestError('Email already extsts, try again .....')
    }

    const isFirstAccount = await User.countDocuments({}) === 0
    const role = isFirstAccount ? 'admin' : 'user'

    const user = await User.create({name, email, password, role})
    response.status(StatusCodes.CREATED).json({user})
    // response.send('register a user')
}

const login = async(request, response) => {
    response.send('login a user')
}

const logout = async(request, response) => {
    response.send('logout a user')
}

module.exports = {
    register,
    login,
    logout,
}