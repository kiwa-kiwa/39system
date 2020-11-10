const readXlsxFile = require("read-excel-file/node");
var mysql = require("mysql");
const input = document.getElementById("ec");
const input2 = document.getElementById("vc");

input.addEventListener("change", () => {
  document.getElementById("result").style.display = "block";
  readXlsxFile(input.files[0].path).then((rows) => {
    // rows.forEach(createTable(rows));
    if (document.getElementById("tbl-part") == null) {
      createTable(rows);
    } else {
      document.getElementById("tbl-part").remove();
      createTable(rows);
    }
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

const btnclck = document.getElementById("find");
btnclck.addEventListener("click", () => {
  alert("We will add to db");
});

//mysql connection setup
var connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "",
  database: "db_aggregator",
  multipleStatements: true,
});
//Saving To DB
function savedb(row) {
  var responseJson = JSON.stringify(row);

  var query = connection.query(
    `INSERT INTO test (FirstName, LastName, Gender, Country, Age, Date, Id) VALUES  (${responseJson})`,
    function (err, result) {
      if (err) throw err;
      console.log("data inserted");
    }
  );
  console.log(query.sql);
}
