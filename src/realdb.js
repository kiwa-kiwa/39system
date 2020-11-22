const connection = require("../config");
const filelog = require("./csvlog");

//Saving To DB
function savedb2(row) {
  // Making the array suitable for the MYSQL query
  var result = row.reduce(function (cl, a, currIndex, arr) {
    return (
      cl +
      (currIndex == 0 ? "" : ",") +
      "'" +
      a +
      "'" +
      (currIndex == arr.length - 1 ? ")" : "")
    );
  }, "(");

  connection.query(
    `INSERT INTO e_real_sales (
        customer_id,
        customer_name,
        customer_name_kana,
        customer_postal_code,
        customer_address1,
        customer_tel1,
        customer_birthday,
        in_house_payment,
        in_house_quantity,
        in_house_coming_cnt,
        in_house_coming_date_cnt,
        other_company_payment,
        other_company_quantity,
        other_company_coming_cnt,
        other_company_coming_date_cnt,
        date
        )
        VALUES
         ${result}`,
    function (err, result) {
      if (err) {
        location.href = "failed.html";
      } else {
        filelog();
      }
    }
  );
}

module.exports = savedb2;
