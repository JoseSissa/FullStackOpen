import React from "react";
import ReactDOM from "react-dom/client";
import './index.css'
import { Provider } from 'react-redux'
import App from './App'
import { configureStore } from '@reduxjs/toolkit'
import { noteReducer } from './reducers/noteReducer'

export const store = configureStore({ reducer: noteReducer })

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);