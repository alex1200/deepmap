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
-- Table structure for table `crosthwaithe_text_meta`
--

DROP TABLE IF EXISTS `crosthwaithe_text_meta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `crosthwaithe_text_meta` (
  `text_id` int(11) NOT NULL,
  `time_start` varchar(45) DEFAULT NULL,
  `time_end` varchar(45) DEFAULT NULL,
  `title` varchar(1024) DEFAULT NULL,
  `filename` varchar(1024) DEFAULT NULL,
  `author` varchar(1024) DEFAULT NULL,
  `publish_date` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`text_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crosthwaithe_text_meta`
--

LOCK TABLES `crosthwaithe_text_meta` WRITE;
/*!40000 ALTER TABLE `crosthwaithe_text_meta` DISABLE KEYS */;
INSERT INTO `crosthwaithe_text_meta` VALUES (1,'1770','1779','A Guide to the Lakes: Dedicated to the Lovers of Landscape Studies, etc.','West_cqp_17_edit.xml','Thomas West','1778'),(2,'1780','1789','Observations, Relative Chiefly to Picturesque Beauty, etc.','Gilpin_cqp_21.xml','William Gilpin','1786'),(3,'1770','1779','Journal of A Visit to the Lake District in 1769','Gray_cqp_13.xml','Thomas Gray','1775'),(4,'1850','1859','A Complete Guide to the English Lakes','Martineau_cqp_65.xml','Harriet Martineau','1855'),(5,'1790','1799','A Journey Made in the Summer of 1794, etc.','Radcliffe_cqp_28.xml','Ann Radcliffe','1795'),(6,'1820','1829','A Description of the Scenery of the Lakes in the North of England','Wordsworth_cqp_48.xml','William Wordsworth','1822'),(7,'1770','1779','Six Months\' Tour Through the North of England, etc.','Young_cqp_11.xml','Arthur Young','1770'),(8,'1890','1900','Black\'s Shilling Guide to the English Lakes','Baines_cqp_53.xml','M. J. B. Baddeley','1900');
/*!40000 ALTER TABLE `crosthwaithe_text_meta` ENABLE KEYS */;
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
