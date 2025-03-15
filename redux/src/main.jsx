import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore } from '@reduxjs/toolkit'

import './index.css'
import App from './App'

import { noteReducer } from './reducers/noteReducer'
import { filterReducer } from './reducers/filterReducer'


export const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer
  }
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);