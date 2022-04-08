import { useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../services/providers/AuthContextProvider.js";
import axios from "axios";

const QRLinkScreen = () => {
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    const { slug } = useParams();

    useEffect(() => {
        if (currentUser) {
            const createFriendShip = async () => {
                try {
                    const body = {friendship_code: slug, name:`${currentUser.firstName} ${currentUser.lastName}`};
                    await axios.post(`http://localhost:5000/friendship/create`, body);
                    toast.success(`Friendship successfully created`);
                    navigate('/');
                } catch (error) {
                    if (error.response && error.response.data) toast.error(error.response.data);
                    else toast.error(error);
                    navigate('/');
                }
            }; createFriendShip();
        }
        
    }, [currentUser, slug, navigate]);

    return <h3>This page should redirect.</h3>;
}

export { QRLinkScreen };