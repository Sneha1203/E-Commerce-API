const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')
// const jwt = require('jsonwebtoken')
const {attachCookieToResponse} = require('../utils')

const register = async(request, response) => {
    const {name, email, password} = request.body

    const emailAlreadyExists = await User.findOne({email})

    if(emailAlreadyExists) {
        throw new CustomError.BadRequestError('Email already extsts, try again .....')
    }

    const isFirstAccount = await User.countDocuments({}) === 0
    const role = isFirstAccount ? 'admin' : 'user'

    const user = await User.create({name, email, password, role})
    const tokenUser = {name: user.name, userID: user._id, role: user.role}
    // const token = await jwt.sign(tokenUser, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME})
    // const token = createJWT({payload: tokenUser})

    // const oneDay = 1000 * 60 * 60 * 24
    // response.cookie('token', token, {httpOnly: true, expires: new Date(Date.now() + oneDay)})

    // response.status(StatusCodes.CREATED).json({user: tokenUser})
    attachCookieToResponse({response, user: tokenUser})
    // response.send('register a user')
}

const login = async(request, response) => {
    const {email, password} = request.body

    if(!email || !password) {
        throw new CustomError.BadRequestError('Please enter both email and password...')
    }

    const user = await User.findOne({email})

    if(!user) {
        throw new CustomError.UnauthenticatedError('Invalid credentials....')
    }

    const isPasswordCorrect = await user.comparePassword(password)

    if(!isPasswordCorrect){
        throw new CustomError.UnauthenticatedError('Invalid credentials....')
    }

    const tokenUser = {name: user.name, userId: user._id, role: user.role}
    attachCookieToResponse({response, user: tokenUser})
    response.status(StatusCodes.CREATED).json({user: tokenUser})
    // response.send('login a user')
}

const logout = async(request, response) => {
    response.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now())
    })
    response.status(StatusCodes.OK).json({msg: 'user logged out'})
    // response.send('logout a user')
}

module.exports = {
    register,
    login,
    logout,
}