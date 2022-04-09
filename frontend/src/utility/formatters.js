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

const compareLNameFNameDescSched = (a, b) => {
    const a_nameSplit = a.name.split(' ');
    const a_firstName = formatFirstName(a_nameSplit[0]);
    const a_lastName = formatLastName(a_nameSplit[1]);
    const b_nameSplit = b.name.split(' ');
    const b_firstName = formatFirstName(b_nameSplit[0]);
    const b_lastName = formatLastName(b_nameSplit[1]);

    if ( a_lastName < b_lastName ) return -1;
    if ( a_lastName > b_lastName ) return 1;
    else {
        if ( a_firstName < b_firstName ) return -1;
        else if ( a_firstName > b_firstName ) return 1;
        else return 0;
    };
  };

  const compareLNameFNameDesc = (a, b) => {
    const a_nameSplit = a.split(' ');
    const a_firstName = formatFirstName(a_nameSplit[0]);
    const a_lastName = formatLastName(a_nameSplit[1]);
    const b_nameSplit = b.split(' ');
    const b_firstName = formatFirstName(b_nameSplit[0]);
    const b_lastName = formatLastName(b_nameSplit[1]);

    if ( a_lastName < b_lastName ) return -1;
    if ( a_lastName > b_lastName ) return 1;
    else {
        if ( a_firstName < b_firstName ) return -1;
        else if ( a_firstName > b_firstName ) return 1;
        else return 0;
    };
  };

export { formatFirstName, formatLastName, formatFullName, compareLNameFNameDesc, compareLNameFNameDescSched };