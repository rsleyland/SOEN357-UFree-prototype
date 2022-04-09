import { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios';
import { AuthContext } from '../services/providers/AuthContextProvider.js';
import { formatFirstName } from '../utility/formatters.js';

const LoginScreen = ({isRedirectFromQR = false}) => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('ryan@leyland.com');
    const [password, setPassword] = useState('SecurePass123');
    const { setCurrentUser } = useContext(AuthContext);
    const { slug } = useParams();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = { email, password };
            const result = await axios.post(`/auth/login`, user);
            setCurrentUser(result.data);
            localStorage.setItem('user', JSON.stringify(result.data));
            const name = result.data.firstName;
            toast.success(`${formatFirstName(name)} logged in successfully`);
            if (isRedirectFromQR) return navigate(`/qrcodelink/${slug}`); 
            navigate('/');
        } catch (error) {
            toast.error(error.response.data.error);
        }
    };

    useEffect(()=> {
        if (localStorage.getItem('user')) {
            if (isRedirectFromQR) return navigate(`/qrcodelink/${slug}`); 
            else navigate('/');
            toast.info("User already logged in");
        }
    }, [navigate]);

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
                            <button type='submit' className='btn btn-success form-control mt-4 w-75'>Login</button>
                            <button type='button' className='btn btn-sm btn-secondary w-50 mt-4' 
                            onClick={() => navigate('/register')}>Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export { LoginScreen };