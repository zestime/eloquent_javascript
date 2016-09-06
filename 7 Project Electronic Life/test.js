'use strict';
var expect = require('chai').expect;
var app = require('./app');

describe('chapter 7. Project: Electronic Life', () => {

  describe('Type defines', () => {
    it('should return existances.', () => {
      expect(app.Vector).to.exist;
      expect(app.Grid).to.exist;
    });

    it('should work methods of Grid.', () => {
      let width = 10, height = 10;
      let grid = new app.Grid(width, height);
      expect(grid.width).to.equal(width);
      expect(grid.height).to.equal(height);

      let last = new app.Vector(9, 9);
      grid.set(last, last);
      expect(grid.get(last)).to.equal(last);
    });
  });
});
