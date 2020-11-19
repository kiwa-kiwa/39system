var fl = document.getElementById("ec").value;
if (fl == "") {
  document.getElementById("msg").innerHTML = "設定されていません。";
}

function check(e) {
  var f2 = document.getElementById("ec").files[0].name;
  //CSV checking validation
  var allowed_extensions = "csv";
  var file_extension = f2.split(".").pop().toLowerCase();
  if (allowed_extensions == file_extension) {
    document.getElementById("msg").innerHTML = f2;
    return true; // valid file extension
  } else {
    document.getElementById("msg").innerHTML = "Only CSV are allowed";
    return false;
  }
}
