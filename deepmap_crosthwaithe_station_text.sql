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
-- Table structure for table `crosthwaithe_station_text`
--

DROP TABLE IF EXISTS `crosthwaithe_station_text`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `crosthwaithe_station_text` (
  `link_id` int(11) NOT NULL,
  `station_id` varchar(45) DEFAULT NULL,
  `text_id` varchar(45) DEFAULT NULL,
  `start_sentence` varchar(45) DEFAULT NULL,
  `end_sentence` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`link_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crosthwaithe_station_text`
--

LOCK TABLES `crosthwaithe_station_text` WRITE;
/*!40000 ALTER TABLE `crosthwaithe_station_text` DISABLE KEYS */;
INSERT INTO `crosthwaithe_station_text` VALUES (1,'1','1','539','541'),(2,'2','1','542','551'),(3,'3','1','552','585'),(4,'4','1','586','647'),(5,'5','1','648','649'),(6,'6','1','650','654'),(7,'7','1','655','685'),(8,'8','1','686','726'),(9,'1','7','243','248'),(10,'2','7','89','101'),(11,'3','7','249','253'),(12,'2','6','702','707'),(13,'3','6','708','711'),(14,'2','5','523','527'),(15,'4','5','534','536'),(16,'1','3','64','69'),(17,'2','3','147','154'),(18,'4','3','33','39'),(19,'4','2','714','720'),(20,'2','8','1009','1011'),(21,'3','8','1027','1028'),(22,'4','8','1501','1503');
/*!40000 ALTER TABLE `crosthwaithe_station_text` ENABLE KEYS */;
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
