import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FriendSchedule } from "./FriendSchedule";


const Friends = () => {

    const [user, setUser] = useState('');
    const [friendId, setFriendId] = useState('');
    const [friendName, setFriendName] = useState('');
    const [currentTab, setCurrentTab] = useState('My Friends');

    useEffect(()=> {
        const usr = localStorage.getItem('user');
        setUser(JSON.parse(usr));
    }, []);

    return (<>

        <ul className="nav nav-pills justify-content-center">
          <li className="nav-item mx-3 pointer">
            <button
              className={
                currentTab === "My Friends" || currentTab === "Friend Schedule" ? "nav-link active" : "nav-link"
              }
              onClick={() => setCurrentTab("My Friends")}
            >
              My Friends
            </button>
          </li>
          <li className="nav-item mx-3 pointer">
            <button
              className={
                currentTab === "Add Friend" ? "nav-link active" : "nav-link"
              }
              onClick={() => setCurrentTab("Add Friend")}
            >
              Add Friend
            </button>
          </li>
          <li className="nav-item mx-3 pointer">
            <button
              className={
                currentTab === "My Friend Code" ? "nav-link active" : "nav-link"
              }
              onClick={() => setCurrentTab("My Friend Code")}
            >
              My Friend Code
            </button>
          </li>
        </ul>
        {currentTab === "My Friends" && <MyFriends setCurrentTab={setCurrentTab} user={user} setFriendId={setFriendId} setFriendName={setFriendName}/>}
        {currentTab === "Add Friend" && <AddFriend setCurrentTab={setCurrentTab} user={user}/>}
        {currentTab === "My Friend Code" && 
        <h5 className="my-4 text-center">
            My Temporary Friend code: <br/><br/> <strong>{user.friendship_code}</strong>
        </h5>}
        {currentTab === "Friend Schedule" && <FriendSchedule setCurrentTab={setCurrentTab} friend_id={friendId} friend_name={friendName}/>}


    </>)
}

export { Friends };

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
                        <i className="fa-solid fa-user-group me-4"></i>{el.friend_2_name}
                        </li>
                else
                    return <li key={'friend'+i} className="list-group-item" onClick={() => handleClick(el.friend_1_id, el.friend_1_name)}>
                        <i className="fa-solid fa-user-group me-4"></i>{el.friend_1_name}
                        </li>
            })}
        </ul>}
        
        </>
    )
}