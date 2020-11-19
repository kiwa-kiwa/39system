var mysql = require("mysql");

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

  var query = connection.query(
    `INSERT INTO e_ec_sales (
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
        other_company_payment,
        other_company_quantity,
        other_company_coming_cnt,
        other_company_coming_date_cnt,
        date
        )
        VALUES
         ${result}`,
    function (err, result) {
      if (err) throw err;
      console.log("data inserted");
    }
  );
}

module.exports = savedb2;