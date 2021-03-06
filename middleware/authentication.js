const CustomError = require('../errors')
const {verifyJWT} = require('../utils')

const authenticateUser = async(request, response, next) => {
    const token = request.signedCookies.token

    if(!token) {
        // console.log('error, no token present')
        throw new CustomError.UnauthenticatedError('Authentication Invalid...')
    } 
    
    try {
        // console.log('token present')
        const {name, userId, role} = verifyJWT({token})
        request.user = {name, userId, role}
        next()
    } catch(error) {
        throw new CustomError.UnauthenticatedError('Authentication Invalid...')
    }
}


const authorizePermissions = (...roles) => {
    return (request, response, next) => {
        if(!roles.includes (request.user.role)) {
            throw new CustomError.UnauthorizedError('Unauthorized to access this route')
        }
        next()
    }
}

module.exports = {
    authenticateUser,
    authorizePermissions
}