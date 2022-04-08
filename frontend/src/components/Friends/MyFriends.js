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
                const response = await axios.get(`/friendship/my`);
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
        <div id="friends-list" className="w-50 mt-4">
            <h4 className="text-center mb-3">Friends</h4>
            {data && data.map((el, i)=> {
                if (el.friend_1_id === user._id)
                    return <div key={'friend'+i}>
                        <div className="d-flex">
                            <i className="fa-solid fa-user-group me-4"></i>
                            <p>{formatFullName(el.friend_2_name)}</p>
                        </div>
                        <div id="friend-btns">
                                <button onClick={() => handleClick(el.friend_2_id, el.friend_2_name)} className="btn"><i className="fa-solid fa-calendar"></i></button>
                                <button  className="btn"><i className="fa-solid fa-trash"></i></button>
                            </div>
                        </div>
                else
                    return <div key={'friend'+i}>
                    <div className="d-flex">
                        <i className="fa-solid fa-user-group me-4"></i>
                        <p>{formatFullName(el.friend_1_name)}</p>
                    </div>
                    <div id="friend-btns">
                            <button onClick={() => handleClick(el.friend_1_id, el.friend_1_name)} className="btn"><i className="fa-solid fa-calendar"></i></button>
                            <button  className="btn"><i className="fa-solid fa-trash"></i></button>
                        </div>
                    </div>
            })}
        </div>}
        
        </>
    )
};

export { MyFriends };