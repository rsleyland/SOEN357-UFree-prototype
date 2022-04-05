import { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../services/providers/AuthContextProvider.js';
import { useNavigate } from 'react-router-dom';
import { Schedule } from '../components/Schedule.js';

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


    const formatFirstName = () => {
        const fname = currentUser.firstName;
        return fname.substr(0,1).toUpperCase()+fname.substr(1,fname.length-1);
    };

    const formatLastName = () => {
        const lname = currentUser.lastName;
        return lname.substr(0,1).toUpperCase()+lname.substr(1,lname.length-1);
    };
    return (
    <>
    
    <nav className="navbar navbar-dark bg-dark p-3">
        <div className="container justify-content-between">
            <div>
                <button className="btn btn-sm btn-outline-light me-2" type="button" onClick={() => setSubPage('My Schedule')}>My Schedule</button>
                <button className="btn btn-sm btn-outline-light me-2" type="button" onClick={() => setSubPage('Friends')}>Friends</button>
                <button className="btn btn-sm btn-outline-light me-2" type="button" onClick={() => setSubPage('QR codes')}>QR codes</button>
            </div>
            <div>
                <button className="btn btn-sm btn-outline-warning me-2" type="button"
                onClick={() => setSubPage('Settings')}>
                {currentUser && (<><small className='me-2'>{formatFirstName()}</small>
                    <i className="fa-regular fa-circle-user"></i></>)}
                </button>
                <button className="btn btn-sm btn-outline-danger me-2" type="button" onClick={() => navigate('/logout')}>Logout</button>
            </div>
        </div>
    </nav>

    <div className="container mt-4 d-flex flex-column align-items-center">
        {subPage === 'My Schedule' && <Schedule />}
    </div>

        
    </>
        
    )
};

export { HomeScreen };