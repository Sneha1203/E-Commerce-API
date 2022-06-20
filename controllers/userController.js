const getAllUsers = async(request, response) => {
    response.send('get all users')
}

const getSingleUser = async(request, response) => {
    response.send('get single user')
}

const showCurrentUser = async(request, response) => {
    response.send('show current user')
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
