'use strict';

function vector(x, y) {
  this.x = x;
  this.y = y;
}
vector.prototype.plus = function(v) {
  return new vector(this.x + v.x, this.y + v.y);
}
vector.prototype.minus = function(v) {
  return new vector(this.x - v.x, this.y - v.y);
}
Object.defineProperty(vector.prototype, 'length', { 
  get: function() {return Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2));}
});



function StrechCell(inner, width, height) {
  TextCell.call(this, inner);
  this.width = width;
  this.height = height;
}
StrechCell.prototype = Object.create(TextCell.prototype);
StrechCell.prototype.minWidth = () => this.width;
StrechCell.prototype.minHeight = () => this.height;

///////////////////////////////
// my iteration interface
// next() - return current value;
// isEnd - specify to read the last element

function logFive(obj, fn) {
  let count = 0;
  while (!obj.isEnd && count < 5) {
    fn(obj.next());
    count++;
  }
}

function ArraySeq(array) {
  this.arr = array;
  this.index = 0;
}
ArraySeq.prototype.next = function() {
  return this.arr[this.index++];
}
Object.defineProperty(ArraySeq.prototype, 'isEnd', {
  get: function() {
    return this.index >= this.arr.length;
}});

function RangeSeq(start, end) {
  this.start = start;
  this.end =end;
}
RangeSeq.prototype.next = function() {
  return this.start++; 
}
Object.defineProperty(RangeSeq.prototype, 'isEnd', {
  get: function() {
    return this.start === this.end;
}});





module.exports = {
  vector,
  ArraySeq,
  RangeSeq,
  logFive
};
