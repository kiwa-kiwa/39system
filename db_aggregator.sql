-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 22, 2020 at 07:39 AM
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
-- Table structure for table `e_csv_import`
--

CREATE TABLE `e_csv_import` (
  `file_name` text DEFAULT NULL,
  `import_timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `store_id` text DEFAULT NULL,
  `store_name` text DEFAULT NULL,
  `payment_date` text DEFAULT NULL,
  `payment_money` text DEFAULT NULL,
  `payment_item_cnt` text DEFAULT NULL,
  `coming_cnt` text DEFAULT NULL,
  `mobile_e_mail` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `e_real_sales`
--

INSERT INTO `e_real_sales` (`customer_id`, `customer_name`, `customer_name_kana`, `customer_postal_code`, `customer_address1`, `customer_tel1`, `customer_birthday`, `store_id`, `store_name`, `payment_date`, `payment_money`, `payment_item_cnt`, `coming_cnt`, `mobile_e_mail`) VALUES
('2.5E+12', '都築功                                          ', '                        ', '9608254', '                                        ', '090-5184-5048', '1980/6/20', '0', '0', '0', '0', '6842', '3', '1'),
('2.5E+12', '都築功                                          ', '                        ', '9608254', '                                        ', '090-5184-5048', '1980/6/20', '0', '0', '0', '0', '5228', '11', '1'),
('2.50E+12', '都築功                                          ', '                        ', '9608254', '                                        ', '090-5184-5048', '1980/6/20', '0', '0', '0', '0', '4414', '5', '3');

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

-- --------------------------------------------------------

--
-- Table structure for table `v_aggregate`
--

CREATE TABLE `v_aggregate` (
  `aggregate_id` text DEFAULT NULL,
  `customer_category` text DEFAULT NULL,
  `customer_name` text DEFAULT NULL,
  `customer_age` text DEFAULT NULL,
  `customer_tel` text DEFAULT NULL,
  `customer_postal_code` text DEFAULT NULL,
  `customer_pref_city` text DEFAULT NULL,
  `buy_month` text DEFAULT NULL,
  `buy_money_total` text DEFAULT NULL,
  `buy_item_total_cnt` text DEFAULT NULL,
  `buy_money_total_real` text DEFAULT NULL,
  `buy_item_total_cnt_real` text DEFAULT NULL,
  `buy_money_total_ec` text DEFAULT NULL,
  `buy_item_total_cnt_ec` text DEFAULT NULL,
  `ec_shop_name` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
