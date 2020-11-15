-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 15, 2020 at 01:41 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_aggregator`
--

-- --------------------------------------------------------

--
-- Table structure for table `e_ec_sales`
--

CREATE TABLE `e_ec_sales` (
  `order_id` text DEFAULT NULL,
  `manage_id` text DEFAULT NULL,
  `complaint_flg` text DEFAULT NULL,
  `today_tomorrow_flg` text DEFAULT NULL,
  `shop_name` text DEFAULT NULL,
  `order_date` text DEFAULT NULL,
  `payment_category` text DEFAULT NULL,
  `payment_cnt` text DEFAULT NULL,
  `payment_limit_date` text DEFAULT NULL,
  `payment_date` text DEFAULT NULL,
  `rebate_date` text DEFAULT NULL,
  `delivery_category` text DEFAULT NULL,
  `delivery_cool_category` text DEFAULT NULL,
  `delivery_preferred_date` text DEFAULT NULL,
  `delivery_preferred_time` text DEFAULT NULL,
  `estimated_shipping_date` text DEFAULT NULL,
  `settlement_date` text DEFAULT NULL,
  `settlement_cancel_date` text DEFAULT NULL,
  `delivery_box_cnt` text DEFAULT NULL,
  `customer_name` text DEFAULT NULL,
  `customer_name_kana` text DEFAULT NULL,
  `customer_payment_name` text DEFAULT NULL,
  `customer_postal_code` text DEFAULT NULL,
  `customer_pref` text DEFAULT NULL,
  `customer_city` text DEFAULT NULL,
  `customer_details_address1` text DEFAULT NULL,
  `customer_details_address2` text DEFAULT NULL,
  `customer_company` text DEFAULT NULL,
  `customer_official_position` text DEFAULT NULL,
  `customer_tel` text DEFAULT NULL,
  `customer_mobile_phone` text DEFAULT NULL,
  `customer_fax` text DEFAULT NULL,
  `customer_order_cnt` text DEFAULT NULL,
  `customer_e_mail` text DEFAULT NULL,
  `customer_id` text DEFAULT NULL,
  `delivery_name` text DEFAULT NULL,
  `delivery_name_kana` text DEFAULT NULL,
  `delivery_postal_code` text DEFAULT NULL,
  `delivery_pref` text DEFAULT NULL,
  `delivery_city` text DEFAULT NULL,
  `delivery_details_address1` text DEFAULT NULL,
  `delivery_details_address2` text DEFAULT NULL,
  `delivery_company` text DEFAULT NULL,
  `delivery_official_position` text DEFAULT NULL,
  `delivery_tel` text DEFAULT NULL,
  `delivery_mobile_phone` text DEFAULT NULL,
  `delivery_fax` text DEFAULT NULL,
  `delivery_memo1` text DEFAULT NULL,
  `delivery_memo2` text DEFAULT NULL,
  `memo` text DEFAULT NULL,
  `in_house_comment` text DEFAULT NULL,
  `staff_comment` text DEFAULT NULL,
  `subtotal` text DEFAULT NULL,
  `postage` text DEFAULT NULL,
  `commission` text DEFAULT NULL,
  `tax` text DEFAULT NULL,
  `discount` text DEFAULT NULL,
  `use_point` text DEFAULT NULL,
  `coupon` text DEFAULT NULL,
  `total` text DEFAULT NULL,
  `status` text DEFAULT NULL,
  `in_house_goods_id` text DEFAULT NULL,
  `sku` text DEFAULT NULL,
  `goods_name` text DEFAULT NULL,
  `goods_name_abbreviation` text DEFAULT NULL,
  `unit_price` text DEFAULT NULL,
  `quantity` text DEFAULT NULL,
  `color` text DEFAULT NULL,
  `size` text DEFAULT NULL,
  `goods_option` text DEFAULT NULL,
  `shipping_date` text DEFAULT NULL,
  `trace_no` text DEFAULT NULL,
  `cost_price` text DEFAULT NULL,
  `purchase_order_date` text DEFAULT NULL,
  `loading_date` text DEFAULT NULL,
  `location_rack_no` text DEFAULT NULL,
  `supplier_name` text DEFAULT NULL,
  `supplier_code` text DEFAULT NULL,
  `brand_name` text DEFAULT NULL,
  `brand_code` text DEFAULT NULL,
  `including_no` text DEFAULT NULL,
  `cancel_date` text DEFAULT NULL,
  `return_date` text DEFAULT NULL,
  `cancel_reason` text DEFAULT NULL,
  `set_goods` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `e_ec_sales`
--

INSERT INTO `e_ec_sales` (`order_id`, `manage_id`, `complaint_flg`, `today_tomorrow_flg`, `shop_name`, `order_date`, `payment_category`, `payment_cnt`, `payment_limit_date`, `payment_date`, `rebate_date`, `delivery_category`, `delivery_cool_category`, `delivery_preferred_date`, `delivery_preferred_time`, `estimated_shipping_date`, `settlement_date`, `settlement_cancel_date`, `delivery_box_cnt`, `customer_name`, `customer_name_kana`, `customer_payment_name`, `customer_postal_code`, `customer_pref`, `customer_city`, `customer_details_address1`, `customer_details_address2`, `customer_company`, `customer_official_position`, `customer_tel`, `customer_mobile_phone`, `customer_fax`, `customer_order_cnt`, `customer_e_mail`, `customer_id`, `delivery_name`, `delivery_name_kana`, `delivery_postal_code`, `delivery_pref`, `delivery_city`, `delivery_details_address1`, `delivery_details_address2`, `delivery_company`, `delivery_official_position`, `delivery_tel`, `delivery_mobile_phone`, `delivery_fax`, `delivery_memo1`, `delivery_memo2`, `memo`, `in_house_comment`, `staff_comment`, `subtotal`, `postage`, `commission`, `tax`, `discount`, `use_point`, `coupon`, `total`, `status`, `in_house_goods_id`, `sku`, `goods_name`, `goods_name_abbreviation`, `unit_price`, `quantity`, `color`, `size`, `goods_option`, `shipping_date`, `trace_no`, `cost_price`, `purchase_order_date`, `loading_date`, `location_rack_no`, `supplier_name`, `supplier_code`, `brand_name`, `brand_code`, `including_no`, `cancel_date`, `return_date`, `cancel_reason`, `set_goods`) VALUES
('K1904221058621', '2154', 'null', 'null', '特販', 'Wed Apr 10 2019 04:41:15 GMT+0545 (Nepal Time)', '銀行振込', '一括払い', 'null', 'Wed Apr 10 2019 17:45:00 GMT+0545 (Nepal Time)', 'null', '佐川急便', '通常', 'null', 'null', 'null', 'null', 'null', '1', '株式会社三友貿易', 'null', 'null', '370-0347', '群馬県', '太田市新田大根町', '920-2', 'null', 'null', 'null', 'null', '080-5033-0204', 'null', '1', 'aaaa@docomo.ne.jp', 'S1904220001', '株式会社三友貿易', 'null', '370-0102', '群馬県', '伊勢崎市テスト', '1111', 'null', 'null', 'null', 'null', '080-5033-0204', 'null', 'null', 'null', '4/23発送', 'No19032701', 'null', '1062000', '0', '0', '0', '0', '0', '0', '1062000', '出荷済', '4903018113235', '4903018113235', '柳屋　ヘアトニック　中　２４０ｍｌ', '柳屋　ヘアトニック　中　２４０ｍｌ', '590', '1800', 'null', 'null', 'null', 'Tue Apr 23 2019 17:45:00 GMT+0545 (Nepal Time)', '401480349152', '530', 'null', 'null', '1322', '1322 （株）あらた　※花巻センター納品店舗のみ!ダイレクト・手書伝票FAX送付先', '1322', '12.化粧品', '12', 'null', 'null', 'null', 'null', 'null'),
('249-7926236-9473421', '89', 'null', 'null', '[A]ダイユーエイト', 'Wed Apr 10 2019 07:58:48 GMT+0545 (Nepal Time)', 'Amazonペイメント', 'null', 'null', 'null', 'null', '佐川急便', 'null', 'null', 'null', 'null', 'null', 'null', 'null', '*****', 'null', 'null', '000-0000', 'null', '*****', '*****', 'null', 'null', 'null', '*****', 'null', 'null', '1', '*****', 'sgn06jdnnyfqlg4@marketplace.amazon.co.jp', '*****', 'null', '000-0000', 'null', '*****', '*****', 'null', 'null', 'null', '*****', 'null', 'null', 'null', 'null', 'null', 'null', 'null', '2630', '0', '0', '0', '0', '0', '0', '2630', '出荷済', '4545244211554', '4545244211554', '武田コーポレーション 折りたたみテーブル OTB-6045NA', '武田コーポレーション 折りたたみテーブル OTB-6045NA', '2630', '1', 'null', 'null', 'null', 'Fri Apr 12 2019 17:45:00 GMT+0545 (Nepal Time)', '402568226690', '0', 'Wed Apr 10 2019 17:45:00 GMT+0545 (Nepal Time)', 'null', '14', '1153 共同企業体福島・県北アスコン', '1153', '14.収納用品', '14', 'null', 'null', 'null', 'null', 'null'),
('Y1-10019765', '9', 'null', 'null', '[Y]ダイユーエイト.com', 'Wed Apr 10 2019 08:13:46 GMT+0545 (Nepal Time)', 'クレジットカード', '一括払い', 'null', 'null', 'null', '佐川急便', '通常', 'null', '午前中', 'null', 'null', 'null', '1', '河野 弘二', 'カワノ コウジ', 'null', '579-8014', '大阪府', '東大阪市', '中石切町2-3-37', 'null', 'null', 'null', '8056334556', 'null', 'null', '1', 'aaaa@mba.nifty.ne.jp', 'pod@mba.nifty.ne.jp', '河野 弘二', 'テスト　タロウ', '579-8014', '大阪府', '東大阪市', 'テスト町1-1-1', 'null', 'null', 'null', '8056334556', 'null', 'null', 'null', 'null', 'null', '□モールクーポン -1240円_x000D_', '4/9発注済み', '15500', '0', '0', '0', '0', '535', '1240', '13725', '出荷済', '4989236344057', '4989236344057', 'LIXIL(リクシル) INAX キッチン用 台付 浄水器内蔵シングルレバー混合水栓 エコハンドル 浄水 微細シャワー整流 ホース引出し RJF-771Y', 'null', '15500', '1', 'null', 'null', 'レビューを書きますか:書きます！（100円OFFクーポン進呈）', 'Thu Apr 11 2019 17:45:00 GMT+0545 (Nepal Time)', '403653906961', '13392', 'Wed Apr 10 2019 17:45:00 GMT+0545 (Nepal Time)', 'null', '1', '1003 （株）ＬＩＸＩＬトータルサービス', '1003', '3.作業資材', '3', 'null', 'null', 'null', 'null', 'null'),
('Y1-10019766', '8', 'null', 'null', '[Y]ダイユーエイト.com', 'Wed Apr 10 2019 08:19:00 GMT+0545 (Nepal Time)', 'クレジットカード', '一括払い', 'null', 'null', 'null', '佐川急便', '通常', 'null', '指定なし', 'null', 'null', 'null', '1', '藤原 輝容美', 'フジワラ キヨミ', 'null', '028-1321', '岩手県', '下閉伊郡山田町山田', '5-66-15', 'null', 'null', 'null', '9026073258', 'null', 'null', '1', 'aaaa@yahoo.co.jp', 'huziwara_kiyomi@yahoo.co.jp', '藤原 輝容美', 'テスト　ハナコ', '028-1321', '岩手県', '下閉伊郡テスト町テスト', '5-66-15', 'null', 'null', 'null', '9026073258', 'null', 'null', 'null', 'null', 'null', 'null', '4/9発注済み', '6198', '700', '0', '0', '0', '0', '0', '6898', '出荷済', '4937819102006', '4937819102006', '高須産業　一般換気扇２０ｃｍ FTD-20ST', 'null', '3099', '2', 'null', 'null', 'レビューを書きますか:書きます！（100円OFFクーポン進呈）', 'Thu Apr 11 2019 17:45:00 GMT+0545 (Nepal Time)', '403653906950', '2318', 'Wed Apr 10 2019 17:45:00 GMT+0545 (Nepal Time)', 'null', '1', '1528 広瀬無線電機（株）', '1528', '16.家電製品', '16', 'null', 'null', 'null', 'null', 'null'),
('503-3780932-8865427', '11', 'null', 'null', '[A]ダイユーエイト', 'Wed Apr 10 2019 08:24:06 GMT+0545 (Nepal Time)', 'Amazonペイメント', '一括払い', 'null', 'null', 'null', '佐川急便', '通常', 'null', 'null', 'null', 'null', 'null', '1', '*****', 'null', 'null', '000-0000', 'null', '*****', '*****', 'null', 'null', 'null', '*****', 'null', 'null', '1', '*****', 'fwlvbrg078lnl69@marketplace.amazon.co.jp', '*****', 'null', '000-0000', 'null', '*****', '*****', 'null', 'null', 'null', '*****', 'null', 'null', 'null', 'null', 'null', 'null', 'null', '0', '0', '0', '0', '0', '0', '0', '0', 'キャンセル', '4905009298730', '4905009298730', 'アイリスオーヤマ カラー化粧棚板 LBC-1830 ホワイト', 'アイリスオーヤマ カラー化粧棚板 LBC-1830 ホワイト', '3260', '1', 'null', 'null', 'null', 'null', '403653906946', '0', 'Wed Apr 10 2019 17:45:00 GMT+0545 (Nepal Time)', 'null', '1', '1123 カネコ種苗（株）', '1123', '1.木材塗料', '1', 'null', 'Fri Apr 12 2019 17:45:00 GMT+0545 (Nepal Time)', 'null', 'null', 'null');

-- --------------------------------------------------------

--
-- Table structure for table `e_real_sales`
--

CREATE TABLE `e_real_sales` (
  `customer_id` text DEFAULT NULL,
  `customer_name` text DEFAULT NULL,
  `customer_name_kana` text DEFAULT NULL,
  `customer_postal_code` text DEFAULT NULL,
  `customer_address1` text DEFAULT NULL,
  `customer_tel1` text DEFAULT NULL,
  `customer_birthday` text DEFAULT NULL,
  `in_house_payment` text DEFAULT NULL,
  `in_house_quantity` text DEFAULT NULL,
  `in_house_coming_cnt` text DEFAULT NULL,
  `other_company_payment` text DEFAULT NULL,
  `other_company_quantity` text DEFAULT NULL,
  `other_company_coming_cnt` text DEFAULT NULL,
  `other_company_coming_date_cnt` text DEFAULT NULL,
  `date` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `test`
--

CREATE TABLE `test` (
  `FirstName` text DEFAULT NULL,
  `LastName` text DEFAULT NULL,
  `Gender` text DEFAULT NULL,
  `Country` text DEFAULT NULL,
  `Age` text DEFAULT NULL,
  `Date` text DEFAULT NULL,
  `Id` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `test`
--

INSERT INTO `test` (`FirstName`, `LastName`, `Gender`, `Country`, `Age`, `Date`, `Id`) VALUES
('Dulce', 'Abril', 'Female', 'United States', '32', '15/10/2017', '1562'),
('Mara', 'Hashimoto', 'Female', 'Great Britain', '25', '16/08/2016', '1582'),
('Philip', 'Gent', 'Male', 'France', '36', '21/05/2015', '2587'),
('Kathleen', 'Hanner', 'Female', 'United States', '25', '15/10/2017', '3549'),
('Nereida', 'Magwood', 'Female', 'United States', '58', '16/08/2016', '2468'),
('Gaston', 'Brumm', 'Male', 'United States', '24', '21/05/2015', '2554'),
('Etta', 'Hurn', 'Female', 'Great Britain', '56', '15/10/2017', '3598'),
('Earlean', 'Melgar', 'Female', 'United States', '27', '16/08/2016', '2456'),
('Vincenza', 'Weiland', 'Female', 'United States', '40', '21/05/2015', '6548');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
