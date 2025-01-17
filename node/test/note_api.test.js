import { test, describe, after, beforeEach } from 'node:test'
import assert from 'node:assert'
import supertest from 'supertest'
import app from '../app.js'
const api = supertest(app)

beforeEach(async () => {
    console.log('Code before here <---------');
})
    

test('GET /api/notes', async () => {
    await api
        .get('/api/notes')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

describe('POST /api/notes', () => {
    test('Note without content is not added', async () => {
        const newNote = {
            important: true
        }
      
        await api
            .post('/api/notes')
            .send(newNote)
            .expect(400)
      
        const response = await api.get('/api/notes')    
        assert.strictEqual(response.body.length, 6)
    })

    test('Note with content is added', async () => {
        const newNote = {
            content: 'New note from TEST POST request',
            important: true
        }
      
        await api
            .post('/api/notes')
            .send(newNote)
            .expect(200)
      
        const response = await api.get('/api/notes')    
        const contents = response.body.map(r => r.content)
        assert.strictEqual(response.body.length, 7)
        assert(contents.includes('New note from TEST POST request'))
    })
})

test('DELETE /api/notes/:id', async () => {
    await api
        .delete('/api/notes/1')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/notes')
    assert.strictEqual(response.body.length, 6)
})

after(async () => {
    console.log('Code after here <---------');
})