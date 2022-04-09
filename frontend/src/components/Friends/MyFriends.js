import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { formatFullName } from '../../utility/formatters.js'

const MyFriends = ({setCurrentTab, user, setFriendId, setFriendName, setFriendIds}) => {

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=> {
        const getData = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`/friendship/my`);
                if (response) {
                    response.data.map((el) => el.checked = false)
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

    const handleDelete = async (id, name) => {
        console.log("Deleting")
        try {
            await axios.delete(`/friendship/remove`, {data: {friend_id: id}});
            setData(data.filter(el => el.friend_1_id !== id && el.friend_2_id !== id));
            toast.success(`${name} removed from friends`);
        } catch (error) {
            toast.error(error.response.data);
        }
    };

    const handleToggle = (id) => {
        data.map((el) => {
            if (el.friend_1_id === id || el.friend_2_id === id) {
                el.checked = !el.checked;
            }
            return el;
        })
    };

    const handleCompareButton = () => {
        const friend_ids = [];
        data.map((el) => {
            if (el.checked) {
                if (el.friend_1_id !== user._id) friend_ids.push(el.friend_1_id);
                else friend_ids.push(el.friend_2_id);
            }
            return el;
        })
        if (friend_ids.length === 0) toast.error("No friends selected");
        else {
            setFriendIds(friend_ids);
            setCurrentTab('Friend Schedule Compare');
        }
    };

    return (
        <>
        { isLoading ? 
            <div className="spinner-border mt-4" styles={{width: "3rem", height: "3rem"}} role="status">
                <span className="sr-only">Loading...</span>
            </div>
        :
        <><div id="friends-list" className="w-50 mt-4">
            <h4 className="text-center mb-3">Friends</h4>
            {data && data.map((el, i)=> {
                if (el.friend_1_id === user._id)
                    return <div key={'friend'+i}>
                            <div className="d-flex align-items-center">
                                <div className="form-check form-switch">
                                    <input className="form-check-input" defaultChecked={false} onChange={() => handleToggle(el.friend_2_id)} type="checkbox"/>
                                </div>
                                <i className="fa-solid fa-user-group me-4"></i>
                                <p>{formatFullName(el.friend_2_name)}</p>
                            </div>
                            <div id="friend-btns">
                                <button onClick={() => handleClick(el.friend_2_id, el.friend_2_name)} className="btn"><i className="fa-solid fa-calendar"></i></button>
                                <button onClick={() => handleDelete(el.friend_2_id, el.friend_2_name)} className="btn"><i className="fa-solid fa-trash"></i></button>
                            </div>
                            
                        </div>
                else
                    return <div key={'friend'+i}>
                    <div className="d-flex align-items-center">
                        <div className="form-check form-switch">
                            <input className="form-check-input" defaultChecked={false} onChange={() => handleToggle(el.friend_1_id)} type="checkbox"/>
                        </div>
                        <i className="fa-solid fa-user-group me-4"></i>
                        <p>{formatFullName(el.friend_1_name)}</p>
                    </div>
                    <div id="friend-btns">
                            <button onClick={() => handleClick(el.friend_1_id, el.friend_1_name)} className="btn"><i className="fa-solid fa-calendar"></i></button>
                            <button onClick={() => handleDelete(el.friend_1_id, el.friend_1_name)} className="btn"><i className="fa-solid fa-trash"></i></button>
                        </div>
                    </div>
            })}
        </div>
        <div>
            <button className="btn btn-purple mt-5" onClick={handleCompareButton}>Compare Selected Friend's Schedules</button>
        </div>
        </>}
        </>
    )
};

export { MyFriends };