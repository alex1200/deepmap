-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: deepmap
-- ------------------------------------------------------
-- Server version	5.5.5-10.1.22-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `literary_source`
--

DROP TABLE IF EXISTS `literary_source`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `literary_source` (
  `UID` varchar(45) NOT NULL,
  `title` varchar(1024) DEFAULT NULL,
  `author` varchar(1024) DEFAULT NULL,
  `description` varchar(1024) DEFAULT NULL,
  `timerange_start` int(11) DEFAULT NULL,
  `timerange_end` int(11) DEFAULT NULL,
  `author_location` varchar(1024) DEFAULT NULL,
  `author_latitude` varchar(45) DEFAULT NULL,
  `author_longitude` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`UID`),
  UNIQUE KEY `UID_UNIQUE` (`UID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `literary_source`
--

LOCK TABLES `literary_source` WRITE;
/*!40000 ALTER TABLE `literary_source` DISABLE KEYS */;
INSERT INTO `literary_source` VALUES ('LIT001','test','mr test','test this',1900,1940,'','',''),('LIT1477666742301N3BL','Beneath Helvellyn\'s Shade','Samuel Barber','Notes and Sketches in the Valley of Wythburn Topography',1892,1892,'','',''),('LIT1477666927239LSNs','Saint Herbert\'s Isle, A Legendary Poem, in Five Cantos, with Some Smaller Pieces','John Bree','Saint Herbert\'s Isle, A Legendary Poem, in Five Cantos, with Some Smaller Pieces by John Bree. This book is a reproduction of the original book published in 1832 and may have some imperfections such as marks or hand-written notes.',1832,1832,'','','');
/*!40000 ALTER TABLE `literary_source` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-06-04  2:31:44
