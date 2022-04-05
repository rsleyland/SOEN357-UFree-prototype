import { useEffect, useState } from "react";
import { blankSchedule } from "./ScheduleBlank";

const Schedule = () => {

    const [startTime, setStartTime] = useState(9);
    const [endTime, setEndTime] = useState(20);
    const [scheduleArray, setScheduleArray] = useState([]);
    const [mouseDown, setMouseDown] = useState(false);
    let date = new Date();
    date.setHours(startTime);
    date.setMinutes(0);
    date.setSeconds(0);

    //grab and store blank schedule
    useEffect(()=> {
        setScheduleArray(blankSchedule);
    }, []);

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

    //event listeners
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

    const handleClick = (day, index) => {
        try {
            let tempArray = [...scheduleArray];
            switch (day){
                case 'mon':
                    tempArray[index].monday = !tempArray[index].monday;
                    break
                case 'tues':
                    tempArray[index].tuesday = !tempArray[index].tuesday;
                    break
                case 'weds':
                    tempArray[index].wednesday = !tempArray[index].wednesday;
                    break
                case 'thurs':
                    tempArray[index].thursday = !tempArray[index].thursday;
                    break
                case 'fri':
                    tempArray[index].friday = !tempArray[index].friday;
                    break
                case 'sat':
                    tempArray[index].saturday = !tempArray[index].saturday;
                    break
                case 'sun':
                    tempArray[index].sunday = !tempArray[index].sunday;
                    break
                default: break
            }
            setScheduleArray(tempArray);
        } catch (error) {
            console.log(error);
        }
    };

    


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
        <table id="schedule-table" className="mb-5">
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
                            <td data-day={'mon'} className={el.monday ? "time-selected" : ''}>{el.monday ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-xmark"></i>}</td>
                            <td data-day={'tues'} className={el.tuesday ? "time-selected" : ''}>{el.tuesday ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-xmark"></i>}</td>
                            <td data-day={'weds'} className={el.wednesday ? "time-selected" : ''}>{el.wednesday ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-xmark"></i>}</td>
                            <td data-day={'thurs'} className={el.thursday ? "time-selected" : ''}>{el.thursday ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-xmark"></i>}</td>
                            <td data-day={'fri'} className={el.friday ? "time-selected" : ''}>{el.friday ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-xmark"></i>}</td>
                            <td data-day={'sat'} className={el.saturday ? "time-selected" : ''}>{el.saturday ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-xmark"></i>}</td>
                            <td data-day={'sun'} className={el.sunday ? "time-selected" : ''}>{el.sunday ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-xmark"></i>}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table></>
        
    )
}

export { Schedule };