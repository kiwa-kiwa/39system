const connection = require("../config");
const getmember = require("./getmember");
const getmoney = require("./getmoney");
const getitem = require("./getitem");

var data = [];

//Saving To DB
function getdata(from, to, type) {
  console.log(type);
  document.getElementById("loading").style.display = "flex";
  var query = connection.query(`SELECT 
  case 
    when view.customer_category = 'COMMON' then '共通会員' 
    when view.customer_category = 'REAL' then '店舗のみ会員' 
    when view.customer_category = 'EC' then 'ECのみ会員' 
      else view.customer_category 
  end as '会員種別'
  ,view.customer_name as '名前' 
  ,max(view.age) as '年齢'  
  , GROUP_CONCAT(DISTINCT view.customer_tel SEPARATOR ',') AS '電話番号'
  , GROUP_CONCAT(DISTINCT view.postal_code SEPARATOR ',') AS '郵便番号' 
  ,view.address as 'エリア'
  ,GROUP_CONCAT(DISTINCT replace(view.payment_date,'-','/') SEPARATOR ',') as '購入月' 
  ,sum(view.payment_money_sum) as payment_money_sum
  ,sum(view.payment_item_cnt_sum) as payment_item_cnt_sum
  
  ,sum(view.payment_money_real_sum) as payment_money_real_sum
  ,sum(view.payment_item_cnt_real_sum) as payment_item_cnt_real_sum
  
  ,sum(view.payment_money_ec_sum) as payment_money_ec_sum
  ,sum(view.payment_item_cnt_ec_sum) as payment_item_cnt_ec_sum
  ,max(view.ec_name) as ec_name 
  
  FROM 
  (
      SELECT         
          
          CASE WHEN EXISTS(select * FROM e_ec_sales WHERE e_ec_sales.customer_name = e_real_sales.customer_name AND (replace(e_ec_sales.customer_postal_code,'-','') = e_real_sales.customer_postal_code OR replace(e_ec_sales.customer_tel,'-','') = replace(e_real_sales.customer_tel1,'-','') ) ) = true THEN 'COMMON' ELSE 'REAL' END  AS customer_category,
          
          e_real_sales.customer_name AS customer_name,
          TIMESTAMPDIFF(YEAR,
              (CASE e_real_sales.customer_birthday
                  WHEN '1900-01-01' THEN 0
                  ELSE e_real_sales.customer_birthday
              END),
              CURDATE()) AS age,
          e_real_sales.customer_tel1 AS customer_tel,
          CONCAT(LEFT(e_real_sales.customer_postal_code,
                      3),
                  '-',
                  RIGHT(e_real_sales.customer_postal_code,
                      4)) AS postal_code,
          CONCAT(r_zip.ken_name,
                  r_zip.city_name) AS address,
          LEFT(e_real_sales.payment_date,
              7) AS payment_date,
          SUM(e_real_sales.payment_money) AS payment_money_sum,
          SUM(e_real_sales.payment_item_cnt) AS payment_item_cnt_sum,
          SUM(e_real_sales.payment_money) AS payment_money_real_sum,
          SUM(e_real_sales.payment_item_cnt) AS payment_item_cnt_real_sum,
          0 AS payment_money_ec_sum,
          0 AS payment_item_cnt_ec_sum,
          '' AS ec_name
      FROM
          (e_real_sales
          LEFT JOIN r_zip ON ((e_real_sales.customer_postal_code = CONVERT( r_zip.zip_key USING UTF8MB4))))
      WHERE  LEFT(e_real_sales.payment_date,7) >= '${from}' AND LEFT(e_real_sales.payment_date,7) <= '${to}' /* DATE_KEY(YYYY-MM) */
          
      GROUP BY e_real_sales.customer_name , TIMESTAMPDIFF(YEAR,
          (CASE e_real_sales.customer_birthday
              WHEN '1900-01-01' THEN 0
              ELSE e_real_sales.customer_birthday
          END),
          CURDATE()) , e_real_sales.customer_tel1 , CONCAT(LEFT(e_real_sales.customer_postal_code,
                  3),
              '-',
              RIGHT(e_real_sales.customer_postal_code,
                  4)) , CONCAT(r_zip.ken_name,
              r_zip.city_name) , LEFT(e_real_sales.payment_date,
          7) 
      UNION ALL SELECT 
          
      CASE WHEN EXISTS(select * FROM e_real_sales WHERE e_ec_sales.customer_name = e_real_sales.customer_name AND ( replace(e_ec_sales.customer_postal_code,'-','') = e_real_sales.customer_postal_code OR replace(e_ec_sales.customer_tel,'-','') = replace(e_real_sales.customer_tel1,'-','') ) ) = true THEN 'COMMON' ELSE 'EC' END  AS customer_category,
      
          e_ec_sales.customer_name AS customer_name,
          0 AS age,
          e_ec_sales.customer_tel AS customer_tel,
          e_ec_sales.customer_postal_code AS postal_code,
          CONCAT(r_zip.ken_name,
                  r_zip.city_name) AS address,
          DATE_FORMAT(e_ec_sales.order_date,
                  '%Y-%m') AS payment_date,
          SUM(e_ec_sales.total) AS payment_money_sum,
          SUM(e_ec_sales.quantity) AS payment_item_cnt_sum,
          0 AS payment_money_real_sum,
          0 AS payment_item_cnt_real_sum,
          SUM(e_ec_sales.total) AS payment_money_ec_sum,
          SUM(e_ec_sales.quantity) AS payment_item_cnt_ec_sum,
          GROUP_CONCAT(DISTINCT 
        CASE 
          WHEN e_ec_sales.shop_name = '[F]ダイユーエイト' THEN '自社サイト' 
          WHEN e_ec_sales.shop_name = '[A]ダイユーエイト' THEN 'アマゾン' 
                  WHEN e_ec_sales.shop_name = '[R]ダイユーエイト楽天市場店' THEN '楽天'
                  WHEN e_ec_sales.shop_name = '[W]ダイユーエイト.com' THEN 'au PAY マーケット'
                  WHEN e_ec_sales.shop_name = '[Y]ダイユーエイト.com' THEN 'Yahoo!'
                  WHEN e_ec_sales.shop_name = '[Y]収納ナビ.com' THEN 'Yahoo!'
                  WHEN e_ec_sales.shop_name = '[Y]ダイユーエイト.com ヤフー店' THEN 'Yahoo!'
                  WHEN e_ec_sales.shop_name = '[ｄ]ダイユーエイト' THEN 'dショッピング'
                  ELSE e_ec_sales.shop_name 
        END 
              SEPARATOR ',') AS ec_name
      FROM
          (e_ec_sales
          LEFT JOIN r_zip ON ((e_ec_sales.customer_postal_code = CONVERT( r_zip.zip USING UTF8MB4))))
          WHERE DATE_FORMAT(e_ec_sales.order_date,'%Y-%m') >= '2020-06' AND DATE_FORMAT(e_ec_sales.order_date,'%Y-%m') <= '2020-07' /* DATE_KEY(YYYY-MM) */
          
      GROUP BY e_ec_sales.customer_name , e_ec_sales.customer_tel , e_ec_sales.customer_postal_code , CONCAT(r_zip.ken_name,
              r_zip.city_name) , DATE_FORMAT(e_ec_sales.order_date,
              '%Y-%m')
  ) as view
  
  where 
  
  /* 全て(ALL_KEY) */
  view.customer_category = view.customer_category
  
  /* 共通会員(COMMON_KEY) */
  OR view.customer_category = 'COMMON'
  
  /* 店舗のみ会員(REAL_KEY) */
  OR view.customer_category = 'REAL'
  
  /* ECのみ会員(EC_KEY) */
  OR view.customer_category = 'EC'
  
  GROUP BY 
  view.customer_category 
  ,view.customer_name 
  
  ,view.address
  
  
  
  ;`);
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
      $("#data").DataTable({
        searching: false,
        lengthChange: false,
        pageLength: 5,
        info: false,
        language: {
          oPaginate: {
            sNext: '<i class="fa fa-chevron-right"></i>',
            sPrevious: '<i class="fa fa-chevron-left"></i>',
            sFirst: '<i class="fa fa-step-backward"></i>',
            sLast: '<i class="fa fa-step-forward"></i>',
          },
        },
      });
      getmember(from, to, type);
      getmoney(from, to, type);
      getitem(from, to, type);
    });

  //A function that renders the table after the file is loaded
  function createTable(tableData) {
    var row = $("<tr />");
    $("#testtbl").append(row);
    row.append($("<td>" + tableData.エリア + "</td>"));
    row.append($("<td>" + tableData.会員種別 + "</td>"));
    row.append($("<td>" + tableData.名前 + "</td>"));
    row.append($("<td>" + tableData.年齢 + "</td>"));
    row.append($("<td>" + tableData.購入月 + "</td>"));
    row.append($("<td>" + tableData.郵便番号 + "</td>"));
    row.append($("<td>" + tableData.電話番号 + "</td>"));
    row.append($("<td>" + tableData.ec_name + "</td>"));
    row.append($("<td>" + tableData.payment_item_cnt_ec_sum + "</td>"));
    row.append($("<td>" + tableData.payment_item_cnt_real_sum + "</td>"));
    row.append($("<td>" + tableData.payment_item_cnt_sum + "</td>"));
    row.append($("<td>" + tableData.payment_money_ec_sum + "</td>"));
    row.append($("<td>" + tableData.payment_money_real_sum + "</td>"));
    row.append($("<td>" + tableData.payment_money_sum + "</td>"));
  }
}

module.exports = getdata;
