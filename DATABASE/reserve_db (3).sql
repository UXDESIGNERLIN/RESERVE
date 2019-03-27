-- phpMyAdmin SQL Dump
-- version 4.1.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 27, 2019 at 05:22 PM
-- Server version: 5.5.37-0ubuntu0.12.04.1
-- PHP Version: 5.3.10-1ubuntu3.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `reserve_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `classes`
--

CREATE TABLE IF NOT EXISTS `classes` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `idCourse` int(10) NOT NULL,
  `tsIni` int(10) NOT NULL,
  `len` int(10) NOT NULL,
  `spots` int(10) NOT NULL,
  `ts` int(10) NOT NULL,
  `deleted` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`id`),
  KEY `idCurs` (`idCourse`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

--
-- Dumping data for table `classes`
--

INSERT INTO `classes` (`id`, `idCourse`, `tsIni`, `len`, `spots`, `ts`, `deleted`) VALUES
(1, 24, 0, 3600, 10, 0, b'1'),
(2, 2, 1563629972, 50, 500, 1553629989, b'0'),
(3, 2, 2147483647, 2147483647, 25, 1553701763, b'0'),
(4, 4, 2147483647, 2147483647, 300, 1553681435, b'0'),
(5, 2, 2147483647, 2147483647, 31, 1553688657, b'0'),
(6, 13, 2147483647, 2147483647, 100, 1553695437, b'0'),
(7, 6, 2147483647, 2147483647, 5, 1553696616, b'0'),
(8, 4, 2147483647, 2147483647, 100, 1553697184, b'0'),
(9, 1, 2147483647, 2147483647, 35, 1553697252, b'0');

-- --------------------------------------------------------

--
-- Table structure for table `companies`
--

CREATE TABLE IF NOT EXISTS `companies` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `email` varchar(60) NOT NULL,
  `password` varchar(60) NOT NULL,
  `name` varchar(255) NOT NULL,
  `ts` int(10) DEFAULT NULL,
  `deleted` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`id`),
  KEY `email` (`email`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `companies`
--

INSERT INTO `companies` (`id`, `email`, `password`, `name`, `ts`, `deleted`) VALUES
(1, 'ling@gmail.com', '$2y$10$3UKPBowdFzvdjMPzkusD5eg8efHkyJwzaIJFQq5IwzvczXR0xppiG', 'chialing', NULL, b'0'),
(2, 'ignasi@ausva04.com', '$2y$10$Uv6KcQX1SVQ4Oa2XnvY1.O3QxY3AQyxuvqqmPkYa9WfzDTbgV6gTq', 'AUSVA 04', 1552232561, b'0'),
(3, 'hochialing91@gmail.com', '$2y$10$o2FrR.WhGk/pMIX7kA/6cOwSU4Whj2qNEsEabX2C7ZbSqTGI2Sdr6', 'Chia Ling', 1552233198, b'0'),
(4, 'hochialing@gmail.com', '$2y$10$Lhdjrbu2.bIekFiaUIj1au12Ke2pRemirKUaZ7RieNjfOyD2akzGa', 'Chia Ling', 1552297196, b'0'),
(5, 'lill12345696@gmail.com', '$2y$10$RRepQoxo9LbzSfb8NQL.3.ERbBXaCH3YbuTMj0nPgIpGwQY5G5DDm', 'Chia Ling', 1552669439, b'0'),
(6, 'chialing@ausva04.com', '$2y$10$bdONmBcxD2BPmeP9JcK7qua.A1sYutMI.B9jFP727LBRAmvTF9Bj2', 'Chia Ling', 1552672010, b'0'),
(7, 'cuentas@sawcer.com', '$2y$10$OGoPeG2IlX.c6W09.EDTnunGzShIFPXps7tS8NCxW/wNduwU.0/Km', 'x', 1552672267, b'0'),
(8, 'test@test.test', '', 'TEST', 0, b'1');

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE IF NOT EXISTS `courses` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `idCompany` int(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `reqInfo` set('email','fname','phone','age','gender') NOT NULL,
  `ts` int(10) NOT NULL,
  `deleted` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`id`),
  KEY `idCompany` (`idCompany`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=25 ;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `idCompany`, `name`, `description`, `reqInfo`, `ts`, `deleted`) VALUES
(1, 5, 'haha', 'ff', 'email,phone', 1552853659, b'0'),
(2, 5, 'mk123', 'k', 'email,phone,gender', 1552853721, b'0'),
(3, 5, 'hate', 'hg', 'email,gender', 1552853769, b'0'),
(4, 5, 'try course', 'sweet', 'email,fname,phone,gender', 1552853805, b'0'),
(5, 5, 'xx', 'yy', 'email,fname,phone,age,gender', 1552853839, b'0'),
(6, 5, 'Chia Ling', 'sdsd', 'email,phone', 1552853976, b'0'),
(7, 5, 'new class', 'swimming in the sea and river', 'email,fname', 1552996012, b'0'),
(8, 5, '', '', 'email', 1553000360, b'0'),
(9, 5, '', '', 'email,phone,age', 1553010001, b'0'),
(10, 5, 'kk', 'kkg', 'email,fname,phone,age,gender', 1553076373, b'0'),
(11, 5, 'lovely', 'love ', 'email,fname,phone,age,gender', 1553091134, b'0'),
(12, 5, 'toeic3', 'toeic', 'email,phone,age,gender', 1553091566, b'0'),
(13, 5, 'climb', 'hard climb ', 'email,phone,age', 1553167782, b'0'),
(14, 5, 'A', 'b', 'email,gender', 1553167862, b'0'),
(15, 5, 'abcdefg', 'dddfdfd', 'email,gender', 1553173526, b'0'),
(16, 5, 'moutains', 'rockclimbing', 'email,phone,gender', 1553188437, b'0'),
(17, 5, 'ocean', 'diving ', 'email,phone,gender', 1553188554, b'0'),
(18, 5, 'egg', 'free', 'email,gender', 1553199068, b'0'),
(19, 5, 'sing', 'cute song meow meow', 'email,fname,phone,gender', 1553199378, b'0'),
(20, 5, 'hola', 'fig', 'email,gender', 1553200803, b'0'),
(21, 5, 'kkk', 'try hard ', 'email,phone,gender', 1553201009, b'0'),
(22, 5, 'cant be empty', 'aiya ', 'email,phone,gender', 1553201196, b'0'),
(23, 5, 'fasdsf', 'wsfff', 'email,phone,gender', 1553204246, b'0'),
(24, 8, 'testCourse', 'TestDescription', 'email', 0, b'1');

-- --------------------------------------------------------

--
-- Table structure for table `reserves`
--

CREATE TABLE IF NOT EXISTS `reserves` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `idClass` int(10) NOT NULL,
  `fname` varchar(255) DEFAULT NULL,
  `email` varchar(60) DEFAULT NULL,
  `phone` varchar(60) DEFAULT NULL,
  `age` int(3) DEFAULT NULL,
  `gender` enum('m','f') DEFAULT NULL,
  `REMOTE_ADDR` varchar(45) DEFAULT NULL,
  `HTTP_USER_AGENT` varchar(512) DEFAULT NULL,
  `HTTP_ACCEPT_LANGUAGE` varchar(256) DEFAULT NULL,
  `ts` int(10) NOT NULL,
  `deleted` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`id`),
  KEY `idConvocatoria` (`idClass`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `reserves`
--

INSERT INTO `reserves` (`id`, `idClass`, `fname`, `email`, `phone`, `age`, `gender`, `REMOTE_ADDR`, `HTTP_USER_AGENT`, `HTTP_ACCEPT_LANGUAGE`, `ts`, `deleted`) VALUES
(1, 1, NULL, 'test@best.com', NULL, NULL, NULL, '80.36.170.45', 'chrome', 'ca-ES', 0, b'1');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
