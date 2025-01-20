import { LoginController } from '../controllers/login.js'
import { Router } from 'express'
const loginRouter = Router()

loginRouter.post('/', LoginController.login)

export default loginRouter