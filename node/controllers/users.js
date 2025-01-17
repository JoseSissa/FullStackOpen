import { UserModel } from '../models/turso/user.js'
import bcrypt from 'bcrypt'

export class UsersController {
    static async createUser(req, res, next) {
        const { name, password } = req.body

        if (!name) res.status(400).json({ error: 'Name missing' })    
        if (!password) res.status(400).json({ error: 'Password missing' }) 
            
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const newUser = {
            id: 4,
            name: name,
            passwordHash
        }        

        try {
            const resCreateUser = await UserModel.createUser(newUser)
            res.json(resCreateUser)
        } catch (error) {
            error.message= "Error creating user - REQUEST POST "            
            next(error)
        }
    }
}