const readXlsxFile = require("read-excel-file/node");
const Papa = require("papaparse");
const input = document.getElementById("ec");
const input2 = document.getElementById("vc");
const savedb1 = require("./ecdb");
const { get } = require("jquery");

//EC File Change Event
input.addEventListener("change", () => {
  document.getElementById("result").style.display = "block";
  readXlsxFile(input.files[0].path).then((rows) => {
    if (document.getElementById("tbl-part") == null) {
      createTable(rows);
    } else {
      document.getElementById("tbl-part").remove();
      createTable(rows);
    }
    rows.forEach((row, index) => {
      if (index != 0) {
        savedb1(row);
      }
    });
  });
});

//Real Store FIle Change Event
input2.addEventListener("change", () => {
  document.getElementById("result").style.display = "block";

  //Calling The Parse Function
  parseMe(input2.files[0], doStuff);
});

//The parse function
function parseMe(url, callBack) {
  Papa.parse(url, {
    complete: function (results) {
      callBack(results.data);
    },
  });
}

//Result function of Parse
function doStuff(data) {
  var newArray = data;
  //Creating Table
  createTable(newArray);
  newArray.forEach((row, index) => {
    if (index != 0) {
      console.log(row);
    }
  });
}

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
