const scheduleArrayBuilder = () => {
    const tempDate = new Date()
    tempDate.setHours(0);
    tempDate.setMinutes(0);
    tempDate.setSeconds(0);
    let blankScheduleArray = [];
    for (let i=0; i<96; i++){
        blankScheduleArray.push({
            id:i, 
            time: `${tempDate.getHours()}:${tempDate.getMinutes()}`,
            monday: false,
            tuesday: false,
            wednesday: false,
            thursday: false,
            friday: false,
            saturday: false,
            sunday: false
        })
        tempDate.setMinutes(tempDate.getMinutes() + 15)
    }
    return blankScheduleArray;
};
    
const blankSchedule = scheduleArrayBuilder();

export { blankSchedule };