const { Router } = require('express')
const { signup, login } = require('../Controllers/UserController')


const UserRouter = Router()

UserRouter.post("/signup", signup)

UserRouter.post("/login", login)


module.exports = { UserRouter }