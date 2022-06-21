const {getAllUsers, getSingleUser, showCurrentUser, updateUser, updateUserPassword} = require('../controllers/userController') 
const {authenticateUser, authorizePermissions} = require('../middleware/authentication')

const express = require('express')
const router = express.Router()

router.route('/').get(authenticateUser, authorizePermissions('admin'), getAllUsers)
router.route('/showMe').get(authenticateUser, showCurrentUser)
router.route('/updateUser').patch(updateUser)
router.route('/updateUserPassword').patch(updateUserPassword)
router.route('/:id').get(authenticateUser, getSingleUser)     //order of this route is important here!

module.exports = router