const input = document.getElementById("ec");
const input2 = document.getElementById("vc");
const savedb1 = require("./ecdb");
const savedb2 = require("./realdb");
const fs = require("fs");
const iconv = require("iconv-lite");

//EC File Change Event
input.addEventListener("change", () => {
  document.getElementById("result").style.display = "block";

  //Shift to UTF
  var paths = input.files[0].path;
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

      console.log(result);

      //Calling The Parse Function
      // if (document.getElementById("tbl-part") == null) {
      //   createTable(result);
      // } else {
      //   document.getElementById("tbl-part").remove();
      //   createTable(result);
      // }
      // result.forEach((row, index) => {
      //   if (index != 0) {
      //     savedb(row);
      //   }
      // });
    });
  }
});

//Real Store FIle Change Event
input2.addEventListener("change", () => {
  document.getElementById("result").style.display = "block";

  //Shift to UTF
  var paths = input2.files[0].path;
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
      console.log(result);

      //Checking for existing table
      if (document.getElementById("tbl-part") == null) {
        createTable(result);
      } else {
        document.getElementById("tbl-part").remove();
        createTable(result);
      }
      //saving to database
      result.forEach((row, index) => {
        if (index != 0) {
          savedb2(row);
        }
      });
    });
  }
});

//A function that renders the table after the file is loaded
function createTable(tableData) {
  var container = document.createElement("section");
  container.classList.add("table-container");
  container.id = "tbl-part";
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
}

//The result Click
$("#result").on("click", () => {
  alert("Fetch Aggregation here");
});
