var expect = require('chai').expect;
var app = require('./app');
var ancestry = require('./ancestry');

describe('chapter 5. Higher-order function', () => {

  describe('flattern', () => {
    it('should return an empty array', () => {
      expect(app.flatten([])).to.deep.equal([]);
    });
    it('should return a single array', () => {
      var arr = [[1], [2]];
      expect(app.flatten(arr)).to.deep.equal([1,2]);
    });
  });

  describe('mother-child age difference', () => {
    var array = JSON.parse(ancestry);
    console.log(app.ageDiffer(array));
  });

  describe('historical life expectancy', () => {
    var array = JSON.parse(ancestry);
    console.log('-life expect: ', app.lifeExpect(array));
  });
  
  describe('every and then some', () => {
    var arr = [1,2];
    it('should return a proper value', () => {
      expect(app.some( arr, x => (x > 0))).to.be.true;
      expect(app.some( arr, x => (x < 0))).to.be.false
    });
    it('should stop, after to get truthy value', () => {
      var count = 0;
      var result = app.some(arr, x => {count++; return (x > 0);});
      expect(result).to.be.true;
      expect(count).to.equal(1);
    });
    it('should return a truthy value by every', () => {
      var count = 0;
      var result = app.every(arr, x => {count++; return (x > 0);});
      expect(result).to.be.true;
      expect(count).to.equal(arr.length);
    });
    it('should return a falsy value by every', () => {
      var count = 0;
      var result = app.every(arr, x => {count++; return (x < 0);});
      expect(result).to.be.false;
      expect(count).to.equal(1);
    });
  });
});
