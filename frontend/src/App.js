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
    const modeEl = document.getElementById('mode-selector').classList;
    if (mode == 'light') {
      setMode('dark');
      if (modeEl.contains('text-dark')){
          modeEl.remove('text-dark');
      }
      modeEl.add('text-white');
    }
    else {
      setMode('light');
      if (modeEl.contains('text-white')){
          modeEl.remove('text-white');
      }
      modeEl.add('text-dark');
    }
  }

  return (
    <>
    <p id='mode-selector' onClick={toggleMode}><i class={mode=='light' ? "fa-solid fa-toggle-off" : "fa-solid fa-toggle-on"}></i></p>
    <ToastContainer autoClose={1500}/>
    <Routes>
      <Route path="/login" element={<LoginScreen mode={mode}/>} />
      <Route path="/register" element={<RegisterScreen mode={mode}/>} />
    </Routes>
    </>
  );
}

export default App;
