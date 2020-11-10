const readXlsxFile = require("read-excel-file/node");
const input = document.getElementById("ec");
const input2 = document.getElementById("vc");

input.addEventListener("change", () => {
  document.getElementById("result").style.display = "block";
  readXlsxFile(input.files[0].path).then((rows) => {
    // rows.forEach(createTable(rows));
    createTable(rows);

    const columnNames = rows.shift(); // Separate first row with column names
    const objs = rows.map((row) => {
      // Map the rest of the rows into objects
      const obj = {}; // Create object literal for current row
      row.forEach((cell, i) => {
        obj[columnNames[i]] = cell; // Use index from current cell to get column name, add current cell to new object
      });
      return obj;
    });
    console.log(objs);
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

const btnclck = document.getElementById("find");
btnclck.addEventListener("click", () => {
  alert("We will add to db");
});
