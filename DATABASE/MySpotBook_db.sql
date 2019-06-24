-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Temps de generació: 24-06-2019 a les 14:52:55
-- Versió del servidor: 10.1.40-MariaDB-0ubuntu0.18.04.1
-- Versió de PHP: 7.2.19-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de dades: `MySpotBook_db`
--

-- --------------------------------------------------------

--
-- Estructura de la taula `classes`
--

CREATE TABLE `classes` (
  `id` varchar(32) NOT NULL,
  `courseId` varchar(32) NOT NULL,
  `tsIni` int(10) NOT NULL,
  `len` int(10) NOT NULL,
  `spots` int(10) NOT NULL,
  `ts` int(10) NOT NULL,
  `rollcall` bit(1) NOT NULL DEFAULT b'0',
  `confirmationSent` bit(1) NOT NULL DEFAULT b'0',
  `deleted` bit(1) NOT NULL DEFAULT b'0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Bolcament de dades per a la taula `classes`
--

INSERT INTO `classes` (`id`, `courseId`, `tsIni`, `len`, `spots`, `ts`, `rollcall`, `confirmationSent`, `deleted`) VALUES
('1', '24', 0, 3600, 10, 0, b'0', b'0', b'1'),
('10', '14', 2147483647, 2147483647, 0, 1553769309, b'0', b'0', b'0'),
('11', '2', 2147483647, 2147483647, 60, 1553770008, b'0', b'0', b'0'),
('12', '2', 2147483647, 2147483647, 8, 1553770356, b'0', b'0', b'0'),
('13', '2', 2147483647, 2147483647, 2, 1553889817, b'0', b'0', b'0'),
('14', '2', 2147483647, 2147483647, 2, 1553890205, b'0', b'0', b'0'),
('15', '1', 2147483647, 2147483647, 1, 1553890501, b'0', b'1', b'0'),
('16', '28', 2147483647, 2147483647, 300, 1554801927, b'0', b'0', b'0'),
('17', '29', 2147483647, 1000, 3, 1556282036, b'0', b'0', b'0'),
('18', '2', 2147483647, 2147483647, 9, 1556793704, b'0', b'0', b'0'),
('19', '1', 2147483647, 1, 1, 1556810745, b'0', b'1', b'0'),
('2', '2', 1563629972, 50, 515, 1553897529, b'0', b'0', b'1'),
('20', '49', 2147483647, 2147483647, 1, 1559311158, b'0', b'0', b'0'),
('21', '49', 2147483647, 2147483647, 100, 1559311184, b'0', b'0', b'0'),
('22', '49', 2147483647, 2147483647, 20, 1559311243, b'0', b'0', b'0'),
('23', '49', 2147483647, 2147483647, 200, 1559311278, b'0', b'0', b'0'),
('24', '49', 1559391297, 3600, 90, 1559311425, b'0', b'0', b'0'),
('25', '13', 1559315335, 3600, 1, 1559311748, b'0', b'0', b'0'),
('3', '2', 2147483647, 2147483647, 3, 1556810731, b'0', b'0', b'0'),
('4', '4', 2147483647, 2147483647, 300, 1553681435, b'0', b'0', b'0'),
('5', '2', 2147483647, 2147483647, 35, 1553770537, b'0', b'0', b'0'),
('5D02B71D5FF44D5D909A553A3167DD86', '5CF93C4EBA07A085E49734460CB60507', 1560462630, 3700, 10, 1560459085, b'0', b'0', b'0'),
('5D02C9AA9F0AD1D2F5AA0AD6BECFA1EA', '1', 2147483647, 2147483647, 2000, 1560463786, b'0', b'1', b'0'),
('5D02C9E293A2429DAC01C951A2E8E1C6', '1', 1560463900, 1560463910, 500, 1560463842, b'0', b'0', b'0'),
('5D02CACEA769D895416FA40B3564D9D7', '1', 1560466053, 1560466054, 2563, 1560464078, b'0', b'0', b'0'),
('5D02CAFF897CB6E97DC2675891703870', '1', 2147483647, 2147483647, 12345, 1560464127, b'0', b'1', b'0'),
('5D02CB41DF21E3A10330A2E81D4374DB', '1', 2147483647, 2147483647, 600, 1560464193, b'0', b'1', b'0'),
('5D02CC5D5A6FE85656AE22C697E0DEDB', '1', 1560469000, 3600, 80, 1560464477, b'0', b'0', b'0'),
('5D02CC8D9AC7B6CC581CFC44AFD2651F', '10', 1560469111, 3600, 3456, 1560464525, b'0', b'0', b'0'),
('5D02CCADA6F7DA670EB5C7D7F4EE390A', '10', 2147483647, 3600, 890, 1560464557, b'0', b'0', b'0'),
('5D02CCC6F4C47E4170F6096547EBB70C', '10', 2147483647, 3600, 99, 1560464582, b'0', b'0', b'0'),
('5D02CCD81342D64E1E16AA25E855F0FB', '10', 2147483647, 3600, 789, 1560464600, b'0', b'0', b'0'),
('5D02CD05D0324BCE50680705552069D5', '11', 2147483647, 3600, 567, 1560464645, b'0', b'0', b'0'),
('5D02CD3D64A0F6749262FAEE14F5E537', '11', 1560468276, 3600, 234, 1560464701, b'0', b'0', b'0'),
('5D02CE351B514F11E44270C6116B19EE', '11', 1560464991, 3600, 9, 1560464949, b'0', b'0', b'0'),
('5D02D1DACC3467F4FE7BF4A4CC0B4519', '11', 1560469478, 3600, 56, 1560465882, b'0', b'0', b'0'),
('5D036AB881A49514DFD34FD17302F34C', '1', 1560508610, 3600, 123456, 1560505016, b'0', b'0', b'0'),
('5D036E6F190BA79C953520F842A70471', '1', 1560509558, 3600, 1020, 1560505967, b'0', b'0', b'0'),
('5D036F69B6A58C90568E0DD62D865C1B', '10', 1560509805, 3600, 1989, 1560506217, b'0', b'1', b'0'),
('5D053D4FD08697D440B2934C0F04D303', '1', 1560628052, 3600, 54321, 1560624463, b'0', b'1', b'0'),
('5D053F31604AABA14FF0C4BC09C2A419', '1', 1560628541, 3600, 123, 1560624945, b'0', b'0', b'0'),
('5D0542A1041D53D8645D96F3CC572033', '1', 1560629421, 3600, 123, 1560625825, b'0', b'0', b'0'),
('5D0542EECF8AC56F266AE649951F01AD', '1', 1560629496, 3600, 2121, 1560625902, b'0', b'1', b'0'),
('5D0546F71BFE5942C983310034A6C228', '10', 1560630528, 3600, 567, 1560626935, b'0', b'1', b'0'),
('5D07F6010DFCBC765BC96B02E000029E', '36', 1560806408, 3600, 5, 1560802834, b'0', b'0', b'0'),
('5D07F623BE75DD406A18CB4C1976648B', '35', 1560806442, 3600, 10, 1560802851, b'0', b'0', b'0'),
('5D08923EF7DB30633640089ADFB0C6AC', '10', 1560846409, 3600, 22, 1560842814, b'0', b'1', b'0'),
('5D0B43C53DFADF98B11FC15B0D452556', '1', 1561022928, 3600, 354, 1561019333, b'0', b'0', b'0'),
('5D0B443986B3694CFA3F50E113920622', '1', 1561023044, 3600, 333, 1561019449, b'0', b'1', b'0'),
('5D0B463E09E5177E73C6CBBBE5B98C4A', '10', 1561023563, 3600, 22, 1561019966, b'0', b'0', b'0'),
('5D0B46B23ADE47F2232949211E00E238', '10', 1561023678, 3600, 1212, 1561020082, b'0', b'0', b'0'),
('5D0B4755856EA351BD04A5C8C03E0B1D', '10', 1561023842, 3600, 11, 1561020245, b'0', b'0', b'0'),
('5D0B4825F83BFBD31B9ABB0C1FE4D679', '1', 1561024050, 3600, 10, 1561020453, b'0', b'0', b'0'),
('5D0B48F7CCAECB9782DF77F215112C93', '1', 1561024260, 3600, 13, 1561020663, b'0', b'0', b'0'),
('5D0BA4DF7BCC518BF7C678B1622C5428', '1', 1561047787, 3600, 22, 1561044191, b'0', b'1', b'0'),
('5D0CA4EA151D7F46295F119F3C80E88B', '1', 1561113335, 3600, 333, 1561109738, b'0', b'1', b'0'),
('5D0CA70FF322271EED2509BEFAF65823', '1', 1561113883, 3600, 12345, 1561110287, b'0', b'1', b'0'),
('5D0CAD8ACE65BCAEF87CD48F0EAC8EF6', '1', 1561115544, 3600, 11, 1561111946, b'0', b'1', b'0'),
('5D0CAE3BECB7696B7F13EBA4E2F690AA', '1', 1561115720, 3600, 25, 1561112123, b'0', b'1', b'0'),
('5D0CAE8737040B3E592E3367D72FF054', '1', 1561115795, 3600, 12, 1561112199, b'0', b'1', b'0'),
('5D0CF38ECE28BAC8EB364673C7AA61FF', '5D08C2499B426B30E293B8EF5654A979', 1561133456, 3600, 5, 1561129870, b'0', b'1', b'0'),
('6', '13', 2147483647, 2147483647, 100, 1553695437, b'0', b'0', b'0'),
('7', '6', 2147483647, 2147483647, 5, 1553890479, b'0', b'0', b'0'),
('8', '4', 2147483647, 2147483647, 100, 1553697184, b'0', b'0', b'0'),
('9', '1', 1560463680, 1560463682, 2000000, 1560463674, b'0', b'1', b'0');

-- --------------------------------------------------------

--
-- Estructura de suport per a vistes `classesView`
-- (mireu a sota per a la visualització real)
--
CREATE TABLE `classesView` (
`id` varchar(32)
,`courseId` varchar(32)
,`companyId` varchar(32)
,`name` varchar(255)
,`description` text
,`reqInfo` set('email','fname','phone','age','gender')
,`type` smallint(4) unsigned
,`picture` varchar(36)
,`contact` varchar(256)
,`price` varchar(64)
,`location` varchar(128)
,`tsIni` int(10)
,`len` int(10)
,`spots` int(10)
,`rollcall` bit(1)
,`confirmationSent` bit(1)
,`numReserves` bigint(21)
);

-- --------------------------------------------------------

--
-- Estructura de la taula `companies`
--

CREATE TABLE `companies` (
  `id` varchar(32) NOT NULL,
  `email` varchar(60) NOT NULL,
  `password` varchar(60) NOT NULL,
  `name` varchar(255) NOT NULL,
  `challenge` varchar(60) DEFAULT NULL,
  `challengeExpiration` int(10) DEFAULT NULL,
  `active` bit(1) NOT NULL DEFAULT b'0',
  `ts` int(10) DEFAULT NULL,
  `deleted` bit(1) NOT NULL DEFAULT b'0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Bolcament de dades per a la taula `companies`
--

INSERT INTO `companies` (`id`, `email`, `password`, `name`, `challenge`, `challengeExpiration`, `active`, `ts`, `deleted`) VALUES
('1', 'ling@gmail.com', '$2y$10$3UKPBowdFzvdjMPzkusD5eg8efHkyJwzaIJFQq5IwzvczXR0xppiG', 'chialing', NULL, NULL, b'1', NULL, b'0'),
('10', 'test@test.test', '$2y$10$uiPBXw0RMpz1tstiPq5SOOd1fOXzc42eEq6uc5SvtfD01rQYEMCuK', 'TEST COMPANY', NULL, NULL, b'1', 1556281876, b'0'),
('11', 'c0973205546@gmail.com', '$2y$10$04Yo655xb7ybEtDXNEmjyeZH6f0U6DYzdiVxkCryqUdct2S5HNFyK', 'TEST', '$2y$10$iQlmZTvyweEIYWj9oRkT0uwHYHSzrkur83RS7BT5yzc0JAN.aiM2W', NULL, b'0', 1557175258, b'0'),
('2', 'ignasi@ausva04.com', '$2y$10$Uv6KcQX1SVQ4Oa2XnvY1.O3QxY3AQyxuvqqmPkYa9WfzDTbgV6gTq', 'AUSVA 04', NULL, NULL, b'1', 1552232561, b'0'),
('3', 'hochialing91@gmail.com', '$2y$10$o2FrR.WhGk/pMIX7kA/6cOwSU4Whj2qNEsEabX2C7ZbSqTGI2Sdr6', 'Chia Ling', NULL, NULL, b'1', 1552233198, b'0'),
('4', 'hochialing@gmail.com', '$2y$10$Lhdjrbu2.bIekFiaUIj1au12Ke2pRemirKUaZ7RieNjfOyD2akzGa', 'Chia Ling', NULL, NULL, b'1', 1552297196, b'0'),
('5', 'lill12345696@gmail.com', '$2y$10$lw5eiJT6RlovFHbsUPOt9.zWhv3zk/u6U3V5JvUauB.VEZyJhc.i2', 'Chia Ling 2', NULL, NULL, b'1', 1552669439, b'0'),
('5CF9376FBE098331EE91DC202F09BCA4', 'ignasimg@gmail.com', '$2y$10$uiPBXw0RMpz1tstiPq5SOOd1fOXzc42eEq6uc5SvtfD01rQYEMCuK', 'MY SUPER COMPANY', NULL, NULL, b'1', 1559836527, b'0'),
('5D0E5B46E9CF46F29B0F9D3EEEDC0F90', 'supercompany@ausva04.com', '$2y$10$WT/28WjazAAN6O0zK/IwHuO95rrNHEA0ZfJR.9Zo5/foPgu0QzFcm', 'My super company : )', NULL, NULL, b'1', 1561221958, b'0'),
('6', 'chialing@ausva04.com', '$2y$10$bdONmBcxD2BPmeP9JcK7qua.A1sYutMI.B9jFP727LBRAmvTF9Bj2', 'Chia Ling', NULL, NULL, b'1', 1552672010, b'0'),
('7', 'cuentas@sawcer.com', '$2y$10$OGoPeG2IlX.c6W09.EDTnunGzShIFPXps7tS8NCxW/wNduwU.0/Km', 'x', NULL, NULL, b'1', 1552672267, b'0'),
('8', 'test@test.test', '', 'TEST changed', NULL, NULL, b'1', 0, b'1'),
('9', 'uijio@hbcdh.com', '$2y$10$lH5pFVpfiIiPNCon9atc3.niuJWONf4Na2JTO3IwDCPsjEJyra9XO', 'A', NULL, NULL, b'1', 1554801809, b'0');

-- --------------------------------------------------------

--
-- Estructura de la taula `courses`
--

CREATE TABLE `courses` (
  `id` varchar(32) NOT NULL,
  `companyId` varchar(32) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `type` smallint(4) UNSIGNED NOT NULL,
  `reqInfo` set('email','fname','phone','age','gender') NOT NULL,
  `picture` varchar(36) NOT NULL,
  `contact` varchar(256) NOT NULL,
  `location` varchar(128) NOT NULL,
  `price` varchar(64) NOT NULL,
  `ts` int(10) NOT NULL,
  `deleted` bit(1) NOT NULL DEFAULT b'0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Bolcament de dades per a la taula `courses`
--

INSERT INTO `courses` (`id`, `companyId`, `name`, `description`, `type`, `reqInfo`, `picture`, `contact`, `location`, `price`, `ts`, `deleted`) VALUES
('1', '5', 'haha :)', 'hola', 0, 'email,phone', 'fd7f9cb99a1c83801650ead54dcf.jpg', 'meme@gmail.com', 'sff', '', 1552853659, b'0'),
('10', '5', 'kk', 'kkg', 0, 'email,fname,phone,age,gender', '', '', '', '', 1553076373, b'0'),
('11', '5', 'lovely', 'love ', 0, 'email,fname,phone,age,gender', '', '', '', '', 1553091134, b'0'),
('12', '5', 'toeic3', 'toeic', 0, 'email,phone,age,gender', '', '', '', '', 1553091566, b'0'),
('13', '5', 'climb', 'hard climb ', 0, 'email,phone,age', '', '', '', '', 1553167782, b'0'),
('14', '5', 'A', 'b', 0, 'email,gender', '', '', '', '', 1553167862, b'0'),
('15', '5', 'abcdefg', 'dddfdfd', 0, 'email,gender', '', '', '', '', 1553173526, b'0'),
('16', '5', 'moutains', 'rockclimbing', 0, 'email,phone,gender', '', '', '', '', 1553188437, b'0'),
('17', '5', 'ocean', 'diving ', 0, 'email,phone,gender', '', '', '', '', 1553188554, b'0'),
('18', '5', 'egg', '<p>f<span style=\"color: #e74c3c;\">re</span>e</p>', 0, 'email,gender', '', '', '', '', 1553199068, b'0'),
('19', '5', 'sing', 'cute song meow meow', 0, 'email,fname,phone,gender', '', '', '', '', 1553199378, b'0'),
('2', '5', 'mk123', 'f', 0, 'email,phone,gender', '', '', '', '', 1552853721, b'0'),
('20', '5', 'hola', 'fig', 0, 'email,gender', '', '', '', '', 1553200803, b'0'),
('21', '5', 'kkk', 'try hard ', 0, 'email,phone,gender', '', '', '', '', 1553201009, b'0'),
('22', '5', 'cant be empty', 'aiya ', 0, 'email,phone,gender', '', '', '', '', 1553201196, b'0'),
('23', '5', 'fasdsf', 'wsfff', 0, 'email,phone,gender', '', '', '', '', 1553204246, b'0'),
('24', '8', 'testCourse', 'TestDescription', 0, 'email', '', '', '', '', 0, b'1'),
('25', '5', 'make', 'make food ', 0, 'email,gender', '', '', '', '', 1554135701, b'0'),
('26', '5', 'make pizza', 'pizza hot ', 0, 'email,gender', '', '', '', '', 1554136042, b'0'),
('27', '5', 'wdwdw', 'wdw', 0, 'email,gender', '', '', '', '', 1554136349, b'0'),
('28', '9', 'oh my', 'test', 0, 'email,gender', '', '', '', '', 1554801830, b'0'),
('29', '10', 'TEST COURSE', ': )', 0, 'email,fname,gender', '', '', '', '', 1556281991, b'0'),
('3', '5', 'hate', 'hg', 0, 'email,gender', '', '', '', '', 1552853769, b'0'),
('30', '5', 'testing', '<h1><span style=\"color: #e74c3c;\"><strong>super course!</strong></span></h1>', 0, 'email,phone', '', '', '', '', 1556794726, b'0'),
('31', '5', 'test type', '<p><em>hey</em></p>', 0, 'email,phone', '', '', '', '', 1556885379, b'0'),
('32', '5', 'test again', '<p>hey&nbsp;<span style=\"text-decoration: underline;\">hey&nbsp;</span></p>', 0, 'email,phone', '', '', '', '', 1556885448, b'0'),
('33', '5', 'j', '<p>j</p>', 0, 'email,phone,gender', '', '', '', '', 1556887236, b'0'),
('34', '5', 'test', '<p>hey</p>', 0, 'email,gender', '', '', '', '', 1556893789, b'0'),
('35', '5', 'sw', '<p>sw</p>', 0, 'email', '', '', '', '', 1556894777, b'0'),
('36', '5', 'x', '<p>x</p>', 0, 'email,phone', '', '', '', '', 1556895613, b'0'),
('37', '5', 'xxxxx', '<p>x</p>', 0, 'email,phone', '', '', '', '', 1556895640, b'0'),
('38', '5', 'xxxxxcscs', '<p>x</p>', 0, 'email,phone', '', '', '', '', 1556895648, b'0'),
('39', '5', 'try', '<p>try&nbsp;</p>', 0, 'email,gender', '', '', '', '', 1556895711, b'0'),
('4', '5', 'try course', 'sweet', 0, 'email,fname,phone,gender', '', '', '', '', 1552853805, b'0'),
('40', '5', 'hiking test', '<p>test</p>', 0, 'email,phone', '', '', '', '', 1556896007, b'0'),
('41', '5', 'jkjhkj', '<p>gukh</p>', 0, 'email,phone', '', '', '', '', 1556896211, b'0'),
('42', '5', 'climbing test', '<p>yes</p>', 0, 'email,phone', '', '', '', '', 1556896678, b'0'),
('43', '5', 'dancing test', '<p>test</p>', 2, 'email,gender', '', '', '', '', 1556900693, b'0'),
('44', '5', 'test c', '<p>c</p>', 4, 'email,gender', '', '', '', '', 1556900846, b'0'),
('45', '5', 'SPORTS TEST', '<p>T</p>', 6, 'email,gender', '', '', '', '', 1556903444, b'0'),
('46', '5', 's', '<p><strong>s</strong></p>', 3, 'email', '', '', '', '', 1556903771, b'0'),
('47', '5', 'dancing try yes', '<p><em>try oh</em></p>', 2, 'email', '', '', '', '', 1556903868, b'0'),
('48', '5', 'Rescuing Primates! Hike and visiting Foundation', '<section class=\"section\">\n<div class=\"chunk event-description--wrapper\">\n<h2 class=\"text--sectionTitle text--bold padding--bottom\">Details</h2>\n<div class=\"event-description runningText\">\n<p>Rescuing Primates!<br /><br />En castellano con este link<br /><br /><a class=\"link\" title=\"https://www.meetup.com/mamuthiking/pages/28951028/Fundaci%C3%B3n_Mona/?success=pages_add\" href=\"https://www.meetup.com/mamuthiking/pages/28951028/Fundaci%C3%B3n_Mona/?success=pages_add\" target=\"__blank\">https://www.meetup.com/mamuthiking/pages/28951028/Fundaci%C3%B3n_Mona/?success=pages_add</a><br /><br />In order to participate please fell the form:&nbsp;<a class=\"link\" title=\"https://forms.gle/jFcofCfZ4JUTA7F18\" href=\"https://forms.gle/jFcofCfZ4JUTA7F18\" target=\"__blank\">https://forms.gle/jFcofCfZ4JUTA7F18</a><br /><br />This time it will be an unusual excursion. We will visit Mona Foundation near Girona region.<br /><br />In rehabilitation center, abused chimpanzees and macaques are recovering from their previous lives as circus artists, television actors, and even pets. Many of them spent years living in solitude under terrifyingly inhumane conditions. MONA gives these primates a second chance at a life free of pain and abuse. They provide their primates a curative, nurturing, and restorative environment in a group of their own kind within a spacious and natural installation. The center gives them the type of life they should have had in the wild, giving them back their dignity they so much deserve.<br /><br />First we will make a nice hike from Sant Feliu de Gu&iacute;xols a Platja de Aro.<br />This is a hike along clifftop trails with beautiful views of contrasting orange cliffs, green trees, and turquoise waters. We started the day a little intimidated with the length of the hike. From early on we could see Palam&oacute;s in the far, far distance &ndash; and it was hard to feel like we were making progress at times.<br /><br />This day hike really gives you a feel for Costa Brava&rsquo;s finger-like peninsulas and coves. For this hike you can&rsquo;t get caught up on efficiency &ndash; you just have to enjoy the moment and the views. And luckily the variety of views in this section are spectacular!<br /><br />We can swim that day, enjoy a beautiful day and may be play volley at the beach, and after that we will get into bus and will go to Mona center.<br /><br />!!if you do not want to visit Foundation,you can just come with us for walk,it will be descounted from the price!!<br /><br />HIKING DETAILS<br /><br />???? We meet at a place we arrange in whats up group, at 08:15 (center)<br />????The bus takes us at 08:30 It can wait maximum of 5 minutes, so please do not be late. It will take us about 1,5 to get to the place:)<br />???? Back to Barcelona : 21.00h.aproximatly<br />???? Total Distance of hiking : 8 / Elevation gain: 350 m.<br />???? Hike Difficulty level: ????/5 easy +<br />???? Estimated Completion Time: 4 hours in total walking + 1,5 IN the center<br />???? Price : 35 Euros for person(transportation included going and coming back in private bus with the driver)+ entrance for foundation<br /><br />???? Take with you: hiking shoes,<br />Aquatic shoes if you have those<br />water, food for picnic (sandwiches, fruits and others)<br /><br />????Organizer: Yulia<br />to participate its necessary to do the payment of 50%in advance</p>\n</div>\n</div>\n</section>\n<section class=\"section\">\n<div class=\"attendees-sample\">\n<div class=\"flex flex--row\">\n<div class=\"flex-item\">&nbsp;</div>\n</div>\n</div>\n</section>', 1, 'email,gender', '', '', '', '', 1559077961, b'0'),
('49', '5', 'Hey', '', 1, 'email,gender', '', '', '', '', 1559311068, b'0'),
('5', '5', 'xx', 'yy', 0, 'email,fname,phone,age,gender', '', '', '', '', 1552853839, b'0'),
('5CF93C4EBA07A085E49734460CB60507', '5CF9376FBE098331EE91DC202F09BCA4', 'Curs de prova', '<p>&lt;3</p>', 1, 'email,fname', '', '', '', '', 1559837774, b'0'),
('5D02B51796BA8C75025DCE9264BE9FD0', '5CF9376FBE098331EE91DC202F09BCA4', 'Dance', '', 2, 'email', '', '', '', '', 1560458519, b'0'),
('5D08C2499B426B30E293B8EF5654A979', '5', 'Yoga super event ^^', '<p>super duper bra bra bra</p>', 5, 'email,fname,phone,age,gender', '', '', '', '', 1560855113, b'0'),
('5D0CFDF81BB9953CB40EAD9B30450C06', '5', 'Dance to the moon', '<p>You will be surprised&nbsp;</p>', 2, 'email,gender', '', '', '', '', 1561132536, b'0'),
('5D10A1F6200F68751AD8BBBA2984BE62', '5', 'upload', '<p>:)</p>', 1, 'email', '', 'k:)', ';)', '10', 1561371126, b'0'),
('6', '5', 'Chia Ling', 'sdsd', 0, 'email,phone', '', '', '', '', 1552853976, b'0'),
('7', '5', 'new class', 'swimming in the sea and river', 0, 'email,fname', '', '', '', '', 1552996012, b'0'),
('8', '5', '', '', 0, 'email', '', '', '', '', 1553000360, b'0'),
('9', '5', '', '', 0, 'email,phone,age', '', '', '', '', 1553010001, b'0');

-- --------------------------------------------------------

--
-- Estructura de la taula `courseTypes`
--

CREATE TABLE `courseTypes` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `name` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Bolcament de dades per a la taula `courseTypes`
--

INSERT INTO `courseTypes` (`id`, `name`) VALUES
(1, 'Hiking'),
(2, 'Dancing'),
(3, 'Swimming'),
(4, 'Climbing'),
(5, 'Yoga'),
(6, 'Sports'),
(7, 'Competition');

-- --------------------------------------------------------

--
-- Estructura de la taula `engagements`
--

CREATE TABLE `engagements` (
  `id` varchar(32) NOT NULL,
  `companyId` varchar(32) NOT NULL,
  `recipientId` varchar(32) NOT NULL,
  `type` set('COMPANY','COURSE','CLASS') NOT NULL,
  `body` text NOT NULL,
  `future` bit(1) NOT NULL DEFAULT b'0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Bolcament de dades per a la taula `engagements`
--

INSERT INTO `engagements` (`id`, `companyId`, `recipientId`, `type`, `body`, `future`) VALUES
('5D02B932D85B2B06D5A048295B5A6925', '5CF9376FBE098331EE91DC202F09BCA4', '5D02B71D5FF44D5D909A553A3167DD86', 'CLASS', '{\"subject\":\"Test!\",\"msgbody\":\"<p>This is a future message!<\\/p>\"}', b'1'),
('5D02C6F12705784AF66E9927178A771D', '5', '9', 'CLASS', '{\"subject\":\"Confirm the class\",\"msgbody\":\"<h1>CONFIRM<\\/h1><p>Your id is: [%__SPOTID__%] and your email is: [%EMAIL%]<\\/p>\"}', b'1'),
('5D036F9B38374DAFD1B1F8956AF082BD', '5', '5D036F69B6A58C90568E0DD62D865C1B', 'CLASS', '{\"subject\":\"Confirm the class\",\"msgbody\":\"<h1>CONFIRM<\\/h1><p>Your id is: [%__SPOTID__%] and your email is: [%EMAIL%]<\\/p>\"}', b'1'),
('5D053B6B87946DB349CE61AC2AE63F10', '5', '19', 'CLASS', '{\"subject\":\"Confirm the class\",\"msgbody\":\"<h1>CONFIRM<\\/h1><p>Your id is: [%__SPOTID__%] and your email is: [%EMAIL%]<\\/p>\"}', b'1'),
('5D053B715CB9659364666909BE30704B', '5', '5D02CAFF897CB6E97DC2675891703870', 'CLASS', '{\"subject\":\"Confirm the class\",\"msgbody\":\"<h1>CONFIRM<\\/h1><p>Your id is: [%__SPOTID__%] and your email is: [%EMAIL%]<\\/p>\"}', b'1'),
('5D053B721C3446E3A5B8B3299CD58398', '5', '5D02CB41DF21E3A10330A2E81D4374DB', 'CLASS', '{\"subject\":\"Confirm the class\",\"msgbody\":\"<h1>CONFIRM<\\/h1><p>Your id is: [%__SPOTID__%] and your email is: [%EMAIL%]<\\/p>\"}', b'1'),
('5D053DB7178C371CB329A1CA610A6BD5', '5', '5D053D4FD08697D440B2934C0F04D303', 'CLASS', '{\"subject\":\"Confirm the class\",\"msgbody\":\"<h1>CONFIRM<\\/h1><p>Your id is: [%__SPOTID__%] and your email is: [%EMAIL%]<\\/p>\"}', b'1'),
('5D054316243E8F6C73BCEA5786A1E3F6', '5', '5D0542EECF8AC56F266AE649951F01AD', 'CLASS', '{\"subject\":\"Confirm the class\",\"msgbody\":\"<h1>CONFIRM<\\/h1><p>Your id is: [%__SPOTID__%] and your email is: [%EMAIL%]<\\/p>\"}', b'1'),
('5D05472CD9CC4A756B6AA7C42F467F59', '5', '5D0546F71BFE5942C983310034A6C228', 'CLASS', '{\"subject\":\"Confirm the class\",\"msgbody\":\"<h1>CONFIRM<\\/h1><p>Your id is: [%__SPOTID__%] and your email is: [%EMAIL%]<\\/p>\"}', b'1'),
('5D07E706877555519548B4C14E1FCEB4', '5', '15', 'CLASS', '{\"subject\":\"Confirm the class\",\"msgbody\":\"<h1>CONFIRM<\\/h1><p>Your id is: [%__SPOTID__%] and your email is: [%EMAIL%]<\\/p>\"}', b'1'),
('5D0892DD388685B5B711C4FD1A02155C', '5', '5D08923EF7DB30633640089ADFB0C6AC', 'CLASS', '{\"subject\":\"Confirm the class\",\"msgbody\":\"<h1>CONFIRM<\\/h1><p>Your id is: [%__SPOTID__%] and your email is: [%EMAIL%]<\\/p>\"}', b'1'),
('5D0B44668A9454E07E34FE21DD23E817', '5', '5D0B443986B3694CFA3F50E113920622', 'CLASS', '{\"subject\":\"Confirm the class\",\"msgbody\":\"<h1>CONFIRM<\\/h1><p>Your id is: [%__SPOTID__%] and your email is: [%EMAIL%]<\\/p>\"}', b'1'),
('5D0BA506B2474A5E00FE60CE972ED976', '5', '5D0BA4DF7BCC518BF7C678B1622C5428', 'CLASS', '{\"subject\":\"Confirm the class\",\"msgbody\":\"<h1>CONFIRM<\\/h1><p>Your id is: [%__SPOTID__%] and your email is: [%EMAIL%]<\\/p>\"}', b'1'),
('5D0BA929EC712431E6262C17347F3F6F', '5', '5D02C9AA9F0AD1D2F5AA0AD6BECFA1EA', 'CLASS', '{\"subject\":\"Confirm the class\",\"msgbody\":\"<h1>CONFIRM<\\/h1><p>Your id is: [%__SPOTID__%] and your email is: [%EMAIL%]<\\/p>\"}', b'1'),
('5D0CA548EC94FC0B207F51F7AC8BE24B', '5', '5D0CA4EA151D7F46295F119F3C80E88B', 'CLASS', '{\"subject\":\"Confirm the class\",\"msgbody\":\"<h1>CONFIRM<\\/h1><p>Your id is: [%__SPOTID__%] and your email is: [%EMAIL%]<\\/p>\"}', b'1'),
('5D0CA877E028E1B95DF839B0DD2021C4', '5', '5D0CA70FF322271EED2509BEFAF65823', 'CLASS', '{\"subject\":\"Confirm the class\",\"msgbody\":\"<h1>CONFIRM<\\/h1><p>Your id is: [%__SPOTID__%] and your email is: [%EMAIL%]<\\/p>\"}', b'1'),
('5D0CADBB695201BE660DB1E657C7E1AE', '5', '5D0CAD8ACE65BCAEF87CD48F0EAC8EF6', 'CLASS', '{\"subject\":\"Confirm the class\",\"msgbody\":\"<h1>CONFIRM<\\/h1><p>Your id is: [%__SPOTID__%] and your email is: [%EMAIL%]<\\/p>\"}', b'1'),
('5D0CAE5706B1B7359EEB6E7458403AAB', '5', '5D0CAE3BECB7696B7F13EBA4E2F690AA', 'CLASS', '{\"subject\":\"Confirm the class\",\"msgbody\":\"<h1>CONFIRM<\\/h1><p>Your id is: [%__SPOTID__%] and your email is: [%EMAIL%]<\\/p>\"}', b'1'),
('5D0CAF175B9318008E23C17ED22604F6', '5', '5D0CAE8737040B3E592E3367D72FF054', 'CLASS', '{\"subject\":\"Confirm the class\",\"msgbody\":\"<h1>CONFIRM<\\/h1><p>Your id is: [%__SPOTID__%] and your email is: [%EMAIL%]<\\/p>\"}', b'1'),
('5D0CF3A3D12010DF3E4626263786E51A', '5', '5D0CF38ECE28BAC8EB364673C7AA61FF', 'CLASS', '{\"subject\":\"Confirm the class\",\"msgbody\":\"<h1>CONFIRM<\\/h1><p>Your id is: [%__SPOTID__%] and your email is: [%EMAIL%]<\\/p>\"}', b'1');

-- --------------------------------------------------------

--
-- Estructura de la taula `noSpam`
--

CREATE TABLE `noSpam` (
  `email` varchar(60) NOT NULL,
  `companyId` int(10) NOT NULL,
  `ts` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de la taula `reserves`
--

CREATE TABLE `reserves` (
  `id` varchar(32) NOT NULL,
  `classId` varchar(32) NOT NULL,
  `fname` varchar(255) DEFAULT NULL,
  `email` varchar(60) DEFAULT NULL,
  `phone` varchar(60) DEFAULT NULL,
  `age` int(3) DEFAULT NULL,
  `gender` enum('m','f') DEFAULT NULL,
  `status` set('show','noshow','pending','usercancelled','organizercancelled') NOT NULL DEFAULT 'pending',
  `confirmation` set('pending','confirmed','unconfirmed') NOT NULL DEFAULT 'pending',
  `REMOTE_ADDR` varchar(45) DEFAULT NULL,
  `HTTP_USER_AGENT` varchar(512) DEFAULT NULL,
  `HTTP_ACCEPT_LANGUAGE` varchar(256) DEFAULT NULL,
  `ts` int(10) NOT NULL,
  `deleted` bit(1) NOT NULL DEFAULT b'0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Bolcament de dades per a la taula `reserves`
--

INSERT INTO `reserves` (`id`, `classId`, `fname`, `email`, `phone`, `age`, `gender`, `status`, `confirmation`, `REMOTE_ADDR`, `HTTP_USER_AGENT`, `HTTP_ACCEPT_LANGUAGE`, `ts`, `deleted`) VALUES
('1', '1', NULL, 'test@best.com', NULL, NULL, NULL, 'pending', 'pending', '80.36.170.45', 'chrome', 'ca-ES', 0, b'1'),
('10', '4', 'Ignasi', 'ignasimg@gmail.com', '+34649320302', 0, 'm', 'pending', 'pending', '80.24.8.184', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36', 'ca-ES,ca;q=0.9,en;q=0.8', 1555010122, b'0'),
('11', '19', '', 'ignasimg@gmail.com', '+34649320302', 0, NULL, 'pending', 'pending', '80.24.8.184', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36', 'ca-ES,ca;q=0.9,en;q=0.8', 1557320243, b'0'),
('12', '8', 'haha', 'hochialing91@gmail.com', '+34632438612', 0, 'f', 'pending', 'pending', '80.24.8.184', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36', 'en-US,en;q=0.9', 1557493415, b'0'),
('13', '18', '', 'hochialing91@gmail.com', '+34632438612', 0, 'f', 'pending', 'pending', '80.24.8.184', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36', 'en-US,en;q=0.9', 1557678015, b'0'),
('14', '7', '', 'ignasi@ausva04.com', '+34649320302', 0, NULL, 'organizercancelled', 'pending', '80.24.8.184', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36', 'ca-ES,ca;q=0.9,en;q=0.8', 1559248614, b'1'),
('15', '25', '', 'hochialing91@gmail.com', '+34632438612', 28, NULL, 'pending', 'pending', '80.24.8.184', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36', 'en-US,en;q=0.9', 1559311889, b'0'),
('16', '3', '', 'yahouba@weklfwbfoawief.com', '+34669663664', 0, 'f', 'pending', 'pending', '80.24.8.184', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36', 'ca-ES,ca;q=0.9,en;q=0.8', 1559573824, b'0'),
('17', '3', '', 'wiefmw@wefwef.org', '+34666777888', 0, 'f', 'pending', 'pending', '80.24.8.184', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36', 'ca-ES,ca;q=0.9,en;q=0.8', 1559584961, b'0'),
('18', '3', '', 'test@best.zam', '+34677888999', 0, 'm', 'pending', 'pending', '80.24.8.184', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36', 'ca-ES,ca;q=0.9,en;q=0.8', 1559585318, b'0'),
('2', '0', '', 'kkk@gmail.com', '+34973205546', 0, '', 'pending', 'pending', NULL, '80.24.8.184', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36', 1554734932, b'0'),
('3', '9', '', 'kkk2@gmail.com', '+34973205546', 0, NULL, 'pending', 'pending', '80.24.8.184', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36', 'en-US,en;q=0.9', 1554735295, b'0'),
('4', '15', '', 'kkk2@gmail.com', '+34973205546', 0, NULL, 'organizercancelled', 'pending', '80.24.8.184', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36', 'en-US,en;q=0.9', 1554735485, b'1'),
('5', '9', 'chialing', 'lll@gmail.com', '+34632438612', 80, '', 'pending', 'pending', '80.24.8.184', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36', 'en-US,en;q=0.9', 1554750606, b'0'),
('5D02C372ED0E34CFF666426D07B8B635', '5D02B71D5FF44D5D909A553A3167DD86', 'Ignasi the super hero', 'ignasimg@gmail.com', NULL, NULL, NULL, 'pending', 'pending', '80.24.8.184', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36', 'ca-ES,ca;q=0.9,en;q=0.8', 1560462194, b'0'),
('5D02C460BD880218710596269C959C86', '5D02B71D5FF44D5D909A553A3167DD86', 'hochialing', 'hochialing91@gmail.com', NULL, NULL, NULL, 'pending', 'pending', '80.24.8.184', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36', 'ca-ES,ca;q=0.9,en;q=0.8', 1560462432, b'0'),
('5D036F8FE0B1B92C80E5A116582FF942', '5D036F69B6A58C90568E0DD62D865C1B', 'haha', 'hochialing91@gmail.com', '+34632438612', 18, 'f', 'pending', 'pending', '80.24.8.184', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36', 'en-US,en;q=0.9', 1560506255, b'0'),
('5D053D82AAB364BCC343CFEE29EE7FFD', '5D053D4FD08697D440B2934C0F04D303', NULL, 'hochialing91@gmail.com', '+34632438612', NULL, NULL, 'pending', 'pending', '80.24.8.184', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36', 'en-US,en;q=0.9', 1560624514, b'0'),
('5D0542C0163C909478C9C1AE3EED5982', '5D053F31604AABA14FF0C4BC09C2A419', NULL, 'hochialing91@gmail.com', '+34632438612', NULL, NULL, 'pending', 'pending', '80.24.8.184', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36', 'en-US,en;q=0.9', 1560625856, b'0'),
('5D0543084692FC8EE197AF666B639970', '5D0542EECF8AC56F266AE649951F01AD', NULL, 'hochialing91@gmail.com', '+34632438612', NULL, NULL, 'pending', 'pending', '80.24.8.184', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36', 'en-US,en;q=0.9', 1560625928, b'0'),
('5D05471C42D21CB95FEFFD494EC35C09', '5D0546F71BFE5942C983310034A6C228', 'haha', 'hochialing91@gmail.com', '+34632438612', 12, 'f', 'pending', 'pending', '80.24.8.184', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36', 'en-US,en;q=0.9', 1560626972, b'0'),
('5D0892BF5141300E1DF261981D5EFDC3', '5D08923EF7DB30633640089ADFB0C6AC', 'haha', 'hochialing91@gmail.com', '+34632438612', 18, 'm', 'pending', 'pending', '80.24.8.184', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36', 'en-US,en;q=0.9', 1560842943, b'0'),
('5D0B43DF98E1D68A184993317C357C28', '5D0B43C53DFADF98B11FC15B0D452556', NULL, 'hochialing91@gmail.com', '+34632438612', NULL, NULL, 'organizercancelled', 'pending', '80.24.8.184', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36', 'en-US,en;q=0.9', 1561019359, b'1'),
('5D0B4457204A13104095EDE694ADC4EB', '5D0B443986B3694CFA3F50E113920622', NULL, 'hochialing91@gmail.com', '+34632438612', NULL, NULL, 'organizercancelled', 'pending', '80.24.8.184', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36', 'en-US,en;q=0.9', 1561019479, b'1'),
('5D0B4668F7F629808F7B5167615A69C0', '5D0B463E09E5177E73C6CBBBE5B98C4A', 'linling', 'hochialing91@gmail.com', '+34632438612', 18, 'f', 'organizercancelled', 'pending', '80.24.8.184', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36', 'en-US,en;q=0.9', 1561020008, b'1'),
('5D0B46D344A66A51B429C0F0A3616503', '5D0B46B23ADE47F2232949211E00E238', 'xx', 'hochialing91@gmail.com', '+34632438612', 10, 'm', 'organizercancelled', 'pending', '80.24.8.184', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36', 'en-US,en;q=0.9', 1561020115, b'1'),
('5D0B47763FB44AE28DBF86891B246D99', '5D0B4755856EA351BD04A5C8C03E0B1D', 'x', 'hochialing91@gmail.com', '+34632438612', 10, 'f', 'organizercancelled', 'pending', '80.24.8.184', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36', 'en-US,en;q=0.9', 1561020278, b'1'),
('5D0B483E993E4F839504EAA7674D7B69', '5D0B4825F83BFBD31B9ABB0C1FE4D679', NULL, 'hochialing91@gmail.com', '+34632438612', NULL, NULL, 'organizercancelled', 'pending', '80.24.8.184', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36', 'en-US,en;q=0.9', 1561020478, b'1'),
('5D0B4913ADE7B44C5286935FB5217CA2', '5D0B48F7CCAECB9782DF77F215112C93', NULL, 'hochialing91@gmail.com', '+34632438612', NULL, NULL, 'organizercancelled', 'pending', '80.24.8.184', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36', 'en-US,en;q=0.9', 1561020691, b'1'),
('5D0BA4F59D15297FBDA7E12F855E408B', '5D0BA4DF7BCC518BF7C678B1622C5428', NULL, 'hochialing91@gmail.com', '+34632438612', NULL, NULL, 'organizercancelled', 'pending', '80.24.8.184', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36', 'en-US,en;q=0.9', 1561044213, b'1'),
('5D0CA4FF93E3E8805C325EBC3DCFAEA0', '5D0CA4EA151D7F46295F119F3C80E88B', NULL, 'hochialing91@gmail.com', '+34632438612', NULL, NULL, 'pending', 'pending', '80.24.8.184', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36', 'en-US,en;q=0.9', 1561109759, b'0'),
('5D0CA723A4976DF5218086DF85FBACB0', '5D0CA70FF322271EED2509BEFAF65823', NULL, 'lill12345696@gmail.com', '+34632438111', NULL, NULL, 'pending', 'pending', '80.24.8.184', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36', 'en-US,en;q=0.9', 1561110307, b'0'),
('5D0CADA5EEE05E4002A0D1C7DDAA0ED0', '5D0CAD8ACE65BCAEF87CD48F0EAC8EF6', NULL, 'lill12345696@gmail.com', '+34632438612', NULL, NULL, 'pending', 'pending', '80.24.8.184', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36', 'en-US,en;q=0.9', 1561111973, b'0'),
('5D0CAE50AA14748B0E75C2F4724638F8', '5D0CAE3BECB7696B7F13EBA4E2F690AA', NULL, 'lill12345696@gmail.com', '+34632438612', NULL, NULL, 'pending', 'pending', '80.24.8.184', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36', 'en-US,en;q=0.9', 1561112144, b'0'),
('5D0CAE9FD0A6B19A21B22F3C61ED73AD', '5D0CAE8737040B3E592E3367D72FF054', NULL, 'hochialing91@gmail.com', '+34632438111', NULL, NULL, 'pending', 'confirmed', '80.24.8.184', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36', 'en-US,en;q=0.9', 1561112223, b'0'),
('5D0CF3F20E0E4D6C5B1D62CD4C4C1A94', '5D0CF38ECE28BAC8EB364673C7AA61FF', NULL, 'ignasimg@gmail.com', NULL, 18, NULL, 'pending', 'pending', '80.24.8.184', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36', 'ca-ES,ca;q=0.9,en;q=0.8', 1561129970, b'0'),
('5D0CF548A948C69680BAA4D4D0748A2D', '5D0CF38ECE28BAC8EB364673C7AA61FF', NULL, 'ignasi@ausva04.com', NULL, 18, NULL, 'pending', 'pending', '80.24.8.184', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36', 'ca-ES,ca;q=0.9,en;q=0.8', 1561130312, b'0'),
('6', '9', 'mio', 'lill12345696@gmail.com', '+34632438612', 80, 'f', 'organizercancelled', 'pending', '80.24.8.184', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36', 'en-US,en;q=0.9', 1554750693, b'1'),
('7', '7', 'hahatest', 'mmm@gmail.com', '+34632438612', 80, 'm', 'pending', 'pending', '80.24.8.184', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36', 'en-US,en;q=0.9', 1554882815, b'0'),
('8', '7', 'hahatest', 'mmm@gmail.com', '+34632438612', 80, 'm', 'pending', 'pending', '80.24.8.184', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36', 'en-US,en;q=0.9', 1554882858, b'0'),
('9', '12', '', 'lill12345696@gmail.com', '+34632438612', 0, 'f', 'pending', 'pending', '80.24.8.184', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36', 'en-US,en;q=0.9', 1554903835, b'0');

-- --------------------------------------------------------

--
-- Estructura de suport per a vistes `reservesView`
-- (mireu a sota per a la visualització real)
--
CREATE TABLE `reservesView` (
`id` varchar(32)
,`classId` varchar(32)
,`courseId` varchar(32)
,`companyId` varchar(32)
,`fname` varchar(255)
,`email` varchar(60)
,`age` int(3)
,`gender` enum('m','f')
,`status` set('show','noshow','pending','usercancelled','organizercancelled')
,`confirmation` set('pending','confirmed','unconfirmed')
,`HTTP_ACCEPT_LANGUAGE` varchar(256)
,`ts` int(10)
,`courseName` varchar(255)
,`tsIni` int(10)
,`len` int(10)
);

-- --------------------------------------------------------

--
-- Estructura per a vista `classesView`
--
DROP TABLE IF EXISTS `classesView`;

CREATE ALGORITHM=UNDEFINED DEFINER=`admin`@`localhost` SQL SECURITY DEFINER VIEW `classesView`  AS  (select `classes`.`id` AS `id`,`classes`.`courseId` AS `courseId`,`courses`.`companyId` AS `companyId`,`courses`.`name` AS `name`,`courses`.`description` AS `description`,`courses`.`reqInfo` AS `reqInfo`,`courses`.`type` AS `type`,`courses`.`picture` AS `picture`,`courses`.`contact` AS `contact`,`courses`.`price` AS `price`,`courses`.`location` AS `location`,`classes`.`tsIni` AS `tsIni`,`classes`.`len` AS `len`,`classes`.`spots` AS `spots`,`classes`.`rollcall` AS `rollcall`,`classes`.`confirmationSent` AS `confirmationSent`,(select count(0) from `reserves` where (`reserves`.`classId` = `classes`.`id`)) AS `numReserves` from (`classes` left join `courses` on((`classes`.`courseId` = `courses`.`id`)))) ;

-- --------------------------------------------------------

--
-- Estructura per a vista `reservesView`
--
DROP TABLE IF EXISTS `reservesView`;

CREATE ALGORITHM=UNDEFINED DEFINER=`admin`@`localhost` SQL SECURITY DEFINER VIEW `reservesView`  AS  (select `reserves`.`id` AS `id`,`reserves`.`classId` AS `classId`,`classesView`.`courseId` AS `courseId`,`classesView`.`companyId` AS `companyId`,`reserves`.`fname` AS `fname`,`reserves`.`email` AS `email`,`reserves`.`age` AS `age`,`reserves`.`gender` AS `gender`,`reserves`.`status` AS `status`,`reserves`.`confirmation` AS `confirmation`,`reserves`.`HTTP_ACCEPT_LANGUAGE` AS `HTTP_ACCEPT_LANGUAGE`,`reserves`.`ts` AS `ts`,`classesView`.`name` AS `courseName`,`classesView`.`tsIni` AS `tsIni`,`classesView`.`len` AS `len` from (`reserves` left join `classesView` on((`reserves`.`classId` = `classesView`.`id`)))) ;

--
-- Índexs per a les taules bolcades
--

--
-- Índexs per a la taula `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idCurs` (`courseId`);

--
-- Índexs per a la taula `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `email` (`email`);

--
-- Índexs per a la taula `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idCompany` (`companyId`);

--
-- Índexs per a la taula `courseTypes`
--
ALTER TABLE `courseTypes`
  ADD PRIMARY KEY (`id`);

--
-- Índexs per a la taula `engagements`
--
ALTER TABLE `engagements`
  ADD PRIMARY KEY (`id`);

--
-- Índexs per a la taula `noSpam`
--
ALTER TABLE `noSpam`
  ADD PRIMARY KEY (`email`,`companyId`);

--
-- Índexs per a la taula `reserves`
--
ALTER TABLE `reserves`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idConvocatoria` (`classId`);

--
-- AUTO_INCREMENT per les taules bolcades
--

--
-- AUTO_INCREMENT per la taula `courseTypes`
--
ALTER TABLE `courseTypes`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;