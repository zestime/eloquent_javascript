function flatten(array){
  return array.reverse().reduce((x, acc) => acc.concat(x), []);
}

function average(array) {
  return array.reduce((x,y) => x+y) / array.length;
}

function ageDiffer(array) {
  var whole = {};
  array.map(x => whole[x.name] = x);
  array.map(x => {
    if (x.mother in whole)
      x.m = whole[x.mother]; 
  });
  var arr = array.filter(x => x.m).map(x => x.born - x.m.born);
  return average(arr);
}

function lifeExpect(array) {
  var group = groupBy(array, x => Math.ceil(x.died / 100));
  Object.keys(group).map(k => group[k] = average(group[k].map(x => x.died - x.born)));
  return group;
}

function groupBy(array, func) {
  return array.reduce((acc,x) => {
    var i = func(x);
    var c = acc[i];
    acc[i] = c ? c.concat(x) : [x]
      return acc;
  }, {})
}


function every(array, fn) {
  return !some(array, x => !fn(x));
}

function some(array, fn) {
  try {
    array.map(x => {if (fn(x)) throw "Stop";}); 
    return false;
  }
  catch(e)  {
    return true;
  }
}

module.exports = {
  flatten,
  ageDiffer,
  lifeExpect,
  every,
  some
};
