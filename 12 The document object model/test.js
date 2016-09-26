var expect = require('chai').expect;
var jsdom = require('mocha-jsdom');

var app = require('./app');
var mountains = require('./mountains');

describe('app', () => {
  'use strict';

  jsdom();

  describe('build table', () => {
    it('has document', () => {
      var div = document.createElement('div');
      expect(div.nodeName).eql('DIV')
    });

    it('has table', () => {
      var tag = app.buildTable(mountains);
      expect(tag.nodeName).eql('TABLE');
      expect(tag.children.length).eql(mountains.length + 1);

      expect(tag.firstChild.firstChild.nodeName).eql('TH');
      expect(tag.childNodes[1].firstChild.nodeName).eql('TD');
      expect(tag.childNodes[1].childNodes[0].style.textAlign).eql('');
      expect(tag.childNodes[1].childNodes[1].style.textAlign).eql('right');
    });
  });

  describe('Elements by Tag', () => {
    it('counting TH', () => {
      var doc = app.buildTable(mountains);
      var nodes = app.getElements(doc, 'th');
      expect(nodes.length).eql(3);
    });
    it('counting TD', () => {
      var doc = app.buildTable(mountains);
      var nodes = app.getElements(doc, 'td');
      expect(nodes.length).eql(21);
    });
  });

});
