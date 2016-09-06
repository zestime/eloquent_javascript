var names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

exports.name   = (i)    => names[i];
exports.number = (name) => names.indexOf(name);
