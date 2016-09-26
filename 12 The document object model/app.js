var jsdom = require('jsdom').jsdom;
var document = jsdom("<html><body></body></html>");

function buildTable(data) {
  var table = document.createElement('table');
  table.appendChild(createTableHeader(data[0]));
  createTableBody(data).map(r => table.appendChild(r));
  return table;
}

function createTableHeader(obj){
  var tr = document.createElement('tr');
  Object.keys(obj).map(x => {
    var th = document.createElement('th');
    th.appendChild(document.createTextNode(obj[x]));
    tr.appendChild(th);
  });
  return tr;
}

function createTableBody(arr) {
  var cols = Object.keys(arr[0]);
  return arr.map(r => {
    var tr = document.createElement('tr');
    cols.map(c => {
      var td = document.createElement('td');
      var value = r[c];

      if (!isNaN(Number(value))) {
        td.style.textAlign = 'right';
      }

      td.appendChild(document.createTextNode(r[c]));
      tr.appendChild(td);
    });
    return tr;
  }); 
}

function getElements(node, tag){
  var result = [];

  function traverse(node) {
    if (node.nodeName === tag.toUpperCase())
      result.push(node);  

    if (node.hasChildNodes()) {
      var arr = Array.prototype.slice.call(node.childNodes, 0);
      arr.map(c => traverse(c, tag));  
    }
  }
  traverse(node);
  return result;
}

module.exports =  {
  buildTable,
  getElements
};
