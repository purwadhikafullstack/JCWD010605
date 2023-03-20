import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom';
import rootReducer from "./redux/store";
import { Provider } from "react-redux";
import AuthProvider from "./hoc/authProvider";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";


const store = configureStore({ reducer: rootReducer, middleware: [thunk] });
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <Registerscreen />
  // <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <App /> 
        </BrowserRouter>
      </AuthProvider>
     </Provider>
//  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
