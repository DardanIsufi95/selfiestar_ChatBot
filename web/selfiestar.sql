-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 192.168.88.10
-- Generation Time: May 26, 2020 at 10:55 PM
-- Server version: 5.7.27
-- PHP Version: 7.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `selfiestar`
--
CREATE DATABASE IF NOT EXISTS `selfiestar` DEFAULT CHARACTER SET utf32 COLLATE utf32_bin;
USE `selfiestar`;

-- --------------------------------------------------------

--
-- Table structure for table `hellotexts`
--

DROP TABLE IF EXISTS `hellotexts`;
CREATE TABLE `hellotexts` (
  `id` int(15) UNSIGNED ZEROFILL NOT NULL,
  `profile` varchar(20) COLLATE utf32_bin NOT NULL,
  `text` text COLLATE utf32_bin NOT NULL,
  `date` varchar(10) COLLATE utf32_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_bin;

--
-- Dumping data for table `hellotexts`
--

INSERT INTO `hellotexts` (`id`, `profile`, `text`, `date`) VALUES
(000000000000001, '4WZl3WAGIS', 'hallolieber,wiegehtesdirdenso', '09-05-2020'),
(000000000000002, '4WZl3WAGIS', 'hallihallo,nawiefindestdudendentagheute', '09-05-2020'),
(000000000000003, 'fJMXqZ2Mow', 'naistdaswetterbeidirauchsoschoehn', '09-05-2020'),
(000000000000004, '4WZl3WAGIS', 'naschoennermann,nachwassuchstdudensohier', '09-05-2020'),
(000000000000005, 'pS2z00HIun', 'naschoennermann,wieistdendaswettersobeidir', '09-05-2020'),
(000000000000006, '4WZl3WAGIS', 'nawiegehtesdensobeidirheute', '09-05-2020'),
(000000000000007, '4WZl3WAGIS', 'na wie ist den das wetter so bei dir', '09-05-2020'),
(000000000000008, 'rvcVE3kpmE', 'na wie ist den das wetter so bei dir heute', '09-05-2020'),
(000000000000009, 'fJMXqZ2Mow', 'hallo schoenner mann wie gehts den so bei dir heute', '09-05-2020'),
(000000000000010, 'pS2z00HIun', 'hallo ich bin die claudie , kann man dich den kennen lehrnen', '09-05-2020'),
(000000000000011, 'qJtGSi08Ja', 'na wie gets wie stehts den heute bei dir so ', '09-05-2020'),
(000000000000012, 'pS2z00HIun', 'asda sdas dasd asd asd asd asd asd asd asd', '21-05-2020'),
(000000000000013, 'qJtGSi08Ja', 'dasd asd asd asd asd asd asd asd asd asd asd asd', '21-05-2020'),
(000000000000014, 'rvcVE3kpmE', 'dasd asd asd asd asd asd asd asd a dasd asd a sdasd', '21-05-2020'),
(000000000000015, 'rvcVE3kpmE', 'wd asd asd asd asd asda sdqwd gfsd fsdgf sdgf sgsd fgsdf', '21-05-2020'),
(000000000000016, 'rvcVE3kpmE', 'dasd wed arf asdf sdgf sdgfdfgd fgd fgd fg d', '21-05-2020'),
(000000000000017, 'fJMXqZ2Mow', 'asdasd asd asd asd asd as dasd asd asd as d', '22-05-2020'),
(000000000000018, '4WZl3WAGIS', 'das dw qdasd asf gdfgre4 23 rsdf sdf sdf sdf sdf', '22-05-2020'),
(000000000000019, '4WZl3WAGIS', 'asd asd qwed asf dfgh fgh gk hjk sdfg asdf asd asd', '22-05-2020'),
(000000000000020, '8IhrWclBws', 'ee asdf sdf sdf sdf sdf sdf sdf sdf sdf sdf sdf sdf sdf sdf', '22-05-2020'),
(000000000000021, '8IhrWclBws', 'asd asd ewtet rw2e4 trwef sdf sdg sgdf sdgf sdg sdg sg sdg sg sgd sd gf', '22-05-2020'),
(000000000000022, 'pS2z00HIun', 'as dasd asd asd asd asd asd asd asd asd as dasd', '22-05-2020'),
(000000000000023, '4WZl3WAGIS', 'asd asd asd asd asd asd asd a sdasd asd asd asd asd asd ad', '22-05-2020'),
(000000000000024, 'qJtGSi08Ja', 'asd asd asd wqe123e eawsd asd asd asd asd', '22-05-2020'),
(000000000000025, '4WZl3WAGIS', 'asd asd asd asd asd asd asd asd asd asd', '22-05-2020'),
(000000000000026, '4WZl3WAGIS', 'das dasd asd asd asd asd asd asd asd asd ad ad as da sd', '22-05-2020'),
(000000000000027, '4WZl3WAGIS', 'asd asd asd asd asd asd ad ad asd asd a dad', '22-05-2020'),
(000000000000028, 'qJtGSi08Ja', 'ad asd asd asd asd asd asd asd asd asd asd asd asd a d', '22-05-2020'),
(000000000000029, '4WZl3WAGIS', 'asd asdfahkfh ieghf sgdfjh gsdjhfg sjdfg jshdgf jsdf s df', '22-05-2020'),
(000000000000030, 'qJtGSi08Ja', 'v dsf sf sdf sdf sdf sdf sdf sdf sdf sdf sdf sdf', '25-05-2020'),
(000000000000031, 'qJtGSi08Ja', 'das dasd qwd asd asd asd ad asd asd asd', '25-05-2020'),
(000000000000032, 'rvcVE3kpmE', 'das dasd asd asd asd asd asd asd asd asd as dad', '25-05-2020');

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
CREATE TABLE `settings` (
  `id` int(10) UNSIGNED NOT NULL,
  `admin_username` varchar(30) COLLATE utf32_bin NOT NULL,
  `admin_password` varchar(30) COLLATE utf32_bin NOT NULL,
  `min_wait` int(11) NOT NULL,
  `max_wait` int(11) NOT NULL,
  `max_msg_client` int(11) NOT NULL,
  `text_min_len` int(11) NOT NULL,
  `max_last_online` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_bin;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `admin_username`, `admin_password`, `min_wait`, `max_wait`, `max_msg_client`, `text_min_len`, `max_last_online`) VALUES
(1, 'karsten', 'Hannover200.', 9, 14, 3, 35, 25);

-- --------------------------------------------------------

--
-- Table structure for table `settings2`
--

DROP TABLE IF EXISTS `settings2`;
CREATE TABLE `settings2` (
  `id` int(10) UNSIGNED NOT NULL,
  `username` varchar(50) COLLATE utf32_bin NOT NULL,
  `password` varchar(50) COLLATE utf32_bin NOT NULL,
  `min_wait` int(11) NOT NULL,
  `max_wait` int(11) NOT NULL,
  `max_msg_profile` int(11) NOT NULL,
  `max_msg_client` int(11) NOT NULL,
  `text_min_len` int(11) NOT NULL,
  `max_last_online` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_bin;

--
-- Dumping data for table `settings2`
--

INSERT INTO `settings2` (`id`, `username`, `password`, `min_wait`, `max_wait`, `max_msg_profile`, `max_msg_client`, `text_min_len`, `max_last_online`) VALUES
(1, 'username', 'password', 8, 15, 20000, 3, 35, 25);

-- --------------------------------------------------------

--
-- Table structure for table `texts`
--

DROP TABLE IF EXISTS `texts`;
CREATE TABLE `texts` (
  `id` int(25) UNSIGNED ZEROFILL NOT NULL,
  `profile` varchar(15) COLLATE utf32_bin NOT NULL,
  `client` varchar(15) COLLATE utf32_bin NOT NULL,
  `text` text COLLATE utf32_bin NOT NULL,
  `date` varchar(10) COLLATE utf32_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_bin;

--
-- Dumping data for table `texts`
--

INSERT INTO `texts` (`id`, `profile`, `client`, `text`, `date`) VALUES
(0000000000000000000000001, 'undefined', 'DDiTihbzwn', 'na wie ist den das wetter so bei dir heute ', '09-05-2020'),
(0000000000000000000000002, 'pS2z00HIun', '0SSENyK1A0', 'na wie ist den das wetter so bei dir heute ', '09-05-2020'),
(0000000000000000000000003, 'undefined', 'qwo1xgzbWj', 'na wie ist den das wetter so bei dir heute ', '09-05-2020'),
(0000000000000000000000004, 'undefined', 'CIM4i9Qe7V', 'na wie ist den das wetter so bei dir heute ', '09-05-2020'),
(0000000000000000000000005, 'undefined', 'cVVkUsq9h8', 'na wie ist den das wetter so bei dir heute ', '09-05-2020'),
(0000000000000000000000006, 'undefined', 'SQVL2TBChI', 'na wie ist den das wetter so bei dir heute ', '09-05-2020'),
(0000000000000000000000007, 'undefined', 'JHTKW1eKEc', 'na wie ist den das wetter so bei dir heute ', '09-05-2020'),
(0000000000000000000000008, 'undefined', 'qGzhR6Kav4', 'na wie ist den das wetter so bei dir heute ', '09-05-2020'),
(0000000000000000000000009, 'undefined', 'ocojTR5TkX', 'na wie ist den das wetter so bei dir heute ', '09-05-2020'),
(0000000000000000000000010, 'undefined', 'FQTwWZzzLX', 'na wie ist den das wetter so bei dir heute ', '09-05-2020'),
(0000000000000000000000011, 'undefined', 'SbfuXnkHal', 'na wie ist den das wetter so bei dir heute ', '09-05-2020'),
(0000000000000000000000012, 'undefined', '9UdfehuwOi', 'na wie ist den das wetter so bei dir heute ', '09-05-2020'),
(0000000000000000000000013, 'undefined', '1zLs97kc3V', 'hallo schoenner mann wie gehts den so bei dir heute ', '09-05-2020'),
(0000000000000000000000014, 'undefined', 'D6aroYN7Uz', 'hallo schoenner mann wie gehts den so bei dir heute ', '09-05-2020'),
(0000000000000000000000015, 'undefined', 'VpaICjQspI', 'hallo schoenner mann wie gehts den so bei dir heute ', '09-05-2020'),
(0000000000000000000000016, 'undefined', '59IkAxah2S', 'hallo ich bin die claudie , kann man dich den kennen lehrnen', '09-05-2020'),
(0000000000000000000000017, 'undefined', 'ARQZvfDYFg', 'hallo ich bin die claudie , kann man dich den kennen lehrnen', '09-05-2020'),
(0000000000000000000000018, 'undefined', 'burqztwEFQ', 'na wie gets wie stehts den heute bei dir so ', '09-05-2020'),
(0000000000000000000000019, 'undefined', 'jywO1omxg6', 'hallo ich bin die claudie , kann man dich den kennen lehrnen', '09-05-2020'),
(0000000000000000000000020, 'undefined', 'iJArk1DGa2', 'na wie gets wie stehts den heute bei dir so ', '09-05-2020'),
(0000000000000000000000021, 'undefined', 'yOrs9G72ZR', 'na wie gets wie stehts den heute bei dir so ', '09-05-2020'),
(0000000000000000000000022, 'qJtGSi08Ja', 'ARQZvfDYFg', 'dasd asd asd asd asd asd asd asd asd asd asd asd ', '21-05-2020'),
(0000000000000000000000023, 'qJtGSi08Ja', 'tT9Fp5ujIa', 'dasd asd asd asd asd asd asd asd asd asd asd asd ', '21-05-2020'),
(0000000000000000000000024, 'rvcVE3kpmE', 'sdeIJw9hAc', 'dasd asd asd asd asd asd asd asd a dasd asd a sdasd ', '21-05-2020'),
(0000000000000000000000025, 'rvcVE3kpmE', 'rXhGVYSNR2', 'dasd asd asd asd asd asd asd asd a dasd asd a sdasd ', '21-05-2020'),
(0000000000000000000000026, 'rvcVE3kpmE', 'ExhmK4Lqsz', 'dasd asd asd asd asd asd asd asd a dasd asd a sdasd ', '21-05-2020'),
(0000000000000000000000027, 'rvcVE3kpmE', '5K2sSEJ9Fy', 'dasd asd asd asd asd asd asd asd a dasd asd a sdasd ', '21-05-2020'),
(0000000000000000000000028, 'rvcVE3kpmE', '5vsIM2J6OJ', 'dasd asd asd asd asd asd asd asd a dasd asd a sdasd ', '21-05-2020'),
(0000000000000000000000029, 'rvcVE3kpmE', '0I0uBbbOrB', 'dasd asd asd asd asd asd asd asd a dasd asd a sdasd ', '21-05-2020'),
(0000000000000000000000030, 'rvcVE3kpmE', 'jpXEN7wLY9', 'dasd asd asd asd asd asd asd asd a dasd asd a sdasd ', '21-05-2020'),
(0000000000000000000000031, 'rvcVE3kpmE', '2V2GWuIwmt', 'dasd asd asd asd asd asd asd asd a dasd asd a sdasd ', '21-05-2020'),
(0000000000000000000000032, 'rvcVE3kpmE', 'cMvwAeT7YZ', 'dasd asd asd asd asd asd asd asd a dasd asd a sdasd ', '21-05-2020'),
(0000000000000000000000033, 'rvcVE3kpmE', 'HpnBLN0ACk', 'wd asd asd asd asd asda sdqwd gfsd fsdgf sdgf sgsd fgsdf ', '21-05-2020'),
(0000000000000000000000034, 'rvcVE3kpmE', 'TEhmnMmI3E', 'wd asd asd asd asd asda sdqwd gfsd fsdgf sdgf sgsd fgsdf ', '21-05-2020'),
(0000000000000000000000035, 'rvcVE3kpmE', 'XrDDcF1cUd', 'wd asd asd asd asd asda sdqwd gfsd fsdgf sdgf sgsd fgsdf ', '21-05-2020'),
(0000000000000000000000036, 'rvcVE3kpmE', 'OvxSxyV9Hg', 'wd asd asd asd asd asda sdqwd gfsd fsdgf sdgf sgsd fgsdf ', '21-05-2020'),
(0000000000000000000000037, 'rvcVE3kpmE', '6KPGD9IQAA', 'wd asd asd asd asd asda sdqwd gfsd fsdgf sdgf sgsd fgsdf ', '21-05-2020'),
(0000000000000000000000038, 'rvcVE3kpmE', 'jSSZl88gL7', 'wd asd asd asd asd asda sdqwd gfsd fsdgf sdgf sgsd fgsdf ', '21-05-2020'),
(0000000000000000000000039, 'rvcVE3kpmE', 'XU3ANtM91d', 'wd asd asd asd asd asda sdqwd gfsd fsdgf sdgf sgsd fgsdf ', '21-05-2020'),
(0000000000000000000000040, 'rvcVE3kpmE', '3MAWVjLkxt', 'wd asd asd asd asd asda sdqwd gfsd fsdgf sdgf sgsd fgsdf ', '21-05-2020'),
(0000000000000000000000041, 'rvcVE3kpmE', 'IRmuMKOibP', 'wd asd asd asd asd asda sdqwd gfsd fsdgf sdgf sgsd fgsdf ', '21-05-2020'),
(0000000000000000000000042, 'rvcVE3kpmE', 'qFYC0fGcg8', 'wd asd asd asd asd asda sdqwd gfsd fsdgf sdgf sgsd fgsdf ', '21-05-2020'),
(0000000000000000000000043, 'rvcVE3kpmE', 'Gl2MoMD9zu', 'wd asd asd asd asd asda sdqwd gfsd fsdgf sdgf sgsd fgsdf ', '21-05-2020'),
(0000000000000000000000044, 'rvcVE3kpmE', 'pKhd0HHlRB', 'wd asd asd asd asd asda sdqwd gfsd fsdgf sdgf sgsd fgsdf ', '21-05-2020'),
(0000000000000000000000045, 'rvcVE3kpmE', 'tFZh4fBiBh', 'dasd wed arf asdf sdgf sdgfdfgd fgd fgd fg d', '21-05-2020'),
(0000000000000000000000046, 'rvcVE3kpmE', '1Yk1FGoycQ', 'dasd wed arf asdf sdgf sdgfdfgd fgd fgd fg d', '21-05-2020'),
(0000000000000000000000047, 'rvcVE3kpmE', 'oPfV5RYO8s', 'dasd wed arf asdf sdgf sdgfdfgd fgd fgd fg d', '21-05-2020'),
(0000000000000000000000048, 'rvcVE3kpmE', 'ARQZvfDYFg', 'dasd wed arf asdf sdgf sdgfdfgd fgd fgd fg d', '21-05-2020'),
(0000000000000000000000049, 'rvcVE3kpmE', 'mUlBLRzdsu', 'dasd wed arf asdf sdgf sdgfdfgd fgd fgd fg d', '21-05-2020'),
(0000000000000000000000050, 'rvcVE3kpmE', 'dhxvNRxRMm', 'dasd wed arf asdf sdgf sdgfdfgd fgd fgd fg d', '21-05-2020'),
(0000000000000000000000051, 'rvcVE3kpmE', 'DnEFxqvcta', 'dasd wed arf asdf sdgf sdgfdfgd fgd fgd fg d', '21-05-2020'),
(0000000000000000000000052, 'rvcVE3kpmE', 'rHsxQxnx9O', 'dasd wed arf asdf sdgf sdgfdfgd fgd fgd fg d', '21-05-2020'),
(0000000000000000000000053, 'rvcVE3kpmE', 'SFmP2ISsgQ', 'dasd wed arf asdf sdgf sdgfdfgd fgd fgd fg d', '21-05-2020'),
(0000000000000000000000054, 'rvcVE3kpmE', 'nHKZVMcZkU', 'dasd wed arf asdf sdgf sdgfdfgd fgd fgd fg d', '21-05-2020'),
(0000000000000000000000055, 'rvcVE3kpmE', 'yAATxDxheN', 'dasd wed arf asdf sdgf sdgfdfgd fgd fgd fg d', '21-05-2020'),
(0000000000000000000000056, 'rvcVE3kpmE', 'DxYrEmqiRA', 'dasd wed arf asdf sdgf sdgfdfgd fgd fgd fg d', '21-05-2020'),
(0000000000000000000000057, 'rvcVE3kpmE', 'eOb8GH1JYZ', 'dasd wed arf asdf sdgf sdgfdfgd fgd fgd fg d', '21-05-2020'),
(0000000000000000000000058, 'rvcVE3kpmE', 'JEFpDtLvnC', 'dasd wed arf asdf sdgf sdgfdfgd fgd fgd fg d', '21-05-2020'),
(0000000000000000000000059, 'rvcVE3kpmE', '7EHzs0ESKi', 'dasd wed arf asdf sdgf sdgfdfgd fgd fgd fg d', '21-05-2020'),
(0000000000000000000000060, 'rvcVE3kpmE', 'vWnBAchzLo', 'dasd wed arf asdf sdgf sdgfdfgd fgd fgd fg d', '21-05-2020'),
(0000000000000000000000061, 'rvcVE3kpmE', 'Jfln4Kv1Ba', 'dasd wed arf asdf sdgf sdgfdfgd fgd fgd fg d', '21-05-2020'),
(0000000000000000000000062, 'rvcVE3kpmE', 'tT9Fp5ujIa', 'dasd wed arf asdf sdgf sdgfdfgd fgd fgd fg d', '21-05-2020'),
(0000000000000000000000063, 'rvcVE3kpmE', 'X7mk03NaaB', 'dasd wed arf asdf sdgf sdgfdfgd fgd fgd fg d', '21-05-2020'),
(0000000000000000000000064, 'rvcVE3kpmE', 'D3gdfG9a9B', 'dasd wed arf asdf sdgf sdgfdfgd fgd fgd fg d', '21-05-2020'),
(0000000000000000000000065, 'rvcVE3kpmE', 'XmnKp8qm7J', 'dasd wed arf asdf sdgf sdgfdfgd fgd fgd fg d', '21-05-2020'),
(0000000000000000000000066, 'rvcVE3kpmE', '8ww7wOxfDE', 'dasd wed arf asdf sdgf sdgfdfgd fgd fgd fg d', '21-05-2020'),
(0000000000000000000000067, 'rvcVE3kpmE', 'CkDlgDeUOa', 'dasd wed arf asdf sdgf sdgfdfgd fgd fgd fg d', '21-05-2020'),
(0000000000000000000000068, 'rvcVE3kpmE', 'Q54yNjVKn8', 'dasd wed arf asdf sdgf sdgfdfgd fgd fgd fg d', '21-05-2020'),
(0000000000000000000000069, 'rvcVE3kpmE', '3zhUj1yPUs', 'dasd wed arf asdf sdgf sdgfdfgd fgd fgd fg d', '21-05-2020'),
(0000000000000000000000070, 'rvcVE3kpmE', 'w5vHXuSCKy', 'dasd wed arf asdf sdgf sdgfdfgd fgd fgd fg d', '21-05-2020'),
(0000000000000000000000071, 'rvcVE3kpmE', 'gEHzfQbGwu', 'dasd wed arf asdf sdgf sdgfdfgd fgd fgd fg d', '21-05-2020'),
(0000000000000000000000072, 'rvcVE3kpmE', 'k2sFZVfTwt', 'dasd wed arf asdf sdgf sdgfdfgd fgd fgd fg d', '21-05-2020'),
(0000000000000000000000073, 'rvcVE3kpmE', 'ASc1HfPido', 'dasd wed arf asdf sdgf sdgfdfgd fgd fgd fg d', '21-05-2020'),
(0000000000000000000000074, 'rvcVE3kpmE', 'VxqltyRIiI', 'dasd wed arf asdf sdgf sdgfdfgd fgd fgd fg d', '21-05-2020'),
(0000000000000000000000075, 'rvcVE3kpmE', 'WieSC4nrLs', 'dasd wed arf asdf sdgf sdgfdfgd fgd fgd fg d', '21-05-2020'),
(0000000000000000000000076, 'rvcVE3kpmE', '8vK8i0ZoDF', 'dasd wed arf asdf sdgf sdgfdfgd fgd fgd fg d', '21-05-2020'),
(0000000000000000000000077, 'rvcVE3kpmE', 'JRJPWlN09R', 'dasd wed arf asdf sdgf sdgfdfgd fgd fgd fg d', '21-05-2020'),
(0000000000000000000000078, 'rvcVE3kpmE', '5WpjNtlDTJ', 'dasd wed arf asdf sdgf sdgfdfgd fgd fgd fg d', '21-05-2020'),
(0000000000000000000000079, 'rvcVE3kpmE', 'tvzK4J9KMY', 'dasd wed arf asdf sdgf sdgfdfgd fgd fgd fg d', '21-05-2020'),
(0000000000000000000000080, 'rvcVE3kpmE', 'KcuipLC7Sm', 'dasd wed arf asdf sdgf sdgfdfgd fgd fgd fg d', '21-05-2020'),
(0000000000000000000000081, 'rvcVE3kpmE', 'lTfL5y5IKU', 'dasd wed arf asdf sdgf sdgfdfgd fgd fgd fg d', '21-05-2020'),
(0000000000000000000000082, 'rvcVE3kpmE', 'fHB9ygPSAi', 'dasd wed arf asdf sdgf sdgfdfgd fgd fgd fg d', '21-05-2020'),
(0000000000000000000000083, 'rvcVE3kpmE', 'kL95SRtEez', 'dasd wed arf asdf sdgf sdgfdfgd fgd fgd fg d', '21-05-2020'),
(0000000000000000000000084, 'rvcVE3kpmE', 'Nt4ybhvCPC', 'dasd wed arf asdf sdgf sdgfdfgd fgd fgd fg d', '21-05-2020'),
(0000000000000000000000085, 'rvcVE3kpmE', 'FGX8EUfIaD', 'dasd wed arf asdf sdgf sdgfdfgd fgd fgd fg d', '21-05-2020'),
(0000000000000000000000086, 'rvcVE3kpmE', '9Rsy29sOqk', 'dasd wed arf asdf sdgf sdgfdfgd fgd fgd fg d', '21-05-2020'),
(0000000000000000000000087, 'rvcVE3kpmE', 'g8kZjDwan0', 'dasd wed arf asdf sdgf sdgfdfgd fgd fgd fg d', '21-05-2020'),
(0000000000000000000000088, 'rvcVE3kpmE', '7lMuBMCsEy', 'dasd wed arf asdf sdgf sdgfdfgd fgd fgd fg d', '21-05-2020'),
(0000000000000000000000089, 'rvcVE3kpmE', 'cG3s217ukh', 'dasd wed arf asdf sdgf sdgfdfgd fgd fgd fg d', '21-05-2020'),
(0000000000000000000000090, 'rvcVE3kpmE', 'gKp3LVPim3', 'dasd wed arf asdf sdgf sdgfdfgd fgd fgd fg d', '21-05-2020'),
(0000000000000000000000091, 'rvcVE3kpmE', '0CxxWrBJZ3', 'dasd wed arf asdf sdgf sdgfdfgd fgd fgd fg d', '21-05-2020'),
(0000000000000000000000092, 'rvcVE3kpmE', 'doEKB2nfuX', 'dasd wed arf asdf sdgf sdgfdfgd fgd fgd fg d', '21-05-2020'),
(0000000000000000000000093, 'rvcVE3kpmE', 'M83pjNlOZe', 'dasd wed arf asdf sdgf sdgfdfgd fgd fgd fg d', '21-05-2020'),
(0000000000000000000000094, 'rvcVE3kpmE', 'Llp37nGHWx', 'dasd wed arf asdf sdgf sdgfdfgd fgd fgd fg d', '21-05-2020'),
(0000000000000000000000095, 'rvcVE3kpmE', '17kV9uCVzc', 'dasd wed arf asdf sdgf sdgfdfgd fgd fgd fg d', '21-05-2020'),
(0000000000000000000000096, 'fJMXqZ2Mow', 'obyLK4EWPy', 'asdasd asd asd asd asd as dasd asd asd as d', '22-05-2020'),
(0000000000000000000000097, '4WZl3WAGIS', 'q1AofnAkmz', 'das dw qdasd asf gdfgre4 23 rsdf sdf sdf sdf sdf ', '22-05-2020'),
(0000000000000000000000098, '4WZl3WAGIS', 'rCXtxuXq3z', 'asd asd qwed asf dfgh fgh gk hjk sdfg asdf asd asd ', '22-05-2020'),
(0000000000000000000000099, '8IhrWclBws', 'RtOk3wHvTU', 'ee asdf sdf sdf sdf sdf sdf sdf sdf sdf sdf sdf sdf sdf sdf ', '22-05-2020'),
(0000000000000000000000100, '8IhrWclBws', 'D6aroYN7Uz', 'asd asd ewtet rw2e4 trwef sdf sdg sgdf sdgf sdg sdg sg sdg sg sgd sd gf', '22-05-2020'),
(0000000000000000000000101, 'pS2z00HIun', 'T5e4HssOpM', 'as dasd asd asd asd asd asd asd asd asd as dasd ', '22-05-2020'),
(0000000000000000000000102, '4WZl3WAGIS', 'RDIkWW1bLB', 'asd asd asd asd asd asd asd a sdasd asd asd asd asd asd ad ', '22-05-2020'),
(0000000000000000000000103, 'qJtGSi08Ja', 'tSyW5Ch13k', 'asd asd asd wqe123e eawsd asd asd asd asd ', '22-05-2020'),
(0000000000000000000000104, 'qJtGSi08Ja', 'x5DlR5Pcin', 'asd asd asd wqe123e eawsd asd asd asd asd ', '22-05-2020'),
(0000000000000000000000105, 'qJtGSi08Ja', 'mBM29LYDQl', 'asd asd asd wqe123e eawsd asd asd asd asd ', '22-05-2020'),
(0000000000000000000000106, 'qJtGSi08Ja', 'iJArk1DGa2', 'asd asd asd wqe123e eawsd asd asd asd asd ', '22-05-2020'),
(0000000000000000000000107, 'qJtGSi08Ja', 'zYgs620Ay8', 'asd asd asd wqe123e eawsd asd asd asd asd ', '22-05-2020'),
(0000000000000000000000108, 'qJtGSi08Ja', 'jNLSjoab8U', 'asd asd asd wqe123e eawsd asd asd asd asd ', '22-05-2020'),
(0000000000000000000000109, 'qJtGSi08Ja', 'DCnMgpMV1B', 'asd asd asd wqe123e eawsd asd asd asd asd ', '22-05-2020'),
(0000000000000000000000110, 'qJtGSi08Ja', 'WcGXoV9z4d', 'asd asd asd wqe123e eawsd asd asd asd asd ', '22-05-2020'),
(0000000000000000000000111, 'qJtGSi08Ja', 'rw1ODLBo8k', 'asd asd asd wqe123e eawsd asd asd asd asd ', '22-05-2020'),
(0000000000000000000000112, 'qJtGSi08Ja', 'burqztwEFQ', 'asd asd asd wqe123e eawsd asd asd asd asd ', '22-05-2020'),
(0000000000000000000000113, 'qJtGSi08Ja', 'UODm0woGck', 'asd asd asd wqe123e eawsd asd asd asd asd ', '22-05-2020'),
(0000000000000000000000114, 'qJtGSi08Ja', '6Q6PhOh6il', 'asd asd asd wqe123e eawsd asd asd asd asd ', '22-05-2020'),
(0000000000000000000000115, 'qJtGSi08Ja', 'ECAMqB9yoI', 'asd asd asd wqe123e eawsd asd asd asd asd ', '22-05-2020'),
(0000000000000000000000116, '4WZl3WAGIS', 'iahuetptZl', 'asd asd asd asd asd asd asd asd asd asd ', '22-05-2020'),
(0000000000000000000000117, '4WZl3WAGIS', 'NkJ2RBFqXc', 'asd asd asd asd asd asd asd asd asd asd ', '22-05-2020'),
(0000000000000000000000118, '4WZl3WAGIS', 'tFZh4fBiBh', 'asd asd asd asd asd asd asd asd asd asd ', '22-05-2020'),
(0000000000000000000000119, '4WZl3WAGIS', 'mgLcneM63n', 'asd asd asd asd asd asd asd asd asd asd ', '22-05-2020'),
(0000000000000000000000120, '4WZl3WAGIS', 'ExhmK4Lqsz', 'asd asd asd asd asd asd asd asd asd asd ', '22-05-2020'),
(0000000000000000000000121, '4WZl3WAGIS', 'LL7pIqi1cU', 'asd asd asd asd asd asd asd asd asd asd ', '22-05-2020'),
(0000000000000000000000122, '4WZl3WAGIS', 'oBfmGa3fVo', 'asd asd asd asd asd asd asd asd asd asd ', '22-05-2020'),
(0000000000000000000000123, '4WZl3WAGIS', 'yAATxDxheN', 'asd asd asd asd asd asd asd asd asd asd ', '22-05-2020'),
(0000000000000000000000124, '4WZl3WAGIS', 'doEKB2nfuX', 'asd asd asd asd asd asd asd asd asd asd ', '22-05-2020'),
(0000000000000000000000125, '4WZl3WAGIS', 'z1uqXpUrb9', 'asd asd asd asd asd asd asd asd asd asd ', '22-05-2020'),
(0000000000000000000000126, '4WZl3WAGIS', 'hriKYPBijc', 'asd asd asd asd asd asd asd asd asd asd ', '22-05-2020'),
(0000000000000000000000127, '4WZl3WAGIS', 'AevDYXXtmc', 'asd asd asd asd asd asd asd asd asd asd ', '22-05-2020'),
(0000000000000000000000128, '4WZl3WAGIS', 'vxicVjk8po', 'asd asd asd asd asd asd asd asd asd asd ', '22-05-2020'),
(0000000000000000000000129, '4WZl3WAGIS', 'pJ9hC1SHR7', 'das dasd asd asd asd asd asd asd asd asd ad ad as da sd', '22-05-2020'),
(0000000000000000000000130, '4WZl3WAGIS', 't7stB89d1j', 'das dasd asd asd asd asd asd asd asd asd ad ad as da sd', '22-05-2020'),
(0000000000000000000000131, '4WZl3WAGIS', 'U5CRt0nyq2', 'das dasd asd asd asd asd asd asd asd asd ad ad as da sd', '22-05-2020'),
(0000000000000000000000132, '4WZl3WAGIS', '7EHzs0ESKi', 'das dasd asd asd asd asd asd asd asd asd ad ad as da sd', '22-05-2020'),
(0000000000000000000000133, '4WZl3WAGIS', 'WQ6MXct3c8', 'das dasd asd asd asd asd asd asd asd asd ad ad as da sd', '22-05-2020'),
(0000000000000000000000134, '4WZl3WAGIS', 'obyLK4EWPy', 'asd asd asd asd asd asd ad ad asd asd a dad ', '22-05-2020'),
(0000000000000000000000135, '4WZl3WAGIS', 'zr7rK2u7Hw', 'asd asd asd asd asd asd ad ad asd asd a dad ', '22-05-2020'),
(0000000000000000000000136, '4WZl3WAGIS', '8UMRrNQwGr', 'asd asd asd asd asd asd ad ad asd asd a dad ', '22-05-2020'),
(0000000000000000000000137, '4WZl3WAGIS', '1W24NiDVVF', 'asd asd asd asd asd asd ad ad asd asd a dad ', '22-05-2020'),
(0000000000000000000000138, '4WZl3WAGIS', 'ARQZvfDYFg', 'asd asd asd asd asd asd ad ad asd asd a dad ', '22-05-2020'),
(0000000000000000000000139, 'qJtGSi08Ja', 'obyLK4EWPy', 'ad asd asd asd asd asd asd asd asd asd asd asd asd a d', '22-05-2020'),
(0000000000000000000000140, '4WZl3WAGIS', '20fzzdSB3m', 'asd asdfahkfh ieghf sgdfjh gsdjhfg sjdfg jshdgf jsdf s df', '22-05-2020'),
(0000000000000000000000141, '4WZl3WAGIS', 'VpaICjQspI', 'asd asdfahkfh ieghf sgdfjh gsdjhfg sjdfg jshdgf jsdf s df', '22-05-2020'),
(0000000000000000000000142, 'qJtGSi08Ja', 'ECAMqB9yoI', 'v dsf sf sdf sdf sdf sdf sdf sdf sdf sdf sdf sdf ', '25-05-2020'),
(0000000000000000000000143, 'qJtGSi08Ja', '1qv4sqwEU9', '', '25-05-2020'),
(0000000000000000000000144, 'rvcVE3kpmE', '1qv4sqwEU9', 'das dasd asd asd asd asd asd asd asd asd as dad ', '25-05-2020');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(10) UNSIGNED ZEROFILL NOT NULL,
  `name` varchar(30) COLLATE utf32_bin DEFAULT NULL,
  `username` varchar(50) COLLATE utf32_bin NOT NULL,
  `password` varchar(50) COLLATE utf32_bin NOT NULL,
  `chat_username` varchar(50) COLLATE utf32_bin NOT NULL,
  `chat_password` varchar(30) COLLATE utf32_bin NOT NULL,
  `max_msg_profile` int(11) NOT NULL,
  `allow_photos` tinyint(1) NOT NULL,
  `ext` tinyint(1) NOT NULL DEFAULT '0',
  `stars` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_bin;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `password`, `chat_username`, `chat_password`, `max_msg_profile`, `allow_photos`, `ext`, `stars`) VALUES
(0000000001, 'Dardan Isufi', 'username', 'password2', 'mt48@selfiestar.de', 'asd', 20000, 0, 1, 6);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `hellotexts`
--
ALTER TABLE `hellotexts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `settings2`
--
ALTER TABLE `settings2`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `texts`
--
ALTER TABLE `texts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `hellotexts`
--
ALTER TABLE `hellotexts`
  MODIFY `id` int(15) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `settings2`
--
ALTER TABLE `settings2`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `texts`
--
ALTER TABLE `texts`
  MODIFY `id` int(25) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=145;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
