'use strict';
var expect = require('chai').expect;
var app = require('./app');

describe('chapter 6. The secret life of Objects', () => {

  describe('vector type', () => {
    var vector = app.vector;
    let zero = new vector(0,0);
    let v = new vector(4,4);
    let v2 = new vector(1,2);
    it('creation', () => {
      expect(v.x).to.equal(v.y);
      expect(v2.x).to.equal(1);
      expect(v2.y).to.equal(2);
    });

    it('plus', () => {
      let nv = v.plus(zero);
      expect(nv).to.deep.equal(v);
      expect(v.plus(v2)).to.deep.equal(new vector(v.x+v2.x,v.y+v2.y));
    });

    it('minus', () => {
      let nv = v.plus(zero);
      expect(nv).to.deep.equal(v);
      expect(v.minus(v2)).to.deep.equal(new vector(v.x-v2.x,v.y-v2.y));
    });

    it('length', () => {
      // arrange
      let v = new vector(3,4);
      // act
      let len = v.length;
      // assert
      expect(len).to.equal(5);
    });
  });

  describe('StretchCell', () => {
  });

  describe('Iterate Interface', () => {
    var ArraySeq = app.ArraySeq;
    var RangeSeq = app.RangeSeq;
    var logFive = app.logFive;
    it('ArraySeq existed.', () => {
      expect(ArraySeq).to.exist;
      expect(ArraySeq.prototype.hasOwnProperty('isEnd')).to.be.true;
    });
    it('logFive with larger', () => {
      let arr = new ArraySeq([1,2,3,4,5,6,7,8]);
      let r = [];
      logFive(arr, x => r.push(x));
      expect(r).to.deep.equal([1,2,3,4,5]);
    });
    it('logFive with smaller', () => {
      let arr = new ArraySeq([1,2,3]);
      let r = [];
      logFive(arr, x => r.push(x));
      expect(r).to.deep.equal([1,2,3]);
    });
    it('logFive with larger on RangeSeq', () => {
      let arr = new RangeSeq(1,10);
      let r = [];
      logFive(arr, x => r.push(x));
      expect(r).to.deep.equal([1,2,3,4,5]);
    });
    it('logFive with smaller on RangeSeq', () => {
      let arr = new RangeSeq(1,3);
      let r = [];
      logFive(arr, x => r.push(x));
      expect(r).to.deep.equal([1,2]);
    });
  });
});
