var fs = require('fs');
var readFile = (name) => fs.readFileSync(name + ".js");

var req = req;
req.cache = Object.create(null);

var weekDay = req('weekDay');
var monthName = req('monthName');
var today = req('today');

console.log(weekDay.name(today.dayNumber()));
console.log(monthName.name(today.monthNumber()));


function req(name) {
  if (name in req.cache)
    return req.cache[name];

  var code = new Function("exports, module", readFile(name));
  var exports = {}, module = {exports: exports};
  code(exports, module);

  req.cache[name] = module.exports;

  return module.exports;
}
