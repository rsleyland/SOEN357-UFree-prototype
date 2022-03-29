import './App.css';
import { Routes, Route } from "react-router-dom";
import { LoginScreen } from './screens/Login.screen';
import { RegisterScreen } from './screens/Register.screen';
import { ProfileScreen } from './screens/Profile.screen';
import { LogoutScreen } from './screens/Logout.screen';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContextProvider } from './services/providers/AuthContextProvider.js'

function App() {

  return (
    <AuthContextProvider>
      <ToastContainer autoClose={1500}/>
      <Routes>
        <Route path="/login" element={<LoginScreen/>} />
        <Route path="/logout" element={<LogoutScreen/>} />
        <Route path="/register" element={<RegisterScreen/>} />
        <Route path="/profile" element={<ProfileScreen/>} />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
