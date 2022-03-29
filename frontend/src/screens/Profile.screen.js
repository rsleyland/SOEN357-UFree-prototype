import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../services/providers/AuthContextProvider.js';
import axios from 'axios';

const ProfileScreen = () => {

    const [user, setUser] = useState(null);
    const { currentUser } = useContext(AuthContext);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="">
                    {currentUser && currentUser._id + ' ' + currentUser.firstName + ' ' + currentUser.lastName + ' ' + currentUser.email}
                </div>
            </div>
        </div>
    )
};

export { ProfileScreen };