import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios';

const LoginScreen = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email == '' || password == '') return toast.error("Passwords do not match");
        try {
            const user = {
                email,
                password
            }
            const result = await axios.post(`http://localhost:5000/auth/login`, user);
            toast.success("User logged in successfully!");
        } catch (error) {
            toast.error(error.response.data.error);
        }
    };

    return (
        <div className="container-fluid fullscreen-bg" id='loginRegister-bg'>
            <div className="row justify-content-end">
                <div className="col-md-6 col-sm-7 col-10 me-lg-5 me-1">
                    <form id='login-form' onSubmit={handleSubmit}>
                        <h3>Login</h3>
                        <label className='form-label mt-3'>Email</label>
                        <input className='form-control' type="email" 
                        placeholder='joe@bloggs.com' value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <label className='form-label mt-2'>Password</label>
                        <input className='form-control' type="password" 
                        placeholder='********' value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <button type='submit' className='btn btn-primary form-control mt-4'>Login</button>
                        <div className='d-flex justify-content-center'>
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