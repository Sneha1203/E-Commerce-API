const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')

const getAllUsers = async(request, response) => {
    // response.send('get all users')
    const users = await User.find({role: 'user'}).select('-password')
    response.status(StatusCodes.OK).json({users})
}

const getSingleUser = async(request, response) => {
    // response.send('get single user')
    const user = await User.findOne({_id: request.params.id}).select('-password')
    if(!user) {
        throw new CustomError.NotFoundError(`no user found with id: ${request.params.id}`)
    }
    response.status(StatusCodes.OK).json({user})
}

const showCurrentUser = async(request, response) => {
    // response.send('show current user')
    response.status(StatusCodes.OK).json({user: request.user})
}

const updateUser = async(request, response) => {
    response.send('update user')
}

const updateUserPassword = async(request, response) => {
    response.send('update user password')
}

module.exports = {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword
}
