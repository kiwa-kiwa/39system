var element = document.getElementById("vc");
var nextbtn = document.getElementById("nextbtn");

var fl = element.value;
if (fl == "") {
  document.getElementById("msg").innerHTML = "設定されていません。";
  //Making Next Button Disbaled
  nextbtn.href = "#";
}

nextbtn.addEventListener("click", () => {
  if (element.files[0] == null) {
    alert("File Not Chossen. Please Select File");
  }
});

function check(e) {
  //Enabling link after file select
  nextbtn.href = "preview2.html";
  var f2 = element.files[0].name;

  //CSV checking validation
  var allowed_extensions = "csv";
  var file_extension = f2.split(".").pop().toLowerCase();
  if (allowed_extensions == file_extension) {
    document.getElementById("msg").innerHTML = f2;
    localStorage.setItem("file", element.files[0].path);
    return true;
  } else {
    document.getElementById("msg").innerHTML = "Only CSV are allowed";
    return false;
  }
}
