-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Temps de generació: 10-06-2019 a les 16:29:21
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
('15', '1', 2147483647, 2147483647, 1, 1553890501, b'0', b'0', b'0'),
('16', '28', 2147483647, 2147483647, 300, 1554801927, b'0', b'0', b'0'),
('17', '29', 2147483647, 1000, 3, 1556282036, b'0', b'0', b'0'),
('18', '2', 2147483647, 2147483647, 9, 1556793704, b'0', b'0', b'0'),
('19', '1', 2147483647, 1, 1, 1556810745, b'0', b'0', b'0'),
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
('6', '13', 2147483647, 2147483647, 100, 1553695437, b'0', b'0', b'0'),
('7', '6', 2147483647, 2147483647, 5, 1553890479, b'0', b'0', b'0'),
('8', '4', 2147483647, 2147483647, 100, 1553697184, b'0', b'0', b'0'),
('9', '1', 2147483647, 2147483647, 0, 1553697252, b'0', b'0', b'0');

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
('10', 'test@test.test', '$2y$10$2J0eTvle.OSPJyLkvk8OwO4PV2IqKh0p.u6WY72icuT3DKNAMv4Hi', 'TEST COMPANY', NULL, NULL, b'1', 1556281876, b'0'),
('11', 'c0973205546@gmail.com', '$2y$10$04Yo655xb7ybEtDXNEmjyeZH6f0U6DYzdiVxkCryqUdct2S5HNFyK', 'TEST', '$2y$10$iQlmZTvyweEIYWj9oRkT0uwHYHSzrkur83RS7BT5yzc0JAN.aiM2W', NULL, b'0', 1557175258, b'0'),
('2', 'ignasi@ausva04.com', '$2y$10$Uv6KcQX1SVQ4Oa2XnvY1.O3QxY3AQyxuvqqmPkYa9WfzDTbgV6gTq', 'AUSVA 04', NULL, NULL, b'1', 1552232561, b'0'),
('3', 'hochialing91@gmail.com', '$2y$10$o2FrR.WhGk/pMIX7kA/6cOwSU4Whj2qNEsEabX2C7ZbSqTGI2Sdr6', 'Chia Ling', NULL, NULL, b'1', 1552233198, b'0'),
('4', 'hochialing@gmail.com', '$2y$10$Lhdjrbu2.bIekFiaUIj1au12Ke2pRemirKUaZ7RieNjfOyD2akzGa', 'Chia Ling', NULL, NULL, b'1', 1552297196, b'0'),
('5', 'lill12345696@gmail.com', '$2y$10$lw5eiJT6RlovFHbsUPOt9.zWhv3zk/u6U3V5JvUauB.VEZyJhc.i2', 'Chia Ling 2', NULL, NULL, b'1', 1552669439, b'0'),
('5CF9376FBE098331EE91DC202F09BCA4', 'ignasimg@gmail.com', '$2y$10$uiPBXw0RMpz1tstiPq5SOOd1fOXzc42eEq6uc5SvtfD01rQYEMCuK', 'TEST COMPANY 3', NULL, NULL, b'1', 1559836527, b'0'),
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
  `ts` int(10) NOT NULL,
  `deleted` bit(1) NOT NULL DEFAULT b'0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Bolcament de dades per a la taula `courses`
--

INSERT INTO `courses` (`id`, `companyId`, `name`, `description`, `type`, `reqInfo`, `ts`, `deleted`) VALUES
('1', '5', 'haha', 'hola', 0, 'email,phone', 1552853659, b'0'),
('10', '5', 'kk', 'kkg', 0, 'email,fname,phone,age,gender', 1553076373, b'0'),
('11', '5', 'lovely', 'love ', 0, 'email,fname,phone,age,gender', 1553091134, b'0'),
('12', '5', 'toeic3', 'toeic', 0, 'email,phone,age,gender', 1553091566, b'0'),
('13', '5', 'climb', 'hard climb ', 0, 'email,phone,age', 1553167782, b'0'),
('14', '5', 'A', 'b', 0, 'email,gender', 1553167862, b'0'),
('15', '5', 'abcdefg', 'dddfdfd', 0, 'email,gender', 1553173526, b'0'),
('16', '5', 'moutains', 'rockclimbing', 0, 'email,phone,gender', 1553188437, b'0'),
('17', '5', 'ocean', 'diving ', 0, 'email,phone,gender', 1553188554, b'0'),
('18', '5', 'egg', 'free', 0, 'email,gender', 1553199068, b'0'),
('19', '5', 'sing', 'cute song meow meow', 0, 'email,fname,phone,gender', 1553199378, b'0'),
('2', '5', 'mk123', 'f', 0, 'email,phone,gender', 1552853721, b'0'),
('20', '5', 'hola', 'fig', 0, 'email,gender', 1553200803, b'0'),
('21', '5', 'kkk', 'try hard ', 0, 'email,phone,gender', 1553201009, b'0'),
('22', '5', 'cant be empty', 'aiya ', 0, 'email,phone,gender', 1553201196, b'0'),
('23', '5', 'fasdsf', 'wsfff', 0, 'email,phone,gender', 1553204246, b'0'),
('24', '8', 'testCourse', 'TestDescription', 0, 'email', 0, b'1'),
('25', '5', 'make', 'make food ', 0, 'email,gender', 1554135701, b'0'),
('26', '5', 'make pizza', 'pizza hot ', 0, 'email,gender', 1554136042, b'0'),
('27', '5', 'wdwdw', 'wdw', 0, 'email,gender', 1554136349, b'0'),
('28', '9', 'oh my', 'test', 0, 'email,gender', 1554801830, b'0'),
('29', '10', 'TEST COURSE', ': )', 0, 'email,fname,gender', 1556281991, b'0'),
('3', '5', 'hate', 'hg', 0, 'email,gender', 1552853769, b'0'),
('30', '5', 'testing', '<h1><span style=\"color: #e74c3c;\"><strong>super course!</strong></span></h1>', 0, 'email,phone', 1556794726, b'0'),
('31', '5', 'test type', '<p><em>hey</em></p>', 0, 'email,phone', 1556885379, b'0'),
('32', '5', 'test again', '<p>hey&nbsp;<span style=\"text-decoration: underline;\">hey&nbsp;</span></p>', 0, 'email,phone', 1556885448, b'0'),
('33', '5', 'j', '<p>j</p>', 0, 'email,phone,gender', 1556887236, b'0'),
('34', '5', 'test', '<p>hey</p>', 0, 'email,gender', 1556893789, b'0'),
('35', '5', 'sw', '<p>sw</p>', 0, 'email', 1556894777, b'0'),
('36', '5', 'x', '<p>x</p>', 0, 'email,phone', 1556895613, b'0'),
('37', '5', 'xxxxx', '<p>x</p>', 0, 'email,phone', 1556895640, b'0'),
('38', '5', 'xxxxxcscs', '<p>x</p>', 0, 'email,phone', 1556895648, b'0'),
('39', '5', 'try', '<p>try&nbsp;</p>', 0, 'email,gender', 1556895711, b'0'),
('4', '5', 'try course', 'sweet', 0, 'email,fname,phone,gender', 1552853805, b'0'),
('40', '5', 'hiking test', '<p>test</p>', 0, 'email,phone', 1556896007, b'0'),
('41', '5', 'jkjhkj', '<p>gukh</p>', 0, 'email,phone', 1556896211, b'0'),
('42', '5', 'climbing test', '<p>yes</p>', 0, 'email,phone', 1556896678, b'0'),
('43', '5', 'dancing test', '<p>test</p>', 2, 'email,gender', 1556900693, b'0'),
('44', '5', 'test c', '<p>c</p>', 4, 'email,gender', 1556900846, b'0'),
('45', '5', 'SPORTS TEST', '<p>T</p>', 6, 'email,gender', 1556903444, b'0'),
('46', '5', 's', '<p><strong>s</strong></p>', 3, 'email', 1556903771, b'0'),
('47', '5', 'dancing try yes', '<p><em>try oh</em></p>', 2, 'email', 1556903868, b'0'),
('48', '5', 'Rescuing Primates! Hike and visiting Foundation', '<section class=\"section\">\n<div class=\"chunk event-description--wrapper\">\n<h2 class=\"text--sectionTitle text--bold padding--bottom\">Details</h2>\n<div class=\"event-description runningText\">\n<p>Rescuing Primates!<br /><br />En castellano con este link<br /><br /><a class=\"link\" title=\"https://www.meetup.com/mamuthiking/pages/28951028/Fundaci%C3%B3n_Mona/?success=pages_add\" href=\"https://www.meetup.com/mamuthiking/pages/28951028/Fundaci%C3%B3n_Mona/?success=pages_add\" target=\"__blank\">https://www.meetup.com/mamuthiking/pages/28951028/Fundaci%C3%B3n_Mona/?success=pages_add</a><br /><br />In order to participate please fell the form:&nbsp;<a class=\"link\" title=\"https://forms.gle/jFcofCfZ4JUTA7F18\" href=\"https://forms.gle/jFcofCfZ4JUTA7F18\" target=\"__blank\">https://forms.gle/jFcofCfZ4JUTA7F18</a><br /><br />This time it will be an unusual excursion. We will visit Mona Foundation near Girona region.<br /><br />In rehabilitation center, abused chimpanzees and macaques are recovering from their previous lives as circus artists, television actors, and even pets. Many of them spent years living in solitude under terrifyingly inhumane conditions. MONA gives these primates a second chance at a life free of pain and abuse. They provide their primates a curative, nurturing, and restorative environment in a group of their own kind within a spacious and natural installation. The center gives them the type of life they should have had in the wild, giving them back their dignity they so much deserve.<br /><br />First we will make a nice hike from Sant Feliu de Gu&iacute;xols a Platja de Aro.<br />This is a hike along clifftop trails with beautiful views of contrasting orange cliffs, green trees, and turquoise waters. We started the day a little intimidated with the length of the hike. From early on we could see Palam&oacute;s in the far, far distance &ndash; and it was hard to feel like we were making progress at times.<br /><br />This day hike really gives you a feel for Costa Brava&rsquo;s finger-like peninsulas and coves. For this hike you can&rsquo;t get caught up on efficiency &ndash; you just have to enjoy the moment and the views. And luckily the variety of views in this section are spectacular!<br /><br />We can swim that day, enjoy a beautiful day and may be play volley at the beach, and after that we will get into bus and will go to Mona center.<br /><br />!!if you do not want to visit Foundation,you can just come with us for walk,it will be descounted from the price!!<br /><br />HIKING DETAILS<br /><br />???? We meet at a place we arrange in whats up group, at 08:15 (center)<br />????The bus takes us at 08:30 It can wait maximum of 5 minutes, so please do not be late. It will take us about 1,5 to get to the place:)<br />???? Back to Barcelona : 21.00h.aproximatly<br />???? Total Distance of hiking : 8 / Elevation gain: 350 m.<br />???? Hike Difficulty level: ????/5 easy +<br />???? Estimated Completion Time: 4 hours in total walking + 1,5 IN the center<br />???? Price : 35 Euros for person(transportation included going and coming back in private bus with the driver)+ entrance for foundation<br /><br />???? Take with you: hiking shoes,<br />Aquatic shoes if you have those<br />water, food for picnic (sandwiches, fruits and others)<br /><br />????Organizer: Yulia<br />to participate its necessary to do the payment of 50%in advance</p>\n</div>\n</div>\n</section>\n<section class=\"section\">\n<div class=\"attendees-sample\">\n<div class=\"flex flex--row\">\n<div class=\"flex-item\">&nbsp;</div>\n</div>\n</div>\n</section>', 1, 'email,gender', 1559077961, b'0'),
('49', '5', 'Hey', '', 1, 'email,gender', 1559311068, b'0'),
('5', '5', 'xx', 'yy', 0, 'email,fname,phone,age,gender', 1552853839, b'0'),
('5CF93C4EBA07A085E49734460CB60507', '5CF9376FBE098331EE91DC202F09BCA4', 'Curs de prova', '<p>&lt;3</p>', 1, 'email,fname', 1559837774, b'0'),
('6', '5', 'Chia Ling', 'sdsd', 0, 'email,phone', 1552853976, b'0'),
('7', '5', 'new class', 'swimming in the sea and river', 0, 'email,fname', 1552996012, b'0'),
('8', '5', '', '', 0, 'email', 1553000360, b'0'),
('9', '5', '', '', 0, 'email,phone,age', 1553010001, b'0');

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
('4', '15', '', 'kkk2@gmail.com', '+34973205546', 0, NULL, 'pending', 'pending', '80.24.8.184', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36', 'en-US,en;q=0.9', 1554735485, b'0'),
('5', '9', 'chialing', 'lll@gmail.com', '+34632438612', 80, '', 'pending', 'pending', '80.24.8.184', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36', 'en-US,en;q=0.9', 1554750606, b'0'),
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

CREATE ALGORITHM=UNDEFINED DEFINER=`admin`@`localhost` SQL SECURITY DEFINER VIEW `classesView`  AS  (select `classes`.`id` AS `id`,`classes`.`courseId` AS `courseId`,`courses`.`companyId` AS `companyId`,`courses`.`name` AS `name`,`courses`.`description` AS `description`,`courses`.`reqInfo` AS `reqInfo`,`courses`.`type` AS `type`,`classes`.`tsIni` AS `tsIni`,`classes`.`len` AS `len`,`classes`.`spots` AS `spots`,`classes`.`rollcall` AS `rollcall`,`classes`.`confirmationSent` AS `confirmationSent`,(select count(0) from `reserves` where (`reserves`.`classId` = `classes`.`id`)) AS `numReserves` from (`classes` left join `courses` on((`classes`.`courseId` = `courses`.`id`)))) ;

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