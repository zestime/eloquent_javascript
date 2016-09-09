var expect = require('chai').expect;
var egg = require('./egg');

describe('egg', () => {

  describe('parse', () => {
    it('should parse a simple application', () => {
      var program = "+(a,10)";
      var ast = {
        type: 'apply',
        operator: {type: 'word', name: '+'},
        args: [{type: 'word', name: 'a'}, {type: 'value', value: 10}]
      }; 
      expect(egg.parse(program)).to.deep.equal(ast);

    });
  });
});
