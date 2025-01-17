import { test, describe } from 'node:test'
import assert from 'node:assert'
import supertest from 'supertest'
import app from '../app.js'
const api = supertest(app)

console.log('hola');

describe('POST /api/users', () => {
    test('ADDIND NEW USER TO DB', async () => {
        const newUser = {
            name: 'KarolRondonTEST',
            password: 'passTEST'
        }
      
        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
      
        const response = await api.get('/api/users')    
        assert.strictEqual(response.body.length, 7)
    })
})