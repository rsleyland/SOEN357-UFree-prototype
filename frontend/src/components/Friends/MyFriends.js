import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { compareLNameFNameDesc, formatFullName } from '../../utility/formatters.js'

// Component to display list of current users friends (users can view schedules or remove friend via buttons)
const MyFriends = ({setCurrentTab, user, setFriendId, setFriendName}) => {

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=> {
        const getData = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`/friendship/my`);
                if (response) {
                    setData(reOrderData(response.data));
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
        try {
            await axios.delete(`/friendship/remove`, {data: {friend_id: id}});
            setData(data.filter(el => el.friend_1_id !== id && el.friend_2_id !== id));
            toast.success(`${name} removed from friends`);
        } catch (error) {
            toast.error(error.response.data);
        }
    };

    const reOrderData = (input) => {
        let names = [];
        for (let i in input) {
            if (input[i].friend_1_id === user._id) names.push(input[i].friend_2_name);
            else names.push(input[i].friend_1_name);
        }
        names.sort(compareLNameFNameDesc);
        let output = []
        for (let i in names){
            output.push(input.find(el => el.friend_1_name === names[i] || el.friend_2_name === names[i]))
        }
        return output;
    }

    return (
        <>
        { isLoading ? 
            <div className="spinner-border mt-4" styles={{width: "3rem", height: "3rem"}} role="status">
                <span className="sr-only">Loading...</span>
            </div>
        :
        <>
        <div className="col-10 bg-light rounded mt-3">
        {data && data.length > 0 ? 
            <table className="table">
                <thead>
                    <tr><th className="text-center">Friends</th></tr>
                </thead>
                <tbody id="friends-table-body">
                    { data.map((el, i) => {
                        if (el.friend_1_id === user._id) 
                        return (
                        <tr key={'list-friends-'+i}>
                            <td>
                                <i className="fa-solid fa-user-group mx-3"></i>
                                <div>{formatFullName(el.friend_2_name)}</div>
                                <div id="friend-btns">
                                    <button onClick={() => handleClick(el.friend_2_id, el.friend_2_name)} className="btn"><i className="fa-solid fa-calendar"></i></button>
                                    <button onClick={() => handleDelete(el.friend_2_id, el.friend_2_name)} className="btn"><i className="fa-solid fa-trash"></i></button>
                                </div>
                            </td>
                        </tr>)
                        else return (
                            <tr key={'list-friends-'+i}>
                                <td>
                                    <i className="fa-solid fa-user-group mx-3"></i>
                                    <p>{formatFullName(el.friend_1_name)}</p>
                                    <div id="friend-btns">
                                        <button onClick={() => handleClick(el.friend_1_id, el.friend_1_name)} className="btn"><i className="fa-solid fa-calendar"></i></button>
                                        <button onClick={() => handleDelete(el.friend_1_id, el.friend_1_name)} className="btn"><i className="fa-solid fa-trash"></i></button>
                                    </div>
                                </td>
                            </tr>
                        )})}
                </tbody>
            </table>
            : <h3 className="text-center p-3">No friends to display</h3>}
        </div>
        </>}
        </>
    )
};

export { MyFriends };