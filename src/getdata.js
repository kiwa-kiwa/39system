const connection = require("../config");
const getmember = require("./getmember");
const getmoney = require("./getmoney");
const getitem = require("./getitem");

var data = [];

//Saving To DB
function getdata(from, to, type) {
  var ask;
  if (
    type.indexOf("common") > -1 &&
    type.indexOf("real") > -1 &&
    type.indexOf("ec") > -1
  ) {
    ask = "view.customer_category = view.customer_category";
  } else if (type.indexOf("common") > -1 && type.indexOf("real") > -1) {
    ask = `view.customer_category = 'COMMON'
    OR view.customer_category = 'REAL'`;
  } else if (type.indexOf("real") > -1 && type.indexOf("ec") > -1) {
    ask = `view.customer_category = 'EC'
    OR view.customer_category = 'REAL'`;
  } else if (type.indexOf("ec") > -1 && type.indexOf("common") > -1) {
    ask = `view.customer_category = 'EC'
    OR view.customer_category = 'COMMON'`;
  } else if (type.indexOf("common") > -1) {
    ask = `view.customer_category = 'COMMON'`;
  } else if (type.indexOf("real") > -1) {
    ask = `view.customer_category = 'REAL'`;
  } else if (type.indexOf("ec") > -1) {
    ask = `view.customer_category = 'EC'`;
  } else {
    ask = "view.customer_category = view.customer_category";
  }

  document.getElementById("loading").style.display = "flex";
  var query = connection.query(
    `SELECT 
    case 
      when view.customer_category = 'COMMON' then '共通会員' 
      when view.customer_category = 'REAL' then '店舗のみ会員' 
      when view.customer_category = 'EC' then 'ECのみ会員' 
        else view.customer_category 
    end as '会員種別'
    ,view.customer_name as '名前' 
    ,max(view.age) as '年齢'  
    ,case 
      when view.customer_category = 'COMMON' then GROUP_CONCAT(DISTINCT view.customer_tel SEPARATOR ',') 
        else view.customer_tel 
    end AS '電話番号' 
    ,case 
      when view.customer_category = 'COMMON' then GROUP_CONCAT(DISTINCT view.postal_code SEPARATOR ',') 
        else view.postal_code 
    end AS '郵便番号' 
    ,view.address as 'エリア'
    ,GROUP_CONCAT(DISTINCT replace(view.payment_date,'-','/') SEPARATOR ',') as '購入月' 
    
    ,sum(view.payment_money_sum) as '購入金額_合計' 
    ,sum(view.payment_item_cnt_sum) as '購入点数_合計'
    
    ,sum(view.payment_money_real_sum) as '購入金額_店舗'
    ,sum(view.payment_item_cnt_real_sum) as '購入点数_店舗'
    
    ,sum(view.payment_money_ec_sum) as '購入金額_EC'
    ,sum(view.payment_item_cnt_ec_sum) as '購入点数_EC'
    ,GROUP_CONCAT(DISTINCT view.ec_name SEPARATOR ',') as 'EC店舗名' 
    
    ,GROUP_CONCAT(DISTINCT view.store_id SEPARATOR ',') as '店コード' 
    ,GROUP_CONCAT(DISTINCT view.store_name SEPARATOR ',') as '店舗名称'
    ,case when view.mobile_e_mail = '' then '' else '〇' end as 'アプリ会員'
    
    FROM 
    (
        SELECT         
            
            CASE WHEN EXISTS(select * FROM e_ec_sales WHERE e_ec_sales.customer_name = e_real_sales.customer_name AND (replace(e_ec_sales.customer_postal_code,'-','') = e_real_sales.customer_postal_code OR replace(e_ec_sales.customer_tel,'-','') = replace(e_real_sales.customer_tel1,'-','') ) AND LEFT(e_real_sales.payment_date,7) >= '${from}' AND LEFT(e_real_sales.payment_date,7) <= '${to}' AND DATE_FORMAT(e_ec_sales.order_date,'%Y-%m') >= '${from}' AND DATE_FORMAT(e_ec_sales.order_date,'%Y-%m') <= '${to}' ) = true THEN 'COMMON' ELSE 'REAL' END  AS customer_category, /* DATE_KEY(YYYY-MM) */
            
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
            null AS ec_name,
            e_real_sales.store_id,
        e_real_sales.store_name,
        max(e_real_sales.mobile_e_mail) as mobile_e_mail 
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
            
        CASE WHEN EXISTS(select * FROM e_real_sales WHERE e_ec_sales.customer_name = e_real_sales.customer_name AND ( replace(e_ec_sales.customer_postal_code,'-','') = e_real_sales.customer_postal_code OR replace(e_ec_sales.customer_tel,'-','') = replace(e_real_sales.customer_tel1,'-','') ) AND LEFT(e_real_sales.payment_date,7) >= '${from}' AND LEFT(e_real_sales.payment_date,7) <= '${to}' AND DATE_FORMAT(e_ec_sales.order_date,'%Y-%m') >= '${from}' AND DATE_FORMAT(e_ec_sales.order_date,'%Y-%m') <= '${to}' ) = true THEN 'COMMON' ELSE 'EC' END  AS customer_category, /* DATE_KEY(YYYY-MM) */
        
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
                SEPARATOR ',') AS ec_name,
          null as store_id,
          null as store_name,
          '' as mobile_e_mail 
        FROM
            (e_ec_sales
            LEFT JOIN r_zip ON ((e_ec_sales.customer_postal_code = CONVERT( r_zip.zip USING UTF8MB4))))
            WHERE DATE_FORMAT(e_ec_sales.order_date,'%Y-%m') >= '${from}' AND DATE_FORMAT(e_ec_sales.order_date,'%Y-%m') <= '${to}' /* DATE_KEY(YYYY-MM) */
            
        GROUP BY e_ec_sales.customer_name , e_ec_sales.customer_tel , e_ec_sales.customer_postal_code , CONCAT(r_zip.ken_name,
                r_zip.city_name) , DATE_FORMAT(e_ec_sales.order_date,
                '%Y-%m')
    ) as view
    
    where 
    ` +
      `
    ${ask}
    
    
    GROUP BY 
    view.customer_category 
    ,view.customer_name 
    
    ,view.address
    
    
    
    ;`
  );
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
      //Replacinf the null with blank
      var x = document.querySelectorAll("#td");
      for (var i = 0; i < x.length; i++) {
        var res = x[i].innerHTML.replace(/null/gi, "");
        x[i].innerHTML = res;
      }
      //Caling other queries
      getmember(from, to);
      getmoney(from, to);
      getitem(from, to);
      //Make Table
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
    });

  //A function that renders the table after the file is loaded
  function createTable(tableData) {
    var row = $("<tr />");
    $("#testtbl").append(row);
    row.append($("<td id='td'>" + tableData.会員種別 + "</td>"));
    row.append($("<td id='td'>" + tableData.名前 + "</td>"));
    row.append($("<td id='td' class='numtd'>" + tableData.年齢 + "</td>"));
    row.append($("<td id='td' class='numtd'>" + tableData.電話番号 + "</td>"));
    row.append($("<td id='td' class='numtd'>" + tableData.郵便番号 + "</td>"));
    row.append($("<td id='td'>" + tableData.エリア + "</td>"));
    row.append($("<td id='td' class='numtd'>" + tableData.購入月 + "</td>"));
    row.append(
      $(
        "<td id='td' class='numtd'>" +
          tableData.購入金額_合計.toLocaleString() +
          "</td>"
      )
    );
    row.append(
      $(
        "<td id='td' class='numtd'>" +
          tableData.購入点数_合計.toLocaleString() +
          "</td>"
      )
    );
    row.append(
      $(
        "<td id='td' class='numtd'>" +
          tableData.購入金額_店舗.toLocaleString() +
          "</td>"
      )
    );
    row.append(
      $(
        "<td id='td' class='numtd'>" +
          tableData.購入点数_店舗.toLocaleString() +
          "</td>"
      )
    );
    row.append(
      $(
        "<td id='td' class='numtd'>" +
          tableData.購入金額_EC.toLocaleString() +
          "</td>"
      )
    );
    row.append(
      $(
        "<td id='td' class='numtd'>" +
          tableData.購入点数_EC.toLocaleString() +
          "</td>"
      )
    );
    row.append($("<td id='td'>" + tableData.EC店舗名 + "</td>"));
    row.append($("<td id='td'>" + tableData.店コード + "</td>"));
    row.append($("<td id='td'>" + tableData.店舗名称 + "</td>"));
    row.append($("<td id='td'>" + tableData.アプリ会員 + "</td>"));
  }
}

module.exports = getdata;
