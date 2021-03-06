const connection = require("../config");

var data = [];

//Saving To DB
function getmember(from, to, type) {
  $("#member #loading-item").css("display", "flex");

  var query = connection.query(`SELECT 

  view_sum.customer_category
  ,count(view_sum.customer_name) as  member_cnt
  
  FROM 
  (
  SELECT 
  case 
      when view.customer_category = 'COMMON' then '共通会員' 
      when view.customer_category = 'REAL' then '店舗のみ会員' 
      when view.customer_category = 'EC' then 'ECのみ会員' 
      else view.customer_category 
  end as customer_category
  ,view.customer_name 
  ,max(view.age) as age  
  , GROUP_CONCAT(DISTINCT view.customer_tel SEPARATOR ',') AS customer_tel
  , GROUP_CONCAT(DISTINCT view.postal_code SEPARATOR ',') AS postal_code 
  ,view.address
  ,view.payment_date
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
          WHERE DATE_FORMAT(e_ec_sales.order_date,'%Y-%m') >= '${from}' AND DATE_FORMAT(e_ec_sales.order_date,'%Y-%m') <= '${to}' /* DATE_KEY(YYYY-MM) */
      GROUP BY e_ec_sales.customer_name , e_ec_sales.customer_tel , e_ec_sales.customer_postal_code , CONCAT(r_zip.ken_name,
              r_zip.city_name) , DATE_FORMAT(e_ec_sales.order_date,
              '%Y-%m')
  ) as view
  
  GROUP BY 
  view.customer_category 
  ,view.customer_name 
  
  
  ) as view_sum
  
  group by 
  
  view_sum.customer_category
  
  
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
        createRow(data[i]);
      }
      var sum = 0;
      $(".member_cnt").each(function () {
        sum += parseFloat($(this).text().replace(/\D/g, "")); // Or this.innerHTML, this.innerText
      });
      $("#member_total").append(
        $("<div></div>").text(sum.toLocaleString() + " 名")
      );
      $("#member #loading-item").css("display", "none");
    });

  //A function that renders the value
  function createRow(tableData) {
    // var row = $('<div class="res"/>');
    // $("#member").append(row);
    // row.append($("<span>" + tableData.customer_category + "</span>"));
    // row.append(
    //   $(
    //     "<span class='member_cnt'>" +
    //       tableData.member_cnt.toLocaleString() +
    //       " 名" +
    //       "</span>"
    //   )
    // );

    $("#member  .res").each(function () {
      var ht = $(this).find("span").html();
      if (ht === tableData.customer_category) {
        $(this)
          .find(".member_cnt")
          .html(tableData.member_cnt.toLocaleString() + " 名");
      }
    });
  }
}

module.exports = getmember;
