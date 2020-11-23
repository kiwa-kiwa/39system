const fs = require("fs");
const iconv = require("iconv-lite");
const savedb2 = require("./realdb");
const filelog = require("./csvlog");
var csv = require("csv");

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

  tableData.forEach(function (rowData, i) {
    if (i <= 10) {
      var row = document.createElement("tr");

      rowData.forEach(function (cellData) {
        var cell = document.createElement("td");
        cell.appendChild(document.createTextNode(cellData));
        row.appendChild(cell);
      });

      tableBody.appendChild(row);
    }
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
  const stream = fs
    .createReadStream(paths)
    .pipe(iconv.decodeStream("SJIS"))
    .pipe(iconv.encodeStream("UTF-8"))
    .pipe(csv.parse({ delimiter: ",", from_line: 2 }));

  let count = 0; // 読み込み回数
  let total = 0; // 合計byte数

  stream.on("readable", () => {
    //Loading screen invoke
    document.getElementById("model").style.display = "flex";

    let chunk;
    while ((chunk = stream.read()) !== null) {
      count++;
      total += chunk.length;
      //Spliting lines by delimiter comma
      var result = chunk.toString("utf-8").split(",");
      savedb2(result);
    }
  });

  stream.on("end", () => {
    //Loading screen remove
    document.getElementById("model").style.display = "none";
    console.log(`${count} Obtained in divided times`);
    console.log(`I got a total of ${total} bytes`);
    filelog();
  });
});
