import { configureStore } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'

import { noteReducer } from './reducers/noteReducer'
import { filterReducer } from './reducers/filterReducer'


export const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer
  },
  applyMiddleware: (thunk)
})
