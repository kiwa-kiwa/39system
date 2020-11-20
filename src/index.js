const path = require("path");
var $ = require("jquery");
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

$("#example").DataTable({
  searching: false,
  lengthChange: false,
  ordering: false,
  info: false,
  language: {
    oPaginate: {
      sNext: ">>",
      sPrevious: "<<",
    },
  },
});
