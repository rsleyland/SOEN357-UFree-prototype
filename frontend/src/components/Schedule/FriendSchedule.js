import { useEffect, useState } from "react";
import { scheduleArrayBuilder } from "./ScheduleBlank";
import axios from 'axios';
import { toast } from "react-toastify";
import { formatFirstName, formatFullName } from "../../utility/formatters";


const FriendSchedule = ({friend_id, friend_name, setCurrentTab}) => {

    const [startTime, setStartTime] = useState(9);
    const [endTime, setEndTime] = useState(20);
    const [scheduleArray, setScheduleArray] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    //grab and store schedule
    useEffect(()=> {
        const getSchedule = async () => {
            try {
                setIsLoading(true);
                const body = {friend_id : friend_id}
                const response = await axios.post(`http://localhost:5000/schedule/friend`, body);
                if (response.data && response.data.data) setScheduleArray(response.data.data);
                else {
                    setScheduleArray(scheduleArrayBuilder(false));
                    toast.info(`${formatFirstName(friend_name.split(" ")[0])}\'s schedule is unfilled`)
                }
                setIsLoading(false);
            } catch (error) {
                console.log(error.message)
                setIsLoading(false);
            }
        };getSchedule();
    }, []);

    
    return (
        <>
        <h3 className="mt-3">{formatFullName(friend_name)}'s Schedule</h3>
        <div id="friend-schedule-go-back-div">
            <button className="btn btn-secondary btn-sm" onClick={() => setCurrentTab('My Friends')}><i class="fa-solid fa-circle-arrow-left me-2"></i>Go Back</button>
        </div>
        <div className="mt-2">
            <label className="me-3" htmlFor="">From</label>
            <select className="me-3" value={`${startTime}`} onChange={(e) => setStartTime(e.target.value)}>
                {[...Array(24)].map((e, i) => {
                   if (i < endTime) return <option key={"startTimeKey"+i} value={i}>{i < 10 ? "0"+i : i}:00</option>;
                })}
            </select>
            <label className="me-3" htmlFor="">To</label>
            <select className="me-3" value={`${endTime}`} onChange={(e) => setEndTime(e.target.value)}>
                {[...Array(25)].map((e, i) => {
                    if (i > startTime) return <option key={"endTimeKey"+i} value={i}>{i < 10 ? "0"+i : i}:00</option>;
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
                    <th>Mon</th>
                    <th>Tues</th>
                    <th>Weds</th>
                    <th>Thurs</th>
                    <th>Fri</th>
                    <th className="bg-secondary">Sat</th>
                    <th className="bg-secondary" id="table-tr">Sun</th>
                </tr>
            </thead>
            <tbody>
                { scheduleArray && scheduleArray.map((el, i) => {
                    if (parseInt(el.time.split(':')[0]) >= parseInt(startTime) && parseInt(el.time.split(':')[0]) < parseInt(endTime)) 
                    return (
                        <tr id={"table-row-"+i} key={i} className="table-row">
                            {i%4===0 &&<th rowSpan={4} className="time-header"><div>{el.time.split(':')[0]}:{el.time.split(':')[1]}0</div></th>}
                            <td data-day={'monday'} className={el.monday ? "time-selected" : ''}>{el.monday ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-xmark"></i>}</td>
                            <td data-day={'tuesday'} className={el.tuesday ? "time-selected" : ''}>{el.tuesday ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-xmark"></i>}</td>
                            <td data-day={'wednesday'} className={el.wednesday ? "time-selected" : ''}>{el.wednesday ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-xmark"></i>}</td>
                            <td data-day={'thursday'} className={el.thursday ? "time-selected" : ''}>{el.thursday ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-xmark"></i>}</td>
                            <td data-day={'friday'} className={el.friday ? "time-selected" : ''}>{el.friday ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-xmark"></i>}</td>
                            <td data-day={'saturday'} className={el.saturday ? "time-selected" : ''}>{el.saturday ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-xmark"></i>}</td>
                            <td data-day={'sunday'} className={el.sunday ? "time-selected" : ''}>{el.sunday ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-xmark"></i>}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </>}
        </>
        
    )
}

export { FriendSchedule };