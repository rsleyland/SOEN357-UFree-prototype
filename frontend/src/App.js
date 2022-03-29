import './App.css';
import { Routes, Route } from "react-router-dom";
import { LoginScreen } from './screens/Login.screen';
import { RegisterScreen } from './screens/Register.screen';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <ToastContainer autoClose={1500}/>
    <Routes>
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
    </Routes>
    </>
  );
}

export default App;
