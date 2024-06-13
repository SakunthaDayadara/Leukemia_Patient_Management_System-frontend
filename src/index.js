import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {AuthProvider} from "./Context/AuthProvider";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'




ReactDOM.render(
    <React.StrictMode>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <AuthProvider>
                <App />
            </AuthProvider>
        </LocalizationProvider>
    </React.StrictMode>
    , document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

