const jwt = require('jsonwebtoken')

const createJWT = ({payload}) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME})
    return token
}

const verifyJWT = ({token}) => {
    return jwt.verify(token, process.env.JWT_SECRET)
}

const attachCookieToResponse = ({response, user}) => {
    const token = createJWT({payload: user})

    const oneDay = 1000 * 60 * 60 * 24
    response.cookie('token', token, {
        httpOnly: true, 
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production',
        signed: true
    })

    response.status(201).json({user})
}

module.exports = {
    createJWT,
    verifyJWT,
    attachCookieToResponse
}