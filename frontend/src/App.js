import './App.css';
import { Routes, Route } from "react-router-dom";
import { LoginScreen } from './screens/Login.screen';
import { RegisterScreen } from './screens/Register.screen';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

function App() {

  const [mode, setMode] = useState('light');

  const toggleMode = () => {
    if (mode === 'light') setMode('dark');
    else setMode('light');
  }

  return (
    <>
    <p id='mode-selector' className={mode === 'light' ? "text-dark" : "text-white"} onClick={toggleMode}><i className={mode==='light' ? "fa-solid fa-toggle-off" : "fa-solid fa-toggle-on"}></i></p>
    <ToastContainer autoClose={1500}/>
    <Routes>
      <Route path="/login" element={<LoginScreen mode={mode}/>} />
      <Route path="/register" element={<RegisterScreen mode={mode}/>} />
    </Routes>
    </>
  );
}

export default App;
