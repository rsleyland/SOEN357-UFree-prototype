import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { AuthContext } from '../services/providers/AuthContextProvider.js';
import axios from 'axios';
import { formatFirstName } from '../utility/formatters.js';


const LogoutScreen = () => {

    const navigate = useNavigate();
    const { setCurrentUser } = useContext(AuthContext);
    
    useEffect(() => {
        const logout = async () => {
            try {
                const name = JSON.parse(localStorage.getItem('user')).firstName;
                const formatName = formatFirstName(name);
                setCurrentUser(null);
                localStorage.clear();
                await axios.get(`/auth/logout`);
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