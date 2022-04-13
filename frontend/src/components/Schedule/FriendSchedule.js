import { useEffect, useState } from "react";
import { scheduleArrayBuilder } from "./ScheduleBlank";
import axios from 'axios';
import { toast } from "react-toastify";
import { formatFirstName, formatFullName } from "../../utility/formatters";

// Component which gets and displays friends schedule which corresponds to passed friend_id
const FriendSchedule = ({friend_id, friend_name, setCurrentTab}) => {

    const [startTime, setStartTime] = useState(9);
    const [endTime, setEndTime] = useState(20);
    const [scheduleArray, setScheduleArray] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [smallScreen, setSmallScreen] = useState(false);

    //grab and store schedule
    useEffect(()=> {
        const getSchedule = async () => {
            try {
                setIsLoading(true);
                const body = {friend_id : friend_id}
                const response = await axios.post(`/schedule/friend`, body);
                if (response.data && response.data.data) setScheduleArray(response.data.data);
                else {
                    setScheduleArray(scheduleArrayBuilder(false));
                    toast.info(`${formatFirstName(friend_name.split(" ")[0])}'s schedule is unfilled`)
                }
                setIsLoading(false);
            } catch (error) {
                console.log(error.message)
                setIsLoading(false);
            }
        };getSchedule();
    }, [friend_id, friend_name]);

    useEffect(() => {
        if (window.innerWidth < 672) setSmallScreen(true);
        function handleResize() {
          const width = window.innerWidth;
          if (window.innerWidth < 672) setSmallScreen(true);
          else setSmallScreen(false);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);

    
    return (
        <>
        <h3 className="mt-3">{formatFullName(friend_name)}'s Schedule</h3>
        {/* <div id="friend-schedule-go-back-div">
            <button onClick={() => setCurrentTab('My Friends')}><i className="fa-solid fa-circle-arrow-left me-2"></i>Go Back</button>
        </div> */}
        <div className="mt-2">
            <label className="me-3" htmlFor="">From:</label>
            <select className="me-3" value={`${startTime}`} onChange={(e) => setStartTime(e.target.value)}>
                {[...Array(24)].map((e, i) => {
                   if (i < endTime) return <option key={"startTimeKey"+i} value={i}>{i < 10 ? "0"+i : i}:00</option>;
                   return null;
                })}
            </select>
            <label className="me-3" htmlFor="">To:</label>
            <select className="me-3" value={`${endTime}`} onChange={(e) => setEndTime(e.target.value)}>
                {[...Array(25)].map((e, i) => {
                    if (i > startTime) return <option key={"endTimeKey"+i} value={i}>{i < 10 ? "0"+i : i}:00</option>;
                    return null;
                })}
            </select>
            
        </div>
        { isLoading ? 
            <div className="spinner-border mt-4" styles={{width: "3rem", height: "3rem"}} role="status">
            <span className="sr-only">Loading...</span>
          </div>
        :<>
        <table id="schedule-table" className="mb-4">
            <thead>
                <tr>
                <th className="time-header" id="table-tl"></th>
                    <th>{smallScreen ? 'M' : 'Monday'}</th>
                    <th>{smallScreen ? 'T' : 'Tues'}</th>
                    <th>{smallScreen ? 'W' : 'Weds'}</th>
                    <th>{smallScreen ? 'T' : 'Thurs'}</th>
                    <th>{smallScreen ? 'F' : 'Fri'}</th>
                    <th className="bg-secondary">{smallScreen ? 'S' : 'Sat'}</th>
                    <th className="bg-secondary">{smallScreen ? 'S' : 'Sun'}</th>
                </tr>
            </thead>
            <tbody>
                { scheduleArray && scheduleArray.map((el, i) => {
                    if (parseInt(el.time.split(':')[0]) >= parseInt(startTime) && parseInt(el.time.split(':')[0]) < parseInt(endTime)) 
                    return (
                        <tr id={"table-row-"+i} key={i} className="table-row">
                            {i%4===0 &&<th rowSpan={4} className="time-header"><div>{el.time.split(':')[0]}:{el.time.split(':')[1]}0</div><div>{el.time.split(':')[0]}:30</div></th>}
                            <td data-day={'monday'} className={el.monday ? "time-selected" : ''}>{el.monday ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-xmark"></i>}</td>
                            <td data-day={'tuesday'} className={el.tuesday ? "time-selected" : ''}>{el.tuesday ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-xmark"></i>}</td>
                            <td data-day={'wednesday'} className={el.wednesday ? "time-selected" : ''}>{el.wednesday ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-xmark"></i>}</td>
                            <td data-day={'thursday'} className={el.thursday ? "time-selected" : ''}>{el.thursday ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-xmark"></i>}</td>
                            <td data-day={'friday'} className={el.friday ? "time-selected" : ''}>{el.friday ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-xmark"></i>}</td>
                            <td data-day={'saturday'} className={el.saturday ? "time-selected" : ''}>{el.saturday ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-xmark"></i>}</td>
                            <td data-day={'sunday'} className={el.sunday ? "time-selected" : ''}>{el.sunday ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-xmark"></i>}</td>
                        </tr>
                    );return null;
                })}
            </tbody>
        </table>
        </>}
        </>
        
    )
}

export { FriendSchedule };