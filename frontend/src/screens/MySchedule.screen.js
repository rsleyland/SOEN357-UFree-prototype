import { useEffect, useState } from "react";
import { scheduleArrayBuilder } from "../components/Schedule/ScheduleBlank.js";
import axios from 'axios';
import { toast } from "react-toastify";

// Screen which will display current users saved schedule or a fresh schedule using the scheduleArrayBuilders returned array.
const MySchedule = () => {

    const [startTime, setStartTime] = useState(9);
    const [endTime, setEndTime] = useState(20);
    const [scheduleArray, setScheduleArray] = useState([]);
    const [mouseDown, setMouseDown] = useState(false);
    const [touchDown, setTouchDown] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [smallScreen, setSmallScreen] = useState(false);

    //grab and store schedule, if not one in DB then use scheduleArrayBuilder
    useEffect(()=> {
        const getSchedule = async() => {
            try {
                setIsLoading(true);
                const response = await axios.get(`/schedule/my`);
                if (response.data.data) setScheduleArray(response.data.data);
                else {
                    setScheduleArray(scheduleArrayBuilder(true));
                    toast.info('Please set your schedule')
                }
                setIsLoading(false);
            } catch (error) {
                console.log(error.message)
                setIsLoading(false);
            }
        };getSchedule();

        if (window.innerWidth < 672) setSmallScreen(true);
        function handleResize() {
          const width = window.innerWidth;
          if (window.innerWidth < 672) setSmallScreen(true);
          else setSmallScreen(false);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    //Drag and select helper function - checks if event happenend on a td element
    const checkAndUpdateIfIsTDElement = (ev) => {
        let day = null;
        let index = null;
        if (ev.target['nodeName'] ==='I') {
            if (ev.target.parentElement['nodeName'] ==='TD'){
                day = ev.target.parentElement.getAttribute('data-day');
                index = ev.target.parentElement.parentElement.getAttribute('id').substr(10,2);
                handleClick(day, index);
                return true;
            }
        }
        else if (ev.target['nodeName'] ==='TD'){
                day = ev.target.getAttribute('data-day');
                index = ev.target.parentElement.getAttribute('id').substr(10,2);
                handleClick(day, index);
                return true;
        }
        else return false;
    }

    const checkAndUpdateIfIsTDElementMobile = (target) => {
        let day = null;
        let index = null;
        if (target['nodeName'] ==='I') {
            if (target.parentElement['nodeName'] ==='TD'){
                day = target.parentElement.getAttribute('data-day');
                index = target.parentElement.parentElement.getAttribute('id').substr(10,2);
                handleClick(day, index);
                return true;
            }
        }
        else if (target['nodeName'] ==='TD'){
                day = target.getAttribute('data-day');
                index = target.parentElement.getAttribute('id').substr(10,2);
                handleClick(day, index);
                return true;
        }
        else return false;
    }

    //Saves schedule to DB
    const saveSchedule = async () => {
        try {
            const body = { schedule : scheduleArray };
            await axios.post(`/schedule/save`, body);
            toast.success(`Schedule saved successfully`);
        } catch (error) {
            console.log(error)
            toast.error("There was an error saving your schedule - please try again");
        } 
    };

    // event listeners for drag select functionality
    useEffect(()=> {
        const handleDocumentMouseOver = event => {
            if (!touchDown && mouseDown) checkAndUpdateIfIsTDElement(event);
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

    //event listeners for drag select functionality (MOBILE)
    useEffect(()=> {
        const handleDocumentTouchMove = event => {
            event.preventDefault();
            const target = document.elementFromPoint(event.changedTouches[0].clientX, event.changedTouches[0].clientY)
            if (mouseDown) setMouseDown(false);
            checkAndUpdateIfIsTDElementMobile(target);
        };
        const handleDocumentTouchDown = event => {
            const result = checkAndUpdateIfIsTDElement(event);
            if (result) {
                console.log("TRUE")
                event.preventDefault();
                document.addEventListener('touchmove', handleDocumentTouchMove);
                setTouchDown(true);
            }
        };
        const handleDocumentTouchUp = event => {
            document.removeEventListener('touchmove', handleDocumentTouchMove);
            setTouchDown(false);
        };
        document.addEventListener('touchstart', handleDocumentTouchDown, { passive: false });
        document.addEventListener('touchend', handleDocumentTouchUp, { passive: false });
        if (touchDown) document.addEventListener('touchmove', handleDocumentTouchMove, { passive: false }); //Need to re-add the event listener for each render cycle (as will be removed when first event is fired and rerenders the component)
        return () => {
            document.removeEventListener('touchstart', handleDocumentTouchDown);
            document.removeEventListener('touchend', handleDocumentTouchUp);
            document.removeEventListener('touchmove', handleDocumentTouchMove);
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
        setScheduleArray(scheduleArrayBuilder(true));
    }
    
    return (
        <>
        <h3>Set Your Schedule</h3>
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
                    <th id="table-tr" className="bg-secondary">{smallScreen ? 'S' : 'Sun'}</th>
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
        <div className="schedule-btns">
            <button onClick={saveSchedule} className="btn btn-success">Save Schedule</button>
            <button onClick={clearTable} className="btn btn-purple">Reset</button>
        </div></>}
        </>
        
    )
}

export { MySchedule };