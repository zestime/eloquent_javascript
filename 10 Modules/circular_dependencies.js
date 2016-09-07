// CIRCULAR DEPENDENCIES
// 10. Modules from `Eloquent JavaScript`

var readFile = require('fs').readFileSync;


function req(name){
  // only once loaded
  if (name in req.cache) {
    if (req.cache[name].isLoaded)
      return req.cache[name].value;
    throw new Error("The requested module is loading");
  }

  var exports = {};
  var state = req.cache[name] = { 
    isLoaded : false,
    value : exports 
  }; 
  
  // to return a value, not a object, sending a module
  var code = new Function("exports, module", readFile(name));
  var module = {exports : exports};
  Object.defineProperty(module, 'exports', {
    get: function() {return exports;},
    set: function(value) { state.value = exports = value; },
    configurable: false
  });
  code(exports, module);
  
  state.isLoaded = true;
  return module.exports;
}
req.cache = Object.create(null);


var weekDay = req('weekDay.js');
var test = req('replaceExports.js');

console.log(test);
console.log(req.cache);
