const express = require('express')
const route = express.Router()

const { usersController } = require('../../controllers/index')

route.post('/create_account', usersController.registerUsers)

route.post('/verify_account', usersController.verifyAccount)


route.post('/forgot_password', usersController.forgotPassword)

route.post('/verify_otp_forgot_password', usersController.verifyForgotPassword)

route.post('/changes_password', usersController.changesPassword)

route.get('/all', usersController.getUsers)

module.exports = route