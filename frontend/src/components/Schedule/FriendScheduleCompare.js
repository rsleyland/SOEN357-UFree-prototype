import { useEffect, useState } from "react";
import { scheduleArrayBuilder } from "./ScheduleBlank";
import axios from 'axios';
import { toast } from "react-toastify";
import { compareLNameFNameDescSched, formatFullName } from "../../utility/formatters";


// Component to compare all currents user's friend's schedules. Lists friends names which are toggleable, 
// once toggled their schedule will be added to the schedule table. 
const FriendScheduleCompare = ({user}) => {

    const [startTime, setStartTime] = useState(9);
    const [endTime, setEndTime] = useState(20);
    const [responseData, setResponseData] = useState([]);
    const [mergedSchedule, setMergedSchedule] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [smallScreen, setSmallScreen] = useState(false);

    //grab and store schedules
    useEffect(()=> {
        const getAndSetSchedules = async () => {
            try {
                setIsLoading(true);
                const response = await axios.post(`/schedule/friend/compare`);
                if (response) {
                    response.data.map((el) => {
                        if (el.user === user._id) {
                            el.owner = true;
                            if (el.noSchedule) toast.info("You have not set your schedule yet.")
                        }
                        el.checked = false;
                        el.current = false;
                        return el;
                    })
                    setResponseData(sortOrderData(response.data));
                    // const currentUser = response.data.find(el => el.user === user._id)
                    setMergedSchedule(scheduleArrayBuilder(false));
                }
                setIsLoading(false);
            } catch (error) {
                console.log(error.message)
                setIsLoading(false);
            }
        };getAndSetSchedules();
    }, []);

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

      //event listeners for highlight reset functionality (click off table)
      useEffect(()=> {
        const handleDocumentClick = event => {
            checkAndUpdateIfIsTDElement(event);
        };
        document.addEventListener('click', handleDocumentClick);
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        }
    });

    const sortOrderData = (data) => {
        const sorted = data.sort(compareLNameFNameDescSched)
        return sorted;
    }


    const handleToggle = (id, e) => {
        setResponseData(responseData.map((el) => {
            if (el.user === id) {
                el.checked = e.target.checked;
            }
            return el;
        }))
        createMergedSchedule();
    }

    const createMergedSchedule = () => {
        setMergedSchedule(mergedSchedule.map((el, i) => {
            el.mon_count = 0;
            el.tues_count = 0;
            el.weds_count = 0;
            el.thurs_count = 0;
            el.fri_count = 0;
            el.sat_count = 0;
            el.sun_count = 0;
            for (let i1 in responseData){
                if (responseData[i1].checked && responseData[i1].data) {
                    if (responseData[i1].data[i].monday) el.mon_count +=1
                    if (responseData[i1].data[i].tuesday) el.tues_count +=1
                    if (responseData[i1].data[i].wednesday) el.weds_count +=1
                    if (responseData[i1].data[i].thursday) el.thurs_count +=1
                    if (responseData[i1].data[i].friday) el.fri_count +=1
                    if (responseData[i1].data[i].saturday) el.sat_count +=1
                    if (responseData[i1].data[i].sunday) el.sun_count +=1
                }
            }
            return el;
        }))
    }

    const handleClick = (day, index) => {
        let copyDate = [...responseData];
        if (index === -1) {
            for (let i in copyDate) {
                copyDate[i].current = false;
            }
        }
        else {
            for (let i in copyDate) {
                if (copyDate[i].data) {
                    if (copyDate[i].data[index][day] && copyDate[i].checked) {
                        copyDate[i]['current'] = true;
                    }
                    else copyDate[i].current = false;
                }
                else copyDate[i].current = false;
            }
        }
        setResponseData(copyDate);
    }

    const checkAndUpdateIfIsTDElement = (ev) => {
        try {
            let day = null;
            let index = null;
            if (ev.target['nodeName'] ==='I') {
                if (ev.target.parentElement['nodeName'] ==='TD'){
                    day = ev.target.parentElement.getAttribute('data-day');
                    index = ev.target.parentElement.parentElement.getAttribute('id').substr(10,2);
                    handleClick(day, index)
                }
            }
            else if (ev.target['nodeName'] ==='TD'){
                    day = ev.target.getAttribute('data-day');
                    index = ev.target.parentElement.getAttribute('id').substr(10,2);
                    handleClick(day, index)
            }
            else handleClick('', -1);
        } catch (error) {
            handleClick('', -1);
        }
    }

    
    return (<>
        <h3 className="mt-3">Compare Schedules</h3>
        <p id="compare-sched-helptext" className="text-center">1) Toggle friends to add to the schedule<br/>2) Click on time slot to highlight available friends</p>
        { isLoading ? 
                <div className="spinner-border mt-3" styles={{width: "3rem", height: "3rem"}} role="status">
                    <span className="sr-only">Loading...</span>
                </div>

                :

        <div className="row w-100 justify-content-evenly">
            <div className="col-lg-3 col-10 bg-light my-3 rounded-2">

            {responseData && responseData.length > 0 ?
                <table className="table">
                    <tbody>
                        { responseData.map((el, i) => (
                            <tr className={el.current ? "green-text friends-list" : el.owner ? "owner-text friends-list" : "friends-list"} key={'compare-user-'+i}>
                                <td className="d-flex align-items-center justify-content-between">
                                <div className="form-check form-switch">
                                    <input className="form-check-input" disabled={el.noSchedule} checked={el.checked} onChange={(e) => handleToggle(el.user, e)} type="checkbox" />
                                </div>
                                    {formatFullName(el.name)} 
                                    {el.owner &&<i className="owner-icon fa-solid fa-user"></i>}
                                    <i className={el.noSchedule ?  "no-schedule fa-solid fa-calendar-xmark" : "fa-solid fa-calendar-xmark invisible"}></i>
                                </td>
                                </tr>
                        ))}
                    </tbody>
                </table>: <h5 className="text-center p-2 mt-2">No friends to compare</h5>}
            </div>
            <div className="col-lg-8 col-12 d-flex flex-column align-items-center text-white bg-light rounded-2 my-3">
                <div className="d-flex justify-content-around mt-2 w-75">
                    <div className="d-flex justify-content-evenly align-items-center">
                        <label className="text-black mx-1">From:</label>
                        <select value={`${startTime}`} onChange={(e) => setStartTime(e.target.value)}>
                            {[...Array(24)].map((e, i) => {
                            if (i < endTime) return <option key={"startTimeKey"+i} value={i}>{i < 10 ? "0"+i : i}:00</option>;
                            return null;
                            })}
                        </select>
                    </div>
                    <div className="d-flex justify-content-evenly align-items-center">
                        <label className="text-black mx-1">To:</label>
                        <select value={`${endTime}`} onChange={(e) => setEndTime(e.target.value)}>
                            {[...Array(25)].map((e, i) => {
                                if (i > startTime) return <option key={"endTimeKey"+i} value={i}>{i < 10 ? "0"+i : i}:00</option>;
                                return null;
                            })}
                        </select>
                    </div>
                    
                </div>
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
                    <tbody id="schedule-compare-body">
                        { mergedSchedule && mergedSchedule.map((el, i) => {
                            if (parseInt(el.time.split(':')[0]) >= parseInt(startTime) && parseInt(el.time.split(':')[0]) < parseInt(endTime)) 
                            return (
                                <tr id={"table-row-"+i} key={i} className="table-row">
                                    {i%4===0 &&<th rowSpan={4} className="time-header"><div>{el.time.split(':')[0]}:{el.time.split(':')[1]}0</div><div>{el.time.split(':')[0]}:30</div></th>}
                                    <td data-day={'monday'} onClick={checkAndUpdateIfIsTDElement} className={el.mon_count && el.mon_count > 5 ? `compare-lvl-6` : `compare-lvl-${el.mon_count}`}>
                                        {!el.mon_count ? <i className="fa-solid fa-xmark"></i> :
                                            (el.mon_count!== 1 && smallScreen) || el.mon_count > 3 ? <i className={`fa-solid fa-${el.mon_count}`}></i> :
                                         [...Array(el.mon_count)].map((e, i) => (
                                            <i key={'checkmark-mon-'+i} className="fa-solid fa-check"></i>
                                        ))}
                                    </td>
                                    <td data-day={'tuesday'} onClick={checkAndUpdateIfIsTDElement} className={el.tues_count && el.tues_count > 5 ? `compare-lvl-6` : `compare-lvl-${el.tues_count}`}>
                                        {!el.tues_count ? <i className="fa-solid fa-xmark"></i> :
                                        (el.tues_count!== 1 && smallScreen) || el.tues_count > 3 ? <i className={`fa-solid fa-${el.tues_count}`}></i> :
                                        [...Array(el.tues_count)].map((e, i) => (
                                            <i key={'checkmark-tues-'+i} className="fa-solid fa-check"></i>
                                        ))}
                                    </td>
                                    <td data-day={'wednesday'} onClick={checkAndUpdateIfIsTDElement} className={el.weds_count && el.weds_count > 5 ? `compare-lvl-6` : `compare-lvl-${el.weds_count}`}>
                                        {!el.weds_count ? <i className="fa-solid fa-xmark"></i> : 
                                        (el.weds_count!== 1 && smallScreen) || el.weds_count > 3 ? <i className={`fa-solid fa-${el.weds_count}`}></i> :
                                        [...Array(el.weds_count)].map((e, i) => (
                                            <i key={'checkmark-weds-'+i} className="fa-solid fa-check"></i>
                                        ))}
                                    </td>
                                    <td data-day={'thursday'} onClick={checkAndUpdateIfIsTDElement} className={el.thurs_count && el.thurs_count > 5 ? `compare-lvl-6` : `compare-lvl-${el.thurs_count}`}>
                                        {!el.thurs_count ? <i className="fa-solid fa-xmark"></i> :
                                        (el.thurs_count!== 1 && smallScreen) || el.thurs_count > 3 ? <i className={`fa-solid fa-${el.thurs_count}`}></i> :
                                        [...Array(el.thurs_count)].map((e, i) => (
                                            <i key={'checkmark-thurs-'+i} className="fa-solid fa-check"></i>
                                        ))}
                                    </td>
                                    <td data-day={'friday'} onClick={checkAndUpdateIfIsTDElement} className={el.fri_count && el.fri_count > 5 ? `compare-lvl-6` : `compare-lvl-${el.fri_count}`}>
                                        {!el.fri_count ? <i className="fa-solid fa-xmark"></i> :
                                        (el.fri_count!== 1 && smallScreen) || el.fri_count > 3 ? <i className={`fa-solid fa-${el.fri_count}`}></i> :
                                        [...Array(el.fri_count)].map((e, i) => (
                                            <i key={'checkmark-fri-'+i} className="fa-solid fa-check"></i>
                                        ))}
                                    </td>
                                    <td data-day={'saturday'} onClick={checkAndUpdateIfIsTDElement} className={el.sat_count && el.sat_count > 5 ? `compare-lvl-6` : `compare-lvl-${el.sat_count}`}>
                                        {!el.sat_count ? <i className="fa-solid fa-xmark"></i> :
                                        (el.sat_count!== 1 && smallScreen) || el.sat_count > 3 ? <i className={`fa-solid fa-${el.sat_count}`}></i> :
                                        [...Array(el.sat_count)].map((e, i) => (
                                            <i key={'checkmark-sat-'+i} className="fa-solid fa-check"></i>
                                        ))}
                                    </td>
                                    <td data-day={'sunday'} onClick={checkAndUpdateIfIsTDElement} className={el.sun_count && el.sun_count > 5 ? `compare-lvl-6` : `compare-lvl-${el.sun_count}`}>
                                        {!el.sun_count ? <i className="fa-solid fa-xmark"></i> :
                                        (el.sun_count!== 1 && smallScreen) || el.sun_count > 3 ? <i className={`fa-solid fa-${el.sun_count}`}></i> :
                                        [...Array(el.sun_count)].map((e, i) => (
                                            <i key={'checkmark-sun-'+i} className="fa-solid fa-check"></i>
                                        ))}
                                    </td>
                                </tr>
                            );return null;
                        })}
                    </tbody>
                </table>
            </div>
        </div>}</>
    )
}

export { FriendScheduleCompare };