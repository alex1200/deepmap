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
-- Table structure for table `survey_questions`
--

DROP TABLE IF EXISTS `survey_questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `survey_questions` (
  `idsurvey_questions` int(11) NOT NULL AUTO_INCREMENT,
  `question` varchar(2048) DEFAULT NULL,
  `type` int(11) DEFAULT NULL COMMENT '1text 2radial 3yesno',
  `page` int(11) DEFAULT NULL,
  PRIMARY KEY (`idsurvey_questions`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `survey_questions`
--

LOCK TABLES `survey_questions` WRITE;
/*!40000 ALTER TABLE `survey_questions` DISABLE KEYS */;
INSERT INTO `survey_questions` VALUES (1,'Rate the look of this map',1,1),(2,'How useful is multimedia in engaging with this location?',1,1),(3,'Any General Comments?',2,0),(4,'Rate the look of this map',1,2),(5,'Rate the look of this map',1,3),(6,'How well does changing location help understand the text',1,3),(7,'How well does flipping the pages engage you with this experience?',1,3),(8,'How useful is the panorama image?',1,3),(9,'Deep Mapping is concept based on the spatial representation of the various meanings and experiences of a place over a period time. Would you consider this a Deep Map?',2,3),(10,'How useful is this search tool?',1,2),(11,'How useful is this advanced search tool?',1,2),(12,'How useful is this compare search tool?',1,2),(13,'How useful is this advanced compare search tool?',1,2),(14,'How useful is this location search tool?',1,2),(15,'Deep Mapping is concept based on the spatial representation of the various meanings and experiences of a place over a period time. Would you consider this a Deep Map?',2,2),(16,'How useful is the Histroic map in context?',1,1),(17,'How useful is a timeline in understanding your search?',1,2),(18,'How engaging is this view of a station?',1,2),(19,'How useful are the historic texts that describe this location?',1,2);
/*!40000 ALTER TABLE `survey_questions` ENABLE KEYS */;
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
