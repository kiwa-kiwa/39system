const fs = require("fs");
const iconv = require("iconv-lite");
const savedb2 = require("./realdb");
const filelog = require("./csvlog");

var datas;

//Shift to UTF
var paths = localStorage.getItem("file");
readFile(paths);
function readFile(path) {
  fs.readFile(path, function (error, text) {
    if (error != null) {
      alert("error : " + error);
      return;
    }
    //Decoding
    var str = iconv.decode(text, "Shift_JIS");
    //Spliting the csv with line break
    var lines = str.split("\n");
    //Spliting lines by delimiter comma
    var result = lines.map(function (line) {
      return line.split(",");
    });
    result.pop();
    createTable(result);
    datas = result;
  });
}

//A function that renders the table after the file is loaded
function createTable(tableData) {
  var container = document.createElement("section");
  container.classList.add("table-container");
  container.id = "tbl-part";
  var title = document.createElement("h2");
  var titletext = document.createTextNode("登録する情報を確認してください。");
  title.appendChild(titletext);
  var table = document.createElement("table");
  table.id = "tbl";
  var tableBody = document.createElement("tbody");

  tableData.forEach(function (rowData) {
    var row = document.createElement("tr");

    rowData.forEach(function (cellData) {
      var cell = document.createElement("td");
      cell.appendChild(document.createTextNode(cellData));
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });

  container.appendChild(table);
  table.appendChild(tableBody);
  document.body.appendChild(container);

  var getbl = document.getElementById("tbl-part");
  var getbl2 = document.getElementById("tbl");
  getbl.insertBefore(title, getbl2);
}

//Saving to Database
document.getElementById("savedb").addEventListener("click", () => {
  datas.forEach((data, i) => {
    if (i != 0) {
      savedb2(data);
    }
  });
  filelog();
});
