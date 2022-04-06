import { useState, useContext } from "react";
import { FriendSchedule } from "../components/Schedule/FriendSchedule.js";
import { AddFriend } from '../components/Friends/AddFriend.js';
import { MyFriends } from '../components/Friends/MyFriends.js';
import { MyFriendCode } from "../components/Friends/MyFriendCode.js";
import { AuthContext } from "../services/providers/AuthContextProvider.js";


const Friends = () => {

    const { currentUser } = useContext(AuthContext);
    const [friendId, setFriendId] = useState('');
    const [friendName, setFriendName] = useState('');
    const [currentTab, setCurrentTab] = useState('My Friends');


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
        {currentTab === "My Friends" && <MyFriends setCurrentTab={setCurrentTab} user={currentUser} setFriendId={setFriendId} setFriendName={setFriendName}/>}
        {currentTab === "Add Friend" && <AddFriend setCurrentTab={setCurrentTab} user={currentUser}/>}
        {currentTab === "My Friend Code" && <MyFriendCode code={currentUser.friendship_code}/>}
        {currentTab === "Friend Schedule" && <FriendSchedule setCurrentTab={setCurrentTab} friend_id={friendId} friend_name={friendName}/>}


    </>)
}

export { Friends };

