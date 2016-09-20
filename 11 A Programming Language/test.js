var expect = require('chai').expect;
var egg = require('./egg');

describe('egg', () => {
  'use strict';

  let parse = egg.parse;
  let evaluate = egg.evaluate;
  let run = egg.run;
  let topEnv = egg.topEnv;

  describe('parse', () => {
    it('should parse a simple application', () => {
      var program = "+(a,10)";
      var ast = {
        type: 'apply',
        operator: {type: 'word', name: '+'},
        args: [{type: 'word', name: 'a'}, {type: 'value', value: 10}]
      }; 
      expect(parse(program)).to.deep.equal(ast);
    });

    it('should parse "if" form special forms', () => {
      let prog = parse('if(true,false,true)');
      expect(evaluate(prog, topEnv)).to.be.false;
    });
    it('should parse "+" form special forms', () => {
      let prog = parse('+(5,4)');
      expect(evaluate(prog, topEnv)).to.equal(9);
    });
    it('should parse "*" form special forms', () => {
      let prog = parse('*(5,0)');
      expect(evaluate(prog, topEnv)).to.equal(0);
    });
  });

  describe('run', () => {
    it('should run a complex calcuation', () => {
      let result = run(`
        do(define(total, 0), define(count, 1),
          while(<(count, 11), 
            do(
              set(total, +(total, count)),
              set(count, +(count,1)))),
          print(total))
        `); 
      expect(result).to.equal(55);
    });

    it('should run an user function using "fun"', () => {
      let result = run(`
        do(
          define(plusOne, fun(a, +(a,1))),
          print(plusOne(10))
        )
        `); 
      expect(result).to.equal(11);
    });

    it('should run another function using "fun"', () => {
      let result = run(`
        do(
          define(pow, fun(base, exp,
            if(==(exp, 0), 1, *(base, pow(base, -(exp, 1)))))),
          print(pow(2,10))
        )
        `); 
      expect(result).to.equal(1024);
    });
  });

  describe('arrays', () => {
    it('should create an array using given parameter', () => {
      let result = run(`array(1,2,3)`);
      expect(result).to.deep.equal([1,2,3]);
    });
    it('should return the length of given array', () => {
      let result = run(`length(array(1,2,3))`);
      expect(result).to.equal(3);
    });
    it('should return the nth element.', () => {
      let result = run(`element(array(1,2,3,4,5), 2)`);
      expect(result).to.equal(3);
    });
  });

  describe('closure', () => {
    it('should supports closures', () => {
      let result = run(`
        do(
          define(f, fun(a, fun(b, +(a, b)))),
          print(f(4)(5))
        )
        `);
      expect(result).to.equal(9);
    });
  });

  describe('comments', () => {
    it('should ignore line comments', () => {
      let result = run(`
        # this is comment!
          +(2,3)
        `);
      expect(result).to.equal(5);
    });
    it('should ignore comments after statement', () => {
      let result = run(`
        +(2,3)# this is comment!`);
      expect(result).to.equal(5);
    });
    it('should ignore the last line comments', () => {
      let result = run(`
        +(2,3)
        # this is comment!`);
      expect(result).to.equal(5);
    });
  });

  describe('Fixing scope', () => {
    it('should failed to set undefined value', () => {
      let script = `
        do(
          define(a, 3),
          define(b, fun(set(a, 10))),
          b(),
          print(a)
        )`;
      expect(() => run(script)).to.throw('Variable is not defined in local');
    });
    it('should return a value from outer scope.', () => {
      let script = `
        do(
          define(a, 3),
          define(b, fun(define(a, 10))),
          b(),
          print(a)
        )`;
      expect(run(script)).to.equal(3);
    });
  });
});
