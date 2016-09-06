// 30 Aug 2016
// 8. Bugs and Error Handling 
// in Eloquent JavaScript written by Marjin Haverbeke


////////////////////////////////////////////////
// 1. RETRY
// We have this error. Actually, the implementation is not important.
function MultiplicatorUnitFailure(message) {
  this.message = message;
  this.stack = (new Error()).stack;
}
MultiplicatorUnitFailure.prototype = Object.create(Error.prototype);
MultiplicatorUnitFailure.prototype.name = 'MultiplicatorUnitFailure';

function primitiveMultiply(x, y) {
  // And we assume we have the function primitiveMultiply.
  // This one sometimes causes a error of 'MultiplicatorUnitFailure' 
}

// Anyway, the answer is this.

function multiplyWrapper(x, y) {
  try {
    primitiveMultiply(x, y); // it caused the error
  }
  catch(e) {
    if (e instanceof MultiplicatorUnitFailure) {
      multiplyWrapper();  // recutsivly, call it again until finished normally
    }
  }
}


////////////////////////////////////////////////
// 2. THE LOCKED BOX
var box = {
  locked: true,
  unlock: function() {this.locked = false;},
  lock: function() {this.locked = true;},
  _content: [],
  get content() {
    if (this.locked) throw new Error("Locked!");
    return this._content;
  }
};

// This question is quite simple. 
// Regardless, the given function is working correctly or wrongly
// we should lock the box. In this case, 'finally' is useful. 
box.withBoxUnlocked = function(fn) {
  try{
    unlock();
    return fn();
  }
  finally{
    lock();
  }
}
