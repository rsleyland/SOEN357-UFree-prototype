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
            monday: true,
            tuesday: true,
            wednesday: true,
            thursday: true,
            friday: true,
            saturday: true,
            sunday: true
        })
        tempDate.setMinutes(tempDate.getMinutes() + 15)
    }
    return blankScheduleArray;
};
    

export { scheduleArrayBuilder };