const path = require("path");
var $ = require("jquery");
const getdata = require("./getdata");
require("datatables.net")(window, $);

//EC CLick
document.getElementById("ec").addEventListener("click", () => {
  const upload = path.join("file://" + __dirname + "/ecupload.html");
  window.location.href = upload;
});

//Real CLick
document.getElementById("vc").addEventListener("click", () => {
  const upload = path.join("file://" + __dirname + "/reupload.html");
  window.location.href = upload;
});

//Get Data click
var click = 0;
document.getElementById("getdata").addEventListener("click", (e) => {
  //click += 1;
  e.preventDefault();
  // console.log(click);
  // if (click > 1) {
  //   //Removing Previously Created divs
  //   // $("#testtbl tr").remove();
  //   // $("#member .res").remove();
  //   // $("#member_total").remove();
  //   // $("#money .res").remove();
  //   // $("#money_total").remove();
  //   // $("#payment-item .res").remove();
  //   // $("#item_total").remove();
  //   // $("#data").DataTable().destroy();
  //   // $("#data tbody").empty();
  //   var a = $("form").serializeArray();
  //   var from;
  //   var to;
  //   var type = [];
  //   a.forEach((data) => {
  //     if (data.name === "from") {
  //       from = data.value;
  //     } else if (data.name === "to") {
  //       to = data.value;
  //     } else if (data.name === "customer_category") {
  //       type.push(data.value);
  //     }
  //   });
  //   localStorage.setItem("from", from);
  //   localStorage.setItem("to", to);
  //   localStorage.setItem("type", type);
  //   window.location.reload();
  //   getdata(from, to, type);
  // } else {
  //   var a = $("form").serializeArray();
  //   var from;
  //   var to;
  //   var type = [];
  //   a.forEach((data) => {
  //     if (data.name === "from") {
  //       from = data.value;
  //     } else if (data.name === "to") {
  //       to = data.value;
  //     } else if (data.name === "customer_category") {
  //       type.push(data.value);
  //     }
  //   });
  //   getdata(from, to, type);
  // }
  var a = $("form").serializeArray();
  var from;
  var to;
  var type = [];
  a.forEach((data) => {
    if (data.name === "from") {
      from = data.value;
    } else if (data.name === "to") {
      to = data.value;
    } else if (data.name === "customer_category") {
      type.push(data.value);
    }
  });
  getdata(from, to, type);
});
