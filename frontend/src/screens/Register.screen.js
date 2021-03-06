import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AuthContext } from '../services/providers/AuthContextProvider.js';

// Register screen with basic register form
const RegisterScreen = () => {

    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { currentUser } = useContext(AuthContext);
 
    useEffect(()=> {
        if (currentUser) {
            navigate('/');
            toast.info("User already logged in!");
        }
    }, [currentUser, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) return toast.error("Passwords do not match");
        try {
            const user = {
                firstName,
                lastName,
                email,
                password
            }
            await axios.post(`/auth/register`, user);
            toast.success("User registered successfully!");
            navigate('/login');
        } catch (error) {
            toast.error(error.response.data);
        }
    };
    
    return (
        <div className="container-fluid fullscreen-bg auth-bg">
            <div className='logo-login-register'><img src="/img/logo.png" alt='logo' /></div>
            <div className="row justify-content-end">
                <div className="col-md-6 col-sm-7 col-10 me-lg-5 me-1">
                    <form id='register-form' className='auth-form' onSubmit={handleSubmit}>
                        <h3>Register</h3>
                        <label className='form-label mt-3'>First Name</label>
                        <input className='form-control' type="text" required
                        value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                        <label className='form-label mt-2'>Last Name</label>
                        <input className='form-control' type="text" required
                        alue={lastName} onChange={(e) => setLastName(e.target.value)}/>
                        <label className='form-label mt-2'>Email</label>
                        <input className='form-control' type="email" required
                        value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <label className='form-label mt-2'>Password</label>
                        <input className='form-control' type="password" required
                        value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <label className='form-label mt-2'>Confirm Password</label>
                        <input className='form-control' type="password" required
                        value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                        <div className='d-flex flex-column align-items-center'>
                            <button type='submit' className='btn btn-success form-control mt-4 w-75'>Register</button>
                            <button type='button' className='btn btn-sm btn-secondary w-50 mt-4'
                            onClick={() => navigate('/login')}>Already Registered?</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export { RegisterScreen };