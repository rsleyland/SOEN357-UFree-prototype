import { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../services/providers/AuthContextProvider.js';
import { useNavigate } from 'react-router-dom';

const HomeScreen = () => {

    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);

    const formatName = () => {
        const fName = currentUser.firstName.substr(0,1).toUpperCase()+currentUser.firstName.substr(1,currentUser.firstName.length-1).toLowerCase();
        const lName = currentUser.lastName.substr(0,1).toUpperCase()+currentUser.lastName.substr(1,currentUser.lastName.length-1).toLowerCase();
        return fName + ' ' + lName;
    };

    useEffect(()=> {
        if (!currentUser) {
            navigate('/login');
            toast.info("Please Login / Register.");
        }
    }, [currentUser, navigate]);

    return (
    <>
    
    <nav className="navbar navbar-dark bg-dark">
        <div className="container justify-content-between">
            <div>
                <button className="btn btn-sm btn-outline-light me-2" type="button">My Schedule</button>
                <button className="btn btn-sm btn-outline-light me-2" type="button">Friends</button>
                <button className="btn btn-sm btn-outline-light me-2" type="button">QR codes</button>
            </div>
            <div>
                <button className="btn btn-sm btn-outline-warning me-2" type="button">Settings</button>
                <button className="btn btn-sm btn-outline-danger me-2" type="button" onClick={() => navigate('/logout')}>Logout</button>
            </div>
            
        </div>
    </nav>

    <div className="container mt-4 d-flex justify-content-center">
        {currentUser && (
            <h3 >Welcome {formatName()}</h3>
        )}
    </div>
        
    </>
        
    )
};

export { HomeScreen };