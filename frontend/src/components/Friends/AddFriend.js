import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const AddFriend = ({setCurrentTab, user}) => {

    const [friendsCode, setFriendsCode] = useState('');

    const clickHandler = async () => {
        try {
            if (friendsCode === '') return toast.error("Please provide a code.");
            const body = {friendship_code: friendsCode, name:`${user.firstName} ${user.lastName}`};
            await axios.post(`/friendship/create`, body);
            toast.success(`Friendship successfully created`);
            setCurrentTab('My Friends')
        } catch (error) {
            toast.error(error.response.data);
            setFriendsCode('');
        }
    };

    return (
        <div className="mt-4 w-50">
                <h4 className="text-center mb-3">Add friend</h4>
                <label className="form-label">Friends code</label>
                <input className="form-control" placeholder="Enter friends code" required value={friendsCode} onChange={(e)=> setFriendsCode(e.target.value)} type="text" />
                <div className="d-flex justify-content-center"><button className="btn btn-success form-control w-75 mt-3" onClick={clickHandler} type="submit">Add</button></div>
            </div>
    )
}

export { AddFriend };