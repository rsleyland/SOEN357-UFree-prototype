import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { AuthContext } from '../services/providers/AuthContextProvider.js';
import axios from 'axios';

const LogoutScreen = () => {

    const navigate = useNavigate();
    const { setCurrentUser } = useContext(AuthContext);
    
    useEffect(() => {
        const logout = async () => {
            try {
                const name = JSON.parse(localStorage.getItem('user')).firstName;
                const formatName = name.substr(0,1).toUpperCase() + name.substr(1,name.length-1);
                setCurrentUser(null);
                localStorage.clear();
                await axios.get(`http://localhost:5000/auth/logout`);
                toast.success(`${formatName} logged out successfully!`);
                navigate('/login');
            } catch (error) {
                toast.error(error.response.data.error);
            }
        };logout();
        
    }, [setCurrentUser, navigate]);

    return null;
};

export { LogoutScreen };