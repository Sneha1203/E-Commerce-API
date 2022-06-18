const registerUser = async(request, response) => {
    response.send('register a user')
}

const loginUser = async(request, response) => {
    response.send('login a user')
}

const logoutUser = async(request, response) => {
    response.send('logout a user')
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser
}