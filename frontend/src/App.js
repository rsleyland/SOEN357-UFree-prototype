import './App.css';
import { Routes, Route } from "react-router-dom";
import { LoginScreen } from './screens/Login.screen';
import { RegisterScreen } from './screens/Register.screen';

function App() {
  return (
    <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
      </Routes>
  );
}

export default App;
