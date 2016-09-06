var today = new Date(); 
exports.dayNumber   = today.getDay.bind(today);
exports.monthNumber = today.getMonth.bind(today);
