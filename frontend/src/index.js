import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './screens/css/loginRegister.screen.css';
import './screens/css/myschedule.screen.css';
import './screens/css/home.screen.css';
import './components/css/schedule.css';
import './components/css/friends.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
axios.defaults.withCredentials = true //auto send and recieve cookies - no need to add to every request now 
axios.defaults.baseURL = 'http://localhost:5000';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);