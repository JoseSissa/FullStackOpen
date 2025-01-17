import { UserModel } from '../models/turso/user.js'
import bcrypt from 'bcrypt'

export class UsersController {
    static getAllUsers = async (req, res, next) => {
        try {
            const users = await UserModel.getAllUsers()
            res.status(200).json(users)
        } catch (error) {
            next(error)
        }
    }

    static async createUser(req, res, next) {
        const { name, password } = req.body

        console.log('MESSAGE FROM CONTROLLER');        
        console.log({ name, password })

        if (!name) res.status(400).json({ error: 'Name missing' })    
        if (!password) res.status(400).json({ error: 'Password missing' }) 
            
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const newUser = {
            id: 7,
            name: name,
            passwordHash
        }
        
        console.log({ newUser })
        

        try {
            const resCreateUser = await UserModel.createUser(newUser)
            res.json(resCreateUser)
        } catch (error) {
            error.message= "Error creating user - REQUEST POST "            
            next(error)
        }
    }
}