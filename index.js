const readXlsxFile = require("read-excel-file/node");
const input = document.getElementById("ec");
const input2 = document.getElementById("vc");

input.addEventListener("change", () => {
  document.getElementById("result").style.display = "block";
  readXlsxFile(input.files[0].path).then((rows) => {
    // rows.forEach(createTable(rows));
    createTable(rows);
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
  addRows("tbl", "result");
});

function addRows(tableId, resultId) {
  var table = document.getElementById(tableId);
  var rows = table.rows;
  var total = 0;
  var cell;

  // Assume first row is headers, adjust as required
  // Assume last row is footer, addjust as required

  for (
    var col = 1;
    col <= document.getElementById("tbl").rows[0].cells.length;
    col++
  ) {
    for (var i = 1, iLen = rows.length; i < iLen; i++) {
      cell = rows[i].cells[col];
      total[col] += Number(cell.textContent || cell.innerText);
    }
    console.log(total[col]);
  }
  document.getElementById(resultId).innerHTML = total;
}
