import { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../services/providers/AuthContextProvider.js';
import { useNavigate } from 'react-router-dom';
import { MySchedule } from './MySchedule.screen.js';
import { Friends } from './Friends.screen';
import { formatFirstName } from '../utility/formatters.js';


const HomeScreen = () => {

    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    const [subPage, setSubPage] = useState('My Schedule');

    useEffect(()=> {
        if (!localStorage.getItem('user')) {
            navigate('/login');
            toast.info("Please Login / Register.");
        }
    }, [navigate]);

    return (
    <>
    
    <nav className="navbar navbar-dark bg-dark p-2">
        <div className="container-fluid justify-content-around">
            <div className='nav-logo'><img src="/img/logo.png" /></div>
            <div>
                <button className="btn btn-sm btn-outline-light header-btn" type="button" onClick={() => setSubPage('My Schedule')}>My Schedule</button>
                <button className="btn btn-sm btn-outline-light header-btn" type="button" onClick={() => setSubPage('Friends')}>Friends</button>
                {/* <button className="btn btn-sm btn-outline-light me-2" type="button" onClick={() => setSubPage('QR codes')}>QR codes</button> */}
            </div>
            <div>
                <button className="btn btn-sm btn-outline-warning header-btn" type="button"
                onClick={() => setSubPage('Settings')}>
                {currentUser && (<><small className='me-2'>{currentUser.firstName.substr(0,1).toUpperCase()+" "+currentUser.lastName.substr(0,1).toUpperCase()}</small>
                    <i className="fa-regular fa-circle-user"></i></>)}
                </button>
                <button className="btn btn-sm btn-outline-danger header-btn" type="button" onClick={() => navigate('/logout')}>Logout</button>
            </div>
        </div>
    </nav>

    <div className="container mt-4 d-flex flex-column align-items-center">
        {subPage === 'My Schedule' && <MySchedule />}
        {subPage === 'Friends' && <Friends />}
    </div>

        
    </>
        
    )
};

export { HomeScreen };