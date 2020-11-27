const connection = require("../config");

var data = [];

//Saving To DB
function getdata() {
  document.getElementById("loading").style.display = "flex";

  var query = connection.query("SELECT * FROM v_aggregate LIMIT 0,50");
  query
    .on("error", function (err) {
      // Handle error, an 'end' event will be emitted after this as well
      console.log(err);
    })
    .on("fields", function (fields) {
      // the field packets for the rows to follow
    })
    .on("result", function (row) {
      // Pausing the connnection is useful if your processing involves I/O
      connection.pause();
      //   processRow(row, function () {
      //     connection.resume();
      //   });
      data.push(row);
      connection.resume();
    })
    .on("end", function () {
      document.getElementById("loading").style.display = "none";
      // all rows have been received
      for (var i = 0; i < data.length; i++) {
        createTable(data[i]);
      }
      pagi();
    });

  //A function that renders the table after the file is loaded
  function createTable(tableData) {
    var row = $("<tr />");
    $("#testtbl").append(row);
    row.append($("<td>" + tableData.customer_cotegory + "</td>"));
    row.append($("<td>" + tableData.customer_name + "</td>"));
    row.append($("<td>" + tableData.age + "</td>"));
    row.append($("<td>" + tableData.customer_tel + "</td>"));
    row.append($("<td>" + tableData.postal_code + "</td>"));
    row.append($("<td>" + tableData.address + "</td>"));
    row.append($("<td>" + tableData.payment_date + "</td>"));
    row.append($("<td>" + tableData.payment_money_sum + "</td>"));
    row.append($("<td>" + tableData.payment_item_cnt_sum + "</td>"));
    row.append($("<td>" + tableData.payment_item_cnt_ec_sum + "</td>"));
    row.append($("<td>" + tableData.payment_money_real_item_cnt_sum + "</td>"));
    row.append($("<td>" + tableData.payment_money_ec_sum + "</td>"));
    row.append($("<td>" + tableData.payment_item_cnt_ec_sum + "</td>"));
    row.append($("<td>" + tableData.ec_name + "</td>"));
  }

  //Paginatore
  function pagi() {
    $("#tbl-cont").after('<div id="nav"></div>');
    var rowsShown = 5;
    var rowsTotal = $("#data tbody tr").length;
    var numPages = rowsTotal / rowsShown;
    for (var i = 0; i < numPages; i++) {
      var pageNum = i + 1;
      $("#nav").append('<a href="#!" rel="' + i + '">' + pageNum + "</a> ");
    }
    $("#data tbody tr").hide();
    $("#data tbody tr").slice(0, rowsShown).show();
    $("#nav a:first").addClass("active");
    $("#nav a").bind("click", function () {
      $("#nav a").removeClass("active");
      $(this).addClass("active");
      var currPage = $(this).attr("rel");
      var startItem = currPage * rowsShown;
      var endItem = startItem + rowsShown;
      $("#data tbody tr")
        .css("opacity", "0.0")
        .hide()
        .slice(startItem, endItem)
        .css("display", "table-row")
        .animate({ opacity: 1 }, 300);
    });
  }
}

module.exports = getdata;
