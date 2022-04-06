import { useEffect, useState } from "react";
import { scheduleArrayBuilder } from "./ScheduleBlank";
import axios from 'axios';
import { toast } from "react-toastify";

const MySchedule = () => {

    const [startTime, setStartTime] = useState(9);
    const [endTime, setEndTime] = useState(20);
    const [scheduleArray, setScheduleArray] = useState([]);
    const [mouseDown, setMouseDown] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    //grab and store schedule, if not one in DB then use scheduleArrayBuilder
    useEffect(()=> {
        const getSchedule = async() => {
            try {
                setIsLoading(true);
                const response = await axios.get(`http://localhost:5000/schedule/my`);
                if (response.data.data) setScheduleArray(response.data.data);
                else setScheduleArray(scheduleArrayBuilder());
                setIsLoading(false);
            } catch (error) {
                console.log(error.message)
                setIsLoading(false);
            }
        };getSchedule();
    }, []);

    //Drag and select helper function - checks if event happenend on a td element
    const checkAndUpdateIfIsTDElement = (ev) => {
        let day = null;
        let index = null;
        if (ev.path[0]['tagName'] ==='I') {
            if (ev.path[1]['tagName'] ==='TD'){
                day = ev.path[1].getAttribute('data-day');
                index = ev.path[2].getAttribute('id').substr(10,2);
                handleClick(day, index)
            }
        }
        else if (ev.path[0]['tagName'] ==='TD'){
                day = ev.path[0].getAttribute('data-day');
                index = ev.path[1].getAttribute('id').substr(10,2);
                handleClick(day, index)
        }
    }

    //Saves schedule to DB
    const saveSchedule = async () => {
        try {
            const body = { schedule : scheduleArray };
            await axios.post(`http://localhost:5000/schedule/save`, body);
            toast.success(`Schedule saved successfully`);
        } catch (error) {
            console.log(error)
            toast.error("There was an error saving your schedule - please try again");
        } 
    };

    const isLastRow = () => {

    }
    //event listeners for drag select functionality
    useEffect(()=> {
        const handleDocumentMouseOver = event => {
            checkAndUpdateIfIsTDElement(event);
        };
        // mouse down = add mouseover event
        const handleDocumentMouseDown = event => {
            checkAndUpdateIfIsTDElement(event);
            document.addEventListener('mouseover', handleDocumentMouseOver);
            setMouseDown(true);
        };
        // mouse up = remove mouseover event
        const handleDocumentMouseUp = event => {
            document.removeEventListener('mouseover', handleDocumentMouseOver);
            setMouseDown(false);
        };
        document.addEventListener('mousedown', handleDocumentMouseDown);
        document.addEventListener('mouseup', handleDocumentMouseUp);
        if (mouseDown) document.addEventListener('mouseover', handleDocumentMouseOver); //Need to re-add the event listener for each render cycle (as will be removed when first event is fired and rerenders the component)
        return () => {
            document.removeEventListener('mousedown', handleDocumentMouseDown);
            document.removeEventListener('mouseup', handleDocumentMouseUp);
            document.removeEventListener('mouseover', handleDocumentMouseOver);
        }
    });

    //Simulate the clicking of the td elements to select, negates the boolean for the date
    const handleClick = (day, index) => {
        try {
            let tempArray = [...scheduleArray];
            tempArray[index][day] = !tempArray[index][day];
            setScheduleArray(tempArray);
        } catch (error) {
            console.log(error);
        }
    };

    //Clears the table by setting the array to a fresh scheduleArray
    const clearTable = () => {
        setScheduleArray(scheduleArrayBuilder());
    }
    
    return (
        <>
        <h3>Set Your Schedule</h3>
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
                    <th className="time-header"></th>
                    <th>Mon</th>
                    <th>Tues</th>
                    <th>Weds</th>
                    <th>Thurs</th>
                    <th>Fri</th>
                    <th className="bg-secondary">Sat</th>
                    <th className="bg-secondary">Sun</th>
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
        <div className="d-flex flex-column align-items-center">
            <button onClick={saveSchedule} className="btn btn-primary w-100">Save Schedule</button>
            <button onClick={clearTable} className="btn btn-danger mx-5 my-3">Clear</button>
        </div></>}
        </>
        
    )
}

export { MySchedule };