import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const RegisterScreen = () => {

    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const {state} = useLocation();
    const { _email, _password } = state;

    useEffect(() => {
        setEmail(_email);
        setPassword(_password);
    }, [_email, _password]);

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
            await axios.post(`http://localhost:5000/auth/register`, user);
            toast.success("User registered successfully!");
            navigate('/login');
        } catch (error) {
            toast.error(error.response.data);
        }
    };
    
    return (
        <div className="container-fluid fullscreen-bg auth-bg">
            <div className="row justify-content-end">
                <div className="col-md-6 col-sm-7 col-10 me-lg-5 me-1">
                    <form id='register-form' className='auth-form' onSubmit={handleSubmit}>
                        <h3>Register</h3>
                        <label className='form-label mt-3'>First Name</label>
                        <input className='form-control' type="text" required
                        placeholder='Joe' value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                        <label className='form-label mt-2'>Last Name</label>
                        <input className='form-control' type="text" required
                        placeholder='Bloggs' value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                        <label className='form-label mt-2'>Email</label>
                        <input className='form-control' type="email" required
                        placeholder='joe@bloggs.com' value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <label className='form-label mt-2'>Password</label>
                        <input className='form-control' type="password" required
                        placeholder='********' value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <label className='form-label mt-2'>Confirm Password</label>
                        <input className='form-control' type="password" required
                        placeholder='********' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                        <div className='d-flex flex-column align-items-center'>
                            <button type='submit' className='btn btn-primary form-control mt-4 w-75'>Register</button>
                            <button type='button' className='btn btn-sm btn-success w-50 mt-4'
                            onClick={() => navigate('/login')}>Already Registered?</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export { RegisterScreen };