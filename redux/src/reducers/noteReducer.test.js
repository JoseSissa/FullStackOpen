import deepFreeze from 'deep-freeze'
import { noteReducer } from './noteReducer'

describe('noteReducer', () => {
    test('Return new state after action with toggle importance', () => {
        const initialState = [
            {
                id: 1,
                content: 'Note 1',
                important: false
            },
            {
                id: 2,
                content: 'Note 2',
                important: false
            }
        ]

        const action = {
            type: '@notes/toggleImportance',
            payload: {
                id: 2,
            }
        }

        deepFreeze(initialState)
        const newState = noteReducer(initialState, action)

        expect(newState).toHaveLength(2)
        expect(newState).toContainEqual(initialState[0])
        expect(newState).toContainEqual({
            id: 2,
            content: 'Note 2',
            important: true
        })
    })
})