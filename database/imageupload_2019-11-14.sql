# ************************************************************
# Sequel Pro SQL dump
# Version 5446
#
# https://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 8.0.16)
# Database: imageupload
# Generation Time: 2019-11-13 18:04:09 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table imgFile
# ------------------------------------------------------------

DROP TABLE IF EXISTS `imgFile`;

CREATE TABLE `imgFile` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `type` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `size` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `imgFile` WRITE;
/*!40000 ALTER TABLE `imgFile` DISABLE KEYS */;

INSERT INTO `imgFile` (`id`, `name`, `type`, `size`)
VALUES
	(13,'[\"profile-1573639577268.jpg\",\"profile-1573639577271.jpg\"]','[\"image/jpeg\",\"image/jpeg\"]','[132440,34043]'),
	(14,'[\"profile-1573642551882.jpg\",\"profile-1573642551888.jpg\",\"profile-1573642551889.jpg\",\"profile-1573642551895.jpg\",\"profile-1573642551898.jpg\",\"profile-1573642551902.jpg\"]','[\"image/jpeg\",\"image/jpeg\",\"image/jpeg\",\"image/jpeg\",\"image/jpeg\",\"image/jpeg\"]','[132440,34043,150848,132440,34043,150848]');

/*!40000 ALTER TABLE `imgFile` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
