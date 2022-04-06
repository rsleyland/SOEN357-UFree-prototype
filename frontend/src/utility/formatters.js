const formatFirstName = (fname) => {
    return fname.substr(0,1).toUpperCase()+fname.substr(1,fname.length-1).toLowerCase();
};

const formatLastName = (lname) => {
    return lname.substr(0,1).toUpperCase()+lname.substr(1,lname.length-1).toLowerCase();
};

const formatFullName = (name) => {
    let splits = name.split(' ');
    let fname = formatFirstName(splits[0])
    let lname = formatLastName(splits[1])
    return `${fname} ${lname}`;
};

export { formatFirstName, formatLastName, formatFullName };