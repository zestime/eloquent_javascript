var expect = require('chai').expect;
var app = require('./app');

function assertIdentity(reg, text, debug){
  var parsed, result;
  try {
    parsed = text ? reg.exec(text)[0] : '';
    result = parsed === String(text);
  }
  catch (e) {
    result = false;
  }
  if (debug) console.log('assertIdentity', parsed, result);
  return expect(result).to.be;
}

describe('9. Regular Expression', () => {

  var numberReg = /(\+|-)?(\d+(\.(\d+)?|e-?\d+)?|\.\d+)/i;

  it('should parse a single digit', () => {
    assertIdentity(numberReg, 2).true;
    assertIdentity(numberReg, '').true;
  });
  it('should parse three digits', () => {
    assertIdentity(numberReg, 123).true;
  });
  it('should parse floating number', () => {
    assertIdentity(numberReg, 123.45).true;
  });
  it('should parse exponential number', () => {
    assertIdentity(numberReg, '5e-3').true;
    assertIdentity(numberReg, '1E10').true;
    assertIdentity(numberReg, '1.2E10').false;
  });
  it('should parse signed number', () => {
    assertIdentity(numberReg, +123.45).true;
    assertIdentity(numberReg, -123.45).true;
  });
  it('should parse exceptional numbers', () => {
    assertIdentity(numberReg, '5.').true;
    assertIdentity(numberReg, '.5').true;
    assertIdentity(numberReg, '.').false;
  });
});
