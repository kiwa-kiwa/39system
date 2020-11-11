const readXlsxFile = require("read-excel-file/node");
const input = document.getElementById("ec");
const input2 = document.getElementById("vc");
const savedb1 = require("./ecdb");

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

input2.addEventListener("change", () => {
  document.getElementById("result").style.display = "block";
  readXlsxFile(input2.files[0].path).then((rows) => {
    // rows.forEach(createTable(rows));
    createTable(rows);
  });
});

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

$("#result").on("click", () => {
  alert("Fetch Aggregation here");
});
