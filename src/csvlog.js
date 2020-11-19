const connection = require("../config");

//Geting file name from storage and extracting Name
var file_name = localStorage.getItem("file");
var filename = "'" + file_name.replace(/^.*[\\\/]/, "") + "'";

//Insert File Log in Import Databse

function filelog() {
  connection.query(
    `INSERT INTO e_csv_import (
          file_name,
          import_timestamp
          )
          VALUES
           (${filename}, NOW())`,
    function (err, result) {
      if (err) {
        throw err;
      } else {
        location.href = "success.html";
      }
    }
  );
}
module.exports = filelog;
