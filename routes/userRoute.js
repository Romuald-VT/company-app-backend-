const express = require('express')
const {login,createUser} = require('../conntrollers/userController')

const userRouter = express.Router()

userRouter.post('/login',login)
userRouter.post('/add',createUser)

module.exports= {userRouter}