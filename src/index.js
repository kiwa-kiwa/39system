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
document.getElementById("getdata").addEventListener("click", (e) => {
  e.preventDefault();
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
