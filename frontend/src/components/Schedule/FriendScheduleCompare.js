import { useEffect, useState } from "react";
import { scheduleArrayBuilder } from "./ScheduleBlank";
import axios from 'axios';
import { compareLNameFNameDescSched, formatFullName } from "../../utility/formatters";




const FriendScheduleCompare = () => {

    const [startTime, setStartTime] = useState(9);
    const [endTime, setEndTime] = useState(20);
    const [responseData, setResponseData] = useState([]);
    const [mergedSchedule, setMergedSchedule] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    //grab and store schedule
    useEffect(()=> {
        const getSchedules = async () => {
            try {
                setIsLoading(true);
                const response = await axios.post(`/schedule/friend/compare`);
                if (response) {
                    response.data.map((el) => {
                        el.checked = false;
                        return el;
                    })
                    setResponseData(sortOrderData(response.data));
                }
                setIsLoading(false);
            } catch (error) {
                console.log(error.message)
                setIsLoading(false);
            }
        };getSchedules();
        setMergedSchedule(scheduleArrayBuilder(false));
    }, []);

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

    const randomColourRGBStringGenerator = () => {
        const red = Math.floor(Math.random() * 256);  //random int between 0 and 255
        const green = Math.floor(Math.random() * 256);
        const blue = Math.floor(Math.random() * 256);
        return (`rgb(${red}, ${green}, ${blue})`);
    };

    
    return (
        <>
        <h3 className="my-3">Compare Schedules</h3>

        <div className="row mt-2 w-100 justify-content-evenly">
            <div className="col-lg-3 col-10 bg-light my-3 rounded-2 mx-1">
                <table className="table table-striped">
                    <thead>
                        <tr><th className="text-center">Friends</th></tr>
                    </thead>
                    {responseData && 
                        <tbody>
                            { responseData.map((el, i) => (
                                <tr key={'compare-user-'+i}>
                                    <td className="d-flex align-items-center justify-content-between">
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" disabled={el.noSchedule} defaultChecked={false} onChange={(e) => handleToggle(el.user, e)} type="checkbox" />
                                    </div>
                                        {formatFullName(el.name)} <i className={el.noSchedule ? "ms-3 fa-solid fa-calendar-xmark" : "ms-3 fa-solid fa-calendar-xmark invisible"} title="Friend has not set a schedule."></i>
                                    </td>
                                    </tr>
                            ))}
                        </tbody>}
                </table>
            </div>
            <div className="col-lg-8 col-10 d-flex flex-column align-items-center text-white bg-light rounded-2 my-3 mx-1">
                { isLoading ? 
                <div className="spinner-border mt-4" styles={{width: "3rem", height: "3rem"}} role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                :<>
                <div className="mt-2">
                    <label className="me-3" htmlFor="">From</label>
                    <select className="me-3" value={`${startTime}`} onChange={(e) => setStartTime(e.target.value)}>
                        {[...Array(24)].map((e, i) => {
                        if (i < endTime) return <option key={"startTimeKey"+i} value={i}>{i < 10 ? "0"+i : i}:00</option>;
                        return null;
                        })}
                    </select>
                    <label className="me-3" htmlFor="">To</label>
                    <select className="me-3" value={`${endTime}`} onChange={(e) => setEndTime(e.target.value)}>
                        {[...Array(25)].map((e, i) => {
                            if (i > startTime) return <option key={"endTimeKey"+i} value={i}>{i < 10 ? "0"+i : i}:00</option>;
                            return null;
                        })}
                    </select>
                </div>
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
                    <tbody id="schedule-compare-body">
                        { mergedSchedule && mergedSchedule.map((el, i) => {
                            if (parseInt(el.time.split(':')[0]) >= parseInt(startTime) && parseInt(el.time.split(':')[0]) < parseInt(endTime)) 
                            return (
                                <tr id={"table-row-"+i} key={i} className="table-row">
                                    {i%4===0 &&<th rowSpan={4} className="time-header"><div>{el.time.split(':')[0]}:{el.time.split(':')[1]}0</div><div>{el.time.split(':')[0]}:30</div></th>}
                                    <td className={el.mon_count && el.mon_count > 5 ? `compare-lvl-6` : `compare-lvl-${el.mon_count}`}>
                                        {!el.mon_count ? <i className="fa-solid fa-xmark"></i> :
                                            el.mon_count > 3 ? <i className={`fa-solid fa-${el.mon_count}`}></i> :
                                         [...Array(el.mon_count)].map((e, i) => (
                                            <i key={'checkmark-mon-'+i} className="fa-solid fa-check"></i>
                                        ))}
                                    </td>
                                    <td className={el.tues_count && el.tues_count > 5 ? `compare-lvl-6` : `compare-lvl-${el.tues_count}`}>
                                        {!el.tues_count ? <i className="fa-solid fa-xmark"></i> :
                                        el.tues_count > 3 ? <i className={`fa-solid fa-${el.tues_count}`}></i> :
                                        [...Array(el.tues_count)].map((e, i) => (
                                            <i key={'checkmark-tues-'+i} className="fa-solid fa-check"></i>
                                        ))}
                                    </td>
                                    <td  className={el.weds_count && el.weds_count > 5 ? `compare-lvl-6` : `compare-lvl-${el.weds_count}`}>
                                        {!el.weds_count ? <i className="fa-solid fa-xmark"></i> : 
                                        el.weds_count > 3 ? <i className={`fa-solid fa-${el.weds_count}`}></i> :
                                        [...Array(el.weds_count)].map((e, i) => (
                                            <i key={'checkmark-weds-'+i} className="fa-solid fa-check"></i>
                                        ))}
                                    </td>
                                    <td className={el.thurs_count && el.thurs_count > 5 ? `compare-lvl-6` : `compare-lvl-${el.thurs_count}`}>
                                        {!el.thurs_count ? <i className="fa-solid fa-xmark"></i> :
                                        el.thurs_count > 3 ? <i className={`fa-solid fa-${el.thurs_count}`}></i> :
                                        [...Array(el.thurs_count)].map((e, i) => (
                                            <i key={'checkmark-thurs-'+i} className="fa-solid fa-check"></i>
                                        ))}
                                    </td>
                                    <td className={el.fri_count && el.fri_count > 5 ? `compare-lvl-6` : `compare-lvl-${el.fri_count}`}>
                                        {!el.fri_count ? <i className="fa-solid fa-xmark"></i> :
                                        el.fri_count > 3 ? <i className={`fa-solid fa-${el.fri_count}`}></i> :
                                        [...Array(el.fri_count)].map((e, i) => (
                                            <i key={'checkmark-fri-'+i} className="fa-solid fa-check"></i>
                                        ))}
                                    </td>
                                    <td className={el.sat_count && el.sat_count > 5 ? `compare-lvl-6` : `compare-lvl-${el.sat_count}`}>
                                        {!el.sat_count ? <i className="fa-solid fa-xmark"></i> :
                                        el.sat_count > 3 ? <i className={`fa-solid fa-${el.sat_count}`}></i> :
                                        [...Array(el.sat_count)].map((e, i) => (
                                            <i key={'checkmark-sat-'+i} className="fa-solid fa-check"></i>
                                        ))}
                                    </td>
                                    <td className={el.sun_count && el.sun_count > 5 ? `compare-lvl-6` : `compare-lvl-${el.sun_count}`}>
                                        {!el.sun_count ? <i className="fa-solid fa-xmark"></i> :
                                        el.sun_count > 3 ? <i className={`fa-solid fa-${el.sun_count}`}></i> :
                                        [...Array(el.sun_count)].map((e, i) => (
                                            <i key={'checkmark-sun-'+i} className="fa-solid fa-check"></i>
                                        ))}
                                    </td>
                                </tr>
                            );return null;
                        })}
                    </tbody>
                </table>
                </>}
            </div>
        </div>

    

        </>
    )
}

export { FriendScheduleCompare };