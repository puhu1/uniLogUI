export  function formatDate(date) {
    let d = new Date(date),
        year = d.getFullYear(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate();


    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [day, month, year].join('-');

}