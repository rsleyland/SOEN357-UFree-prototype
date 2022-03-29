import { useState } from 'react';
const LoginScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    

    return (
        <div className="container-fluid fullscreen-bg" id='loginRegister-bg'>
            <div className="row justify-content-end">
                <div className="col-lg-4 col-md-6 col-8 me-lg-5 me-1">
                    <form id='login-form'>
                        <h3>Login</h3>
                        <label className='form-label mt-3'>Email</label>
                        <input className='form-control' type="email" 
                        placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <label className='form-label mt-2'>Password</label>
                        <input className='form-control' type="password" 
                        placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <button className='btn btn-primary form-control mt-4'>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
};

export { LoginScreen };