import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserModel } from '../models/turso/user.js'
import { config } from '../utils/config.js'

export class LoginController {
    static async login (request, response) {
        const { username, password } = request.body
      
        const user = await UserModel.getUserByUsername({ username })
        console.log({ user });
        

        const passwordCorrect = !user
            ? false
            : await bcrypt.compare(password, user.passwordHash)
      
        if (!(user && passwordCorrect)) {
            return response.status(401).json({
                error: 'invalid username or password'
            })
        }
      
        const userForToken = {
            username: user.name,
            id: user.id,
        }
      
        const token = jwt.sign(userForToken, config.SECRET_KEY_JWT)
      
        response
            .status(200)
            .send({ token, name: user.name })
    }    
}