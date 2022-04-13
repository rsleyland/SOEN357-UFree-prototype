// Function to generate array with schedule table values. Schedule is seperated into 15 minute timeslots. 24x4 = 96 rows [{mon-sun},...]
const scheduleArrayBuilder = (buildTrue) => {
    const tempDate = new Date()
    tempDate.setHours(0);
    tempDate.setMinutes(0);
    tempDate.setSeconds(0);
    let blankScheduleArray = [];
    for (let i=0; i<96; i++){
        if (i >= 36 && i < 80) {
            blankScheduleArray.push({
                id:i, 
                time: `${tempDate.getHours()}:${tempDate.getMinutes()}`,
                monday: buildTrue ? true : false,
                tuesday: buildTrue ? true : false,
                wednesday: buildTrue ? true : false,
                thursday: buildTrue ? true : false,
                friday: buildTrue ? true : false,
                saturday: buildTrue ? true : false,
                sunday: buildTrue ? true : false
            })
        }
        else {
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
        }
        tempDate.setMinutes(tempDate.getMinutes() + 15)
    }
    return blankScheduleArray;
};
    

export { scheduleArrayBuilder };