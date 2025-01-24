import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserModel } from '../models/turso/user.js'
import { config } from '../utils/config.js'
import { BadRequestError } from '../utils/errors.js'

export class LoginController {
    static async login (req, res, next) {
        try {
            const { username, password } = req.body

            if (!username || !password) return next(new BadRequestError('Username and password are required'))

            const user = await UserModel.getUserByUsername({ username })
            if(!user) next(new BadRequestError('Username does not exist'))
                
            const passwordCorrect = await bcrypt.compare(password, user.passwordHash)
            console.log({passwordCorrect})
            
            if (passwordCorrect) {
                const userForToken = {
                    username: user.name,
                    id: user.id,
                }
                const token = jwt.sign(userForToken, config.SECRET_KEY_JWT)
                res.status(200).send({ token, name: user.name, id: user.id })
            } else {
                next(new BadRequestError('Invalid Password'))
            }
          
        } catch (err) {
            next(err)
        }
    }    
}