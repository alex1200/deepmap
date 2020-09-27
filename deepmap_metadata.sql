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
-- Table structure for table `metadata`
--

DROP TABLE IF EXISTS `metadata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `metadata` (
  `linkUID` int(11) NOT NULL COMMENT 'UID of resource in Database',
  `abstract` varchar(45) DEFAULT NULL COMMENT 'A Summary of the Resource',
  `accessRights` varchar(45) DEFAULT NULL COMMENT 'Information about who can access the resource or an indication of its security status',
  `accrualMethod` varchar(45) DEFAULT NULL COMMENT 'The method by which items are added to a collection',
  `accrualPeriodicity` varchar(45) DEFAULT NULL COMMENT 'The frequency with which items are added to a collection',
  `accrualPolicy` varchar(45) DEFAULT NULL COMMENT 'The policy governing the addition of items to a collection',
  `alternative` varchar(45) DEFAULT NULL COMMENT 'An alternate name of the resource',
  `audience` varchar(45) DEFAULT NULL COMMENT 'A class of entity for whom the resource is intended or useful',
  `available` varchar(45) DEFAULT NULL COMMENT 'Date (often a range) that the resource become or will become available',
  `bibliographicCitation` varchar(45) DEFAULT NULL COMMENT 'A bibliographic reference for the resource',
  `conformsTo` varchar(45) DEFAULT NULL COMMENT 'An established standard to which the described resource conforms',
  `contributor` varchar(45) DEFAULT NULL COMMENT 'An entity responsible for making contributions to the resource',
  `coverage` varchar(45) DEFAULT NULL COMMENT 'The spatial or temporal topic of the resource, the spatial applicability of the resource, or the jurisdiction under which the resource is relevant',
  `created` varchar(45) DEFAULT NULL COMMENT 'Date of creation of the resource',
  `creator` varchar(45) DEFAULT NULL COMMENT 'An entity primarily responsible for making the resource.',
  `date` varchar(45) DEFAULT NULL COMMENT 'A point or period of time associated with an event in the lifecycle of the resource.',
  `dateAccepted` varchar(45) DEFAULT NULL COMMENT 'Date of acceptance of the resource.',
  `dateCopyrighted` varchar(45) DEFAULT NULL COMMENT 'Date of copyright.',
  `dateSubmitted` varchar(45) DEFAULT NULL COMMENT 'Date of submission of the resource.',
  `description` varchar(45) DEFAULT NULL COMMENT 'An account of the resource.',
  `educationLevel` varchar(45) DEFAULT NULL COMMENT 'A class of entity, defined in terms of progression through an educational or training context, for which the described resource is intended.',
  `extent` varchar(45) DEFAULT NULL COMMENT 'The size or duration of the resource.',
  `format` varchar(45) DEFAULT NULL COMMENT 'The file format, physical medium, or dimensions of the resource.',
  `hasFormat` varchar(45) DEFAULT NULL COMMENT 'A related resource that is substantially the same as the pre-existing described resource, but in another format.',
  `hasPart` varchar(45) DEFAULT NULL COMMENT 'A related resource that is included either physically or logically in the described resource.',
  `hasVersion` varchar(45) DEFAULT NULL COMMENT 'A related resource that is a version, edition, or adaptation of the described resource.',
  `identifier` varchar(45) DEFAULT NULL COMMENT 'An unambiguous reference to the resource within a given context.',
  `instructionalMethod` varchar(45) DEFAULT NULL COMMENT 'A process, used to engender knowledge, attitudes and skills, that the described resource is designed to support.',
  `issued` varchar(45) DEFAULT NULL COMMENT 'Date of formal issuance (e.g., publication) of the resource.',
  `isVersionOf` varchar(45) DEFAULT NULL COMMENT 'A related resource of which the described resource is a version, edition, or adaptation.',
  `language` varchar(45) DEFAULT NULL COMMENT 'A language of the resource.',
  `license` varchar(45) DEFAULT NULL COMMENT 'A legal document giving official permission to do something with the resource.',
  `mediator` varchar(45) DEFAULT NULL COMMENT 'An entity that mediates access to the resource and for whom the resource is intended or useful.',
  `medium` varchar(45) DEFAULT NULL COMMENT 'The material or physical carrier of the resource.',
  `modified` varchar(45) DEFAULT NULL COMMENT 'Date on which the resource was changed.',
  `provenance` varchar(45) DEFAULT NULL COMMENT 'A statement of any changes in ownership and custody of the resource since its creation that are significant for its authenticity, integrity, and interpretation.',
  `publisher` varchar(45) DEFAULT NULL COMMENT 'An entity responsible for making the resource available.',
  `references` varchar(45) DEFAULT NULL COMMENT 'A related resource that is referenced, cited, or otherwise pointed to by the described resource.',
  `relation` varchar(45) DEFAULT NULL COMMENT 'Recommended best practice is to identify the related resource by means of a string conforming to a formal identification system.',
  `replaces` varchar(45) DEFAULT NULL COMMENT 'A related resource that is supplanted, displaced, or superseded by the described resource.',
  `requires` varchar(45) DEFAULT NULL COMMENT 'A related resource that is required by the described resource to support its function, delivery, or coherence.',
  `rights` varchar(45) DEFAULT NULL COMMENT 'Information about rights held in and over the resource.',
  `rightsHolder` varchar(45) DEFAULT NULL COMMENT 'A person or organization owning or managing rights over the resource.',
  `source` varchar(45) DEFAULT NULL COMMENT 'A related resource from which the described resource is derived.',
  `spatial` varchar(45) DEFAULT NULL COMMENT 'Spatial characteristics of the resource.',
  `subject` varchar(45) DEFAULT NULL COMMENT 'The topic of the resource.',
  `tableOfContents` varchar(45) DEFAULT NULL COMMENT 'A list of subunits of the resource.',
  `temporal` varchar(45) DEFAULT NULL COMMENT 'Temporal characteristics of the resource.',
  `title` varchar(45) DEFAULT NULL COMMENT 'A name given to the resource.',
  `type` varchar(45) DEFAULT NULL COMMENT 'The nature or genre of the resource.',
  `valid` varchar(45) DEFAULT NULL COMMENT 'Date (often a range) of validity of a resource.',
  PRIMARY KEY (`linkUID`),
  UNIQUE KEY `linkUID_UNIQUE` (`linkUID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `metadata`
--

LOCK TABLES `metadata` WRITE;
/*!40000 ALTER TABLE `metadata` DISABLE KEYS */;
/*!40000 ALTER TABLE `metadata` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-06-04  2:31:45
