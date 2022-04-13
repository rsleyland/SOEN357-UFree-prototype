import { useState, useContext } from "react";
import { FriendSchedule } from "../components/Schedule/FriendSchedule.js";
import { AddFriend } from '../components/Friends/AddFriend.js';
import { MyFriends } from '../components/Friends/MyFriends.js';
import { MyFriendCode } from "../components/Friends/MyFriendCode.js";
import { AuthContext } from "../services/providers/AuthContextProvider.js";
import { FriendScheduleCompare } from "../components/Schedule/FriendScheduleCompare.js";

// Screen which contains all friend components
const Friends = () => {

    const { currentUser } = useContext(AuthContext);
    const [friendId, setFriendId] = useState('');
    const [friendName, setFriendName] = useState('');
    const [currentTab, setCurrentTab] = useState('My Friends');


    return (<>

        <ul className="nav nav-pills w-100 justify-content-evenly">
          <li className="nav-item pointer my-2">
            <button
              className={
                currentTab === "My Friends" || currentTab === "Friend Schedule" || currentTab === "Friend Schedule Compare" ? "nav-link btn-purple" : "nav-link"
              }
              onClick={() => setCurrentTab("My Friends")}
            >
              My Friends
            </button>
          </li>
          <li className="nav-item pointer my-2">
            <button
              className={
                currentTab === "Compare Schedules" ? "nav-link btn-purple" : "nav-link"
              }
              onClick={() => setCurrentTab("Compare Schedules")}
            >
              Compare Schedules
            </button>
          </li>
          <li className="nav-item pointer my-2">
            <button
              className={
                currentTab === "Add Friend" ? "nav-link btn-purple" : "nav-link"
              }
              onClick={() => setCurrentTab("Add Friend")}
            >
              Add Friend
            </button>
          </li>
          <li className="nav-item pointer my-2">
            <button
              className={
                currentTab === "My Friend Code" ? "nav-link btn-purple" : "nav-link"
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
        {currentTab === "Compare Schedules" && <FriendScheduleCompare  user={currentUser}/>}


    </>)
}

export { Friends };

