import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { formatFullName } from '../../utility/formatters.js'

const MyFriends = ({setCurrentTab, user, setFriendId, setFriendName}) => {

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=> {
        const getData = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`http://localhost:5000/friendship/my`);
                if (response) {
                    setData(response.data);
                }
                setIsLoading(false);
            } catch (error) {
                toast.error(error.response.data);
                setIsLoading(false);
            }
        }; getData();
        
    }, []);

    const handleClick = (id, name) => {
        setFriendId(id);
        setFriendName(name);
        setCurrentTab('Friend Schedule');
    };

    return (
        <>
        { isLoading ? 
            <div className="spinner-border mt-4" styles={{width: "3rem", height: "3rem"}} role="status">
                <span className="sr-only">Loading...</span>
            </div>
        :
        <ul className="list-group w-50 mt-4">
            <h4 className="text-center mb-3">Friends</h4>
            {data && data.map((el, i)=> {
                if (el.friend_1_id === user._id)
                    return <li key={'friend'+i} className="list-group-item" onClick={() => handleClick(el.friend_2_id, el.friend_2_name)}>
                        <i className="fa-solid fa-user-group me-4"></i>{formatFullName(el.friend_2_name)}
                        </li>
                else
                    return <li key={'friend'+i} className="list-group-item" onClick={() => handleClick(el.friend_1_id, el.friend_1_name)}>
                        <i className="fa-solid fa-user-group me-4"></i>{formatFullName(el.friend_1_name)}
                        </li>
            })}
        </ul>}
        
        </>
    )
};

export { MyFriends };