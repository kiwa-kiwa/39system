const path = require("path");

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
