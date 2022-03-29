import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios';

const LoginScreen = ( { mode } ) => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = { email, password };
            const result = await axios.post(`http://localhost:5000/auth/login`, user);
            toast.success("User logged in successfully!");
        } catch (error) {
            toast.error(error.response.data.error);
        }
    };

    return (
        <div className="container-fluid fullscreen-bg auth-bg">
            <div className="row justify-content-end">
                <div className="col-md-6 col-sm-7 col-10 me-lg-5 me-1">
                    <form id='login-form' className='auth-form' onSubmit={handleSubmit}>
                        <h3>Login</h3>
                        <label className='form-label mt-3'>Email</label>
                        <input className='form-control' type="email" required
                        placeholder='joe@bloggs.com' value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <label className='form-label mt-2'>Password</label>
                        <input className='form-control' type="password" required
                        placeholder='********' value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <div className='d-flex flex-column align-items-center'>
                            <button type='submit' className='btn btn-primary form-control mt-4 w-75'>Login</button>
                            <button type='button' className='btn btn-sm btn-success w-50 mt-4' 
                            onClick={() => navigate('/register', { state: { _email: email, _password: password } })}>Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export { LoginScreen };