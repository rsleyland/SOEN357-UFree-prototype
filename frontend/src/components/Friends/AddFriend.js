import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const AddFriend = ({setCurrentTab, user}) => {

    const [friendsCode, setFriendsCode] = useState('');

    const clickHandler = async () => {
        try {
            if (friendsCode === '') return toast.error("Please provide a code.");
            const body = {friendship_code: friendsCode, name:`${user.firstName} ${user.lastName}`};
            await axios.post(`http://localhost:5000/friendship/create`, body);
            toast.success(`Friendship successfully created`);
            setCurrentTab('Friends')
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
                <button className="btn btn-primary form-control mt-3" onClick={clickHandler} type="submit">Add</button>
            </div>
    )
}

export { AddFriend };