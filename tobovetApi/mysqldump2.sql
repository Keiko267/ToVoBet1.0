-- MariaDB dump 10.19  Distrib 10.5.23-MariaDB, for debian-linux-gnu (aarch64)
--
-- Host: localhost    Database: tobovet
-- ------------------------------------------------------
-- Server version	10.5.23-MariaDB-0+deb11u1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `articles` (
  `article_id` int(11) NOT NULL AUTO_INCREMENT,
  `article_name` varchar(45) NOT NULL,
  `article_group` varchar(45) NOT NULL,
  `article_pvp` float NOT NULL,
  `article_stock` int(11) NOT NULL,
  `article_validity_period` int(11) DEFAULT 365,
  PRIMARY KEY (`article_id`)
) ENGINE=InnoDB AUTO_INCREMENT=112 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles`
--

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` VALUES (1,'Consulta','Consulta',16.53,0,365),(2,'Asesoramiento nutricional','Consulta',23.14,0,365),(3,'Revisión','Consulta',8.264,0,365),(4,'Consulta fisioterapia y rehabilitación','Consulta',23.14,0,365),(5,'Vacuna antirrábica','Vacuna',20.66,0,365),(6,'Vacuna antirrábica + Chip + Pasaporte','Vacuna + test',57.85,0,365),(8,'Vacuna bivalente perro ','Vacuna',20.66,0,365),(9,' Vacuna pentavalente perro','Vacuna',20.66,0,365),(10,'Vacuna Leishmania','Vacuna',49.59,0,365),(11,'Vacuna leishmania + Test','Vacuna + test',74.38,0,365),(12,'Inyección SC/IM','Tratamiento',4.13,0,365),(13,'Vacuna trivalente gato','Vacuna',21.49,0,365),(14,'Curas','Vendaje',12.4,0,365),(15,'Sedación de gatos','Sedación',24.79,0,365),(16,'Vendaje Robert-Jones','Vendaje',37.19,0,365),(17,'Vendaje simple','Vendaje',12.4,0,365),(18,'Sedación perro 0-10kg','Sedación',24.79,0,365),(19,'Sedación perro 10-20kg','Sedación',28.92,0,365),(20,'Sutura simple','Sutura',24.79,0,365),(21,'Sedación perro 20-30kg','Sedación',33.06,0,365),(22,'Sedación perro 30-40kg','Sedación',37.19,0,365),(23,'Sedación perro >40kg','Sedación',41.32,0,365),(24,'Tira de Shcrimer','Oftalmología',8.26,0,365),(25,'Sutura complicada 0-10kg','Sutura',82.64,0,365),(26,'Tira de Flouresceína','Oftalmología',8.26,0,365),(27,'Sutura complicada 10-20kg','Sutura',86.78,0,365),(28,'Lavado de boca de perro 0-10kg','Odontología',74.38,0,365),(29,'Lavado de boca perro 10-20kg','Odontología',95.04,0,365),(30,'Sutura complicada 20-30kg','Sutura',99.17,0,365),(31,'Lavado de boca perro 20-30kg','Odontología',99.17,0,365),(32,'Sutura complicada 30-40kg','Sutura',95.04,0,365),(33,'Lavado de boca perro 30-40kg','Odontología',103.31,0,365),(34,'Sutura complicada >40 kg','Sutura',99.17,0,365),(35,'Lavado de boca perro >40kg','Odontología',107.44,0,365),(36,'Lavado de boca gatos','Odontología',74.38,0,365),(37,'Sutura complicada gato','Sutura',82.64,0,365),(38,'Sutura con drenaje >40kg','Sutura',123.97,0,365),(39,'Sutura con drenaje 0-10kg','Sutura',107.44,0,365),(40,'Sutura con drenaje 10-20kg','Sutura',111.57,0,365),(41,'Sutura con drenaje 30-40kg','Sutura',119.83,0,365),(42,'Sutura con drenaje 20-30kg','Sutura',115.7,0,365),(43,'Sutura con drenaje gato','Sutura',107.44,0,365),(45,' Vacuna de leucemia gatos','Vacuna',24.79,0,365),(46,'Perfil general','Laboratorio',41.32,0,365),(47,'Perfil geriátrico felino','Laboratorio',56.2,0,365),(48,'Perfil geriátrico canino','Laboratorio',56.2,0,365),(49,'Perfil ictericia canina','Laboratorio',70.25,0,365),(50,'Perfil ictericia felina','Laboratorio',70.25,0,365),(51,'Perfil serológico leishmania','Laboratorio',49.59,0,365),(52,'Urocultivo','Laboratorio',41.32,0,365),(53,'Urianálisis','Laboratorio',20.66,0,365),(54,'Coprocultivo','Laboratorio',39.67,0,365),(55,'Screening alergia completo','Laboratorio',136.36,0,365),(56,'Screening alergia alimentario','Laboratorio',70.25,0,365),(57,'Screening alergia ambiental','Laboratorio',82.645,0,365),(59,'Vacuna dirofilaria 0-10kg','Vacuna',41.32,0,365),(60,'Vacuna dirofilaria 10-20kg','Vacuna',45.45,0,365),(61,'Vacuna dirofilaria 20-30kg','Vacuna',49.59,0,365),(62,'Vacuna dirofilaria 30-40kg','Vacuna',53.72,0,365),(63,'Vacuna dirofilaria >40kg','Vacuna',57.85,0,365),(65,'Collar antiparasitario Seresto Grande','Antiparasitario',37.19,6,365),(66,'Collar Seresto pequeño','Antiparasitario',33.6,0,365),(67,'Canitenol BT 50','Antiparasitario',2.47,0,365),(68,'Vacuna dirofilaria 0-10kg + TEST','Vacuna + test',66.11,0,365),(69,'Vacuna dirofilaria 10-20kg + TEST','Vacuna + test',70.25,0,365),(70,'Vacuna dirofilaria 20-30kg + TEST','Vacuna + test',74.38,0,365),(71,'Vacuna dirofilaria 30-40kg + TEST','Vacuna + test',78.51,0,365),(72,'Vacuna dirofilaria >40kg + TEST','Vacuna + test',82.64,0,365),(73,'Vacuna pentavalente perro','Vacuna + test',20.66,0,365),(74,'OQD Gato','Cirugia',90.91,0,365),(76,'OQD Perro','Cirugia',148.76,0,365),(77,'OVH Gata','Cirugia',198.35,0,365),(78,'OVH Perra 0-10 Kg','Cirugia',198.347,0,365),(79,'OVH Perra >40kg','Cirugia',297.52,0,365),(80,'Consulta a domiclio','Consulta',20.66,0,365),(81,'Global FAST','Diagnostico por imagen',33.06,0,365),(82,'AFAST','Diagnostico por imagen',16.52,0,365),(83,'TFAST & VETBLUE','Diagnostico por imagen',16.52,0,365),(84,'Radiografia','Diagnostico por imagen',37.19,0,365),(85,'Estudio radiográfico (hasta 4 proyecciones)','Diagnostico por imagen',82.64,0,365),(86,'Desplazamiento Zona A','Consulta',4.132,0,365),(87,'Desplazamiento Zona B','Consulta',8.26,0,365),(88,'OVH Perra 10-20 Kg','Cirugia',223.14,0,365),(89,'OVH Perra 20-30 Kg','Cirugia',239.67,0,365),(90,'OVH Perra 30-40 Kg','Cirugia',272.73,0,365),(91,'Consulta de urgencias a domiclio','Consulta',82.64,0,365),(92,'Eutanasia a domicilio 0-10kg','Eutanasia',78.51,0,365),(93,'Eutanasia a domicilio 10-20kg','Eutanasia',86.78,0,365),(94,'Eutanasia a domicilio >20kg','Eutanasia',99.17,0,365),(95,'Vacuna antirrábica','Cazadores',12.4,0,365),(96,'Vacuna antirrábica + Chip + Pasaporte','Cazadores',41.32,0,365),(97,'Vacuna bivalente perro','Cazadores',12.4,0,365),(98,'Vacuna pentavalente perro','Cazadores',12.4,0,365),(99,'Vacuna Leismania','Cazadores',37.19,0,365),(100,'Vacuna leishmania + Test','Cazadores',53.72,0,365),(101,'Vacuna dirofilaria + Test 0-10Kg','Cazadores',45.45,0,365),(102,'Vacuna dirofilaria + Test 10-20Kg','Cazadores',49.59,0,365),(103,'Vacuna dirofilaria + Test 20-30Kg','Cazadores',53.72,0,365),(104,'Vacuna dirofilaria + Test 30-40Kg','Cazadores',57.85,0,365),(105,'Vacuna dirofilaria + Test >40Kg','Cazadores',61.98,0,365),(106,'Vacuna dirofilaria 0-10Kg','Cazadores',28.92,0,365),(107,'Vacuna dirofilaria 10-20Kg','Cazadores',33.06,0,365),(108,'Vacuna dirofilaria 20-30Kg','Cazadores',37.19,0,365),(109,'Vacuna dirofilaria 30-40Kg','Cazadores',41.32,0,365),(110,'Vacuna dirofilaria >40Kg','Cazadores',45.45,0,365),(111,'Tratamiento antiparasitario interno y externo','Antiparasitario',24.79,0,365);
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `client_contacts`
--

DROP TABLE IF EXISTS `client_contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `client_contacts` (
  `client_contact_id` int(11) NOT NULL AUTO_INCREMENT,
  `client_id` int(11) DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  `client_contact_name` varchar(45) NOT NULL,
  `client_contact_tlf` varchar(15) DEFAULT NULL,
  `client_contact_email` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`client_contact_id`),
  UNIQUE KEY `client_contact_id_UNIQUE` (`client_contact_id`),
  KEY `contact_client_FK_idx` (`client_id`),
  KEY `contact_company_FK_idx` (`company_id`),
  CONSTRAINT `contact_client_FK` FOREIGN KEY (`client_id`) REFERENCES `clients` (`client_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `contact_company_FK` FOREIGN KEY (`company_id`) REFERENCES `companies` (`company_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client_contacts`
--

LOCK TABLES `client_contacts` WRITE;
/*!40000 ALTER TABLE `client_contacts` DISABLE KEYS */;
INSERT INTO `client_contacts` VALUES (2,1,NULL,'ANTONIO SEVILLA','633414452','sevillaurebaam@gmail.com'),(3,2,NULL,'JUAN PRIETO SANCHEZ','	641702367','	jpsurvival@hotmail.com'),(4,3,NULL,'ANTONIO','696 994 254',NULL),(5,4,NULL,'ROSALIA UREBA RUBIO','680751860','rursl3#gmail.com'),(6,5,NULL,'JUAN','687 428 964',NULL),(7,6,NULL,'CARMEN','697 838 651',NULL),(8,7,NULL,'-','-','-'),(9,8,NULL,'DIEGO','680 886 658','-'),(10,9,NULL,'JOSE ANTONIO VÁZQUEZ BOCANEGRA','636095669','joseantoniovaz63@gmailc.om'),(11,10,NULL,'ROSARIO DELGADO RAMOS','658565487','AASDFASD@GMAIL.COM'),(12,11,NULL,'ALBERTO SALADO FERNANDEZ','636520395','af4'),(13,12,NULL,'JOSE MANUEL','660757001','-'),(14,13,NULL,'FRENCISCO JOSE','692829363','-'),(15,14,NULL,'MANUELA','696 203 031','manipura6@hotmail.com'),(16,15,NULL,'AURELIO HERRERO DEL VALLE','687682166','poli@gmail.comcambiar'),(17,16,NULL,'PEDRO','666702748','pedroserrano76@gmail.com'),(18,17,NULL,'MARIA','608 90 62 56','C'),(19,18,NULL,'DEBORAH','693 664 855','debsolamente@gmail.com'),(20,19,NULL,'MARI CARMEN','677467351','carmencorrederagonzalez@gmail.com'),(21,20,NULL,' FERNANDA DA SILVA TIRES','691937420','quedapendiente@yahoo.es'),(22,21,NULL,'MANUEL','645 95 97 39','ferreteriapereasl@gmail.com'),(23,22,NULL,'MACARENA LOZANO FERGUSON','649337626','N'),(24,23,NULL,'FERNANDO','626985854','-'),(25,24,NULL,'LUIS','634 907 980','-'),(26,25,NULL,'ANA ','656941594','-'),(27,26,NULL,'ALBERTO','671 900 168','-'),(28,27,NULL,'BERTA','657992287','-'),(29,28,NULL,'JOSE','657249649','mijose_angel992@hotmail.com'),(30,29,NULL,'MANUEL MATEOS BOHORQUEZ','652640924','manuel_m95@hotmail.com');
/*!40000 ALTER TABLE `client_contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clients` (
  `client_id` int(11) NOT NULL AUTO_INCREMENT,
  `client_name` varchar(45) NOT NULL,
  `client_document` varchar(15) NOT NULL,
  `client_status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '0 => Baja, 1 => Activo',
  `client_dir` varchar(100) NOT NULL,
  `client_city` varchar(45) NOT NULL,
  `client_cp` int(11) NOT NULL,
  `client_prov` varchar(45) NOT NULL,
  `client_observations` mediumtext DEFAULT NULL,
  `client_registration` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`client_id`),
  UNIQUE KEY `idClients_UNIQUE` (`client_id`),
  UNIQUE KEY `client_document_UNIQUE` (`client_document`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (1,'ANTONIO SEVILLA UREBA','45329725z',1,'AVDA LOS MASTILES 8F','PUERTO DE SANTA MARIA',11500,'CADIZ',NULL,'2024-04-21 22:38:12'),(2,'JUAN PRIETO SANCHEZ','15437098G',1,'C/ LOS ALMENDROS 7, 24','VILLAMARTIN',11650,'Cadiz',NULL,'2024-04-23 14:11:09'),(3,'ANTONIO SANCHEZ MEGIAS','24128310E',1,'AVD. DEL HINOJO, 5','JEREZ DE LA FRONTERA',11407,'CADIZ',NULL,'2024-04-23 16:06:23'),(4,'ROSALIA UREBA RUBIO ','32026945C',1,'AVDA LOS MASTILES 8F','PUERTO DE SANTA MARIA',11500,'CADIZ',NULL,'2024-04-23 18:25:24'),(5,'JUAN JESUS','75866154X',1,'C/AMARGURA, 4-1ºA','JEREZ DE LA FRONTERA',11403,'CADIZ',NULL,'2024-04-24 12:31:55'),(6,'CARMEN MARQUEZ ALCON','31546377-Z',1,'C/BELGICA, 1 - BAJO G','JEREZ DE LA FRONTERA',11403,'CADIZ',NULL,'2024-04-24 12:50:17'),(7,'CUÑADA JUAN','-',1,'-','-',11408,'-','-','2024-04-24 13:20:53'),(8,'ANA FERRAL LOPEZ','32100595R',1,'PORVERA, 30','JEREZ DE LA FRONTERA',11403,'CADIZ','-','2024-04-25 11:11:47'),(9,'JOSE ANTONIO VÁZQUEZ BOCANEGRA','564562345',1,'AVDA SUDAMERICA EDF MEJICO 8E','JEREZ DE LA FRONTERA',11405,'CADIZ','13435','2024-04-25 11:44:29'),(10,'ROSARIO DELGADO RAMOS ','31664414S',1,'AVD NUESTRA SEÑORA DE LA PAZ, BLOQ2, PORTAL 4, 6A','JEREZ DE LA FRONTERA',11405,'CADIZ','79887J','2024-04-25 12:13:20'),(11,'ALBERTO SALADO FERNANDEZ','32093048K',1,'ag','JEREZ DE LA FRONTERA',11401,'CADIZ',NULL,'2024-04-30 12:28:20'),(12,'JOSE MANUEL GUERRO YUSTE','31645763V',1,'PARQUE ATLANTICO 7-9A','JEREZ DE LA FRONTERA',11406,'CADIZ',NULL,'2024-05-03 13:13:46'),(13,'FRANCISCO JOSE MEDINA FERNANDEZ','32082078E',1,'VIVALDI, 19','JEREZ DE LA FRONTERA',11406,'CADIZ',NULL,'2024-05-03 13:27:36'),(14,'MANUELA VARGAS MUÑOZ','31664832L',1,'-','JEREZ DE LA FRONTERA',0,'CADIZ',NULL,'2024-05-07 12:46:47'),(15,'AURELIO HERRERO DEL VALLE','75869600Y',1,'ERMITA DE CAULINA Nº 1 ','JEREZ DE LA FRONTERA',11405,'CADIZ',NULL,'2024-05-14 14:01:32'),(16,'PEDRO SERRANO ALBARRAN','31687049H',1,'C/ERMITA DE PALOMARES, 8','JEREZ DE LA FRONTERA',11405,'CADIZ',NULL,'2024-05-22 12:38:24'),(17,'MARIA TINAJERO REAL','32058809Y',1,'URB. ZAFER BL. 5 - 4ºA','JEREZ DE LA FRONTERA',11406,'CADIZ',NULL,'2024-05-27 12:03:08'),(18,'DEBORAH GIMENO MACIAS','31003786Q',1,'SANTA MARIA DE GRACIA, 9','JEREZ DE LA FRONTERA',11403,'CADIZ','-','2024-05-30 13:24:20'),(19,'MARI CARMEN CORREDERA GONZALEZ','31692204K',1,'C/ NORUEGA, 8','JEREZ DE LA FRONTERA',11408,'CADIZ',NULL,'2024-05-31 10:46:31'),(20,' FERNANDA DA SILVA TIRES','32966128K',1,'PLAZA QUILLOSO BLQ 9 1PLANTA 913','JEREZ DE LA FRONTERA',11405,'CADIZ',NULL,'2024-06-03 12:29:45'),(21,'MANUEL PEREA MEDIAVILLA','31729780S',1,'CALLE ESCORPIO, 3B','JEREZ DE LA FRONTERA',11406,'CADIZ',NULL,'2024-06-12 12:42:03'),(22,'ESPERANZA MACARENA LOZANO FERGUSON','32083278A',1,'AVDA ALCALDE ALVARO DOMECQ Nº4, 6ºG','JEREZ DE LA FRONTERA',11402,'CADIZ',NULL,'2024-06-12 23:27:36'),(23,'FERNANDO CANTADOR ARDILA','31702592J',1,'C/ SUCRE, 3','JEREZ DE LA FRONTERA',11407,'CADIZ',NULL,'2024-07-06 01:04:11'),(24,'LUIS GÓMEZ ROSA','31647371S',1,'BRDA. LAS TABLAS Nº 56 ','JEREZ DE LA FRONTERA',11408,'CADIZ',NULL,'2024-07-18 19:45:22'),(25,'ANA MARIA SUAREZ BARBA','31728041R',1,'BARRIADA LAS TABLAS 22','JEREZ DE LA FRONTERA',11408,'CADIZ',NULL,'2024-07-18 19:53:59'),(26,'ALBERTO AMAYA BRENES','49302317T',1,'PARCELAS DE ROCHE, CARRIL DE LOS FUGUILLA, Nº108','CONIL DE LA FRONTERA',11140,'CADIZ',NULL,'2024-07-18 20:13:12'),(27,'BERTA LOBO MORALES','49889868Q',1,'CAMARON DE LA ISLA BL 6 1ºB','JEREZ DE ÑA FRONTERA',11405,'CADIZ',NULL,'2024-07-19 08:10:00'),(28,'JOSE ANGEL CAMPOS ANDRADA','2',1,'bda la union, parcela 6, puerta 4,2º derecha','JEREZ DE LA FRONTERA',11407,'CADIZ',NULL,'2024-07-19 08:21:14'),(29,'MANUEL MATEOS BOHORQUEZ','32079230A',1,'C/ ZEUS Nº 17 ','JEREZ DE LA FRONTERA',11405,'CADIZ',NULL,'2024-07-29 14:17:57');
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `companies` (
  `company_id` int(11) NOT NULL AUTO_INCREMENT,
  `company_name` varchar(45) NOT NULL,
  `company_NIF` varchar(45) NOT NULL,
  PRIMARY KEY (`company_id`),
  UNIQUE KEY `company_NIF_UNIQUE` (`company_NIF`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies`
--

LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
/*!40000 ALTER TABLE `companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payments` (
  `payment_id` int(11) NOT NULL AUTO_INCREMENT,
  `payment_pet` int(11) DEFAULT NULL,
  `payment_company` int(11) DEFAULT NULL,
  `payment_type` enum('Efectivo','Tarjeta','Bizum','Transferencia') NOT NULL,
  `payment_pending` tinyint(4) NOT NULL DEFAULT 0,
  `payment_date` datetime NOT NULL,
  `payment_register` int(11) DEFAULT NULL,
  `payment_total` float DEFAULT 0,
  `payment_number` int(11) DEFAULT NULL,
  PRIMARY KEY (`payment_id`),
  UNIQUE KEY `payment_id_UNIQUE` (`payment_id`),
  UNIQUE KEY `payment_number_UNIQUE` (`payment_number`),
  KEY `payment_register_FK_idx` (`payment_register`),
  KEY `payment_pet_FK` (`payment_pet`),
  KEY `payment_company_FK` (`payment_company`),
  CONSTRAINT `payment_company_FK` FOREIGN KEY (`payment_company`) REFERENCES `companies` (`company_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `payment_pet_FK` FOREIGN KEY (`payment_pet`) REFERENCES `pets` (`pet_id`),
  CONSTRAINT `payment_register_FK` FOREIGN KEY (`payment_register`) REFERENCES `registers` (`register_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (1,2,NULL,'Tarjeta',0,'2024-04-23 14:11:15',1,90,NULL),(2,9,NULL,'Efectivo',0,'2024-04-24 13:08:49',1,25,NULL),(3,10,NULL,'Tarjeta',0,'2024-04-24 13:12:01',1,77.5,NULL),(4,11,NULL,'Efectivo',0,'2024-04-24 13:21:21',1,25,NULL),(5,12,NULL,'Tarjeta',0,'2024-04-25 11:14:27',1,25,NULL),(6,15,NULL,'Efectivo',0,'2024-04-30 13:40:22',1,25,NULL),(7,14,NULL,'Tarjeta',0,'2024-05-08 12:03:22',1,25,NULL),(8,19,NULL,'Tarjeta',0,'2024-05-14 14:03:47',1,5,NULL),(9,18,NULL,'Tarjeta',0,'2024-05-22 12:32:24',1,9.99,NULL),(10,20,NULL,'Tarjeta',0,'2024-05-22 12:48:01',1,25,NULL),(11,3,NULL,'Tarjeta',0,'2024-05-22 13:18:07',1,9.99,NULL),(12,12,NULL,'Efectivo',0,'2024-05-22 13:48:37',1,25,NULL),(13,21,NULL,'Tarjeta',0,'2024-05-27 11:03:22',1,99.99,224),(14,2,NULL,'Tarjeta',0,'2024-05-30 12:06:51',1,76.5,NULL),(15,3,NULL,'Efectivo',0,'2024-05-30 14:09:36',1,104.99,NULL),(16,22,NULL,'Tarjeta',0,'2024-05-30 14:10:43',1,20,324),(17,23,NULL,'Efectivo',0,'2024-05-31 11:21:00',1,20,NULL),(18,18,NULL,'Tarjeta',0,'2024-05-13 12:16:51',1,20,NULL),(19,11,NULL,'Tarjeta',0,'2024-05-14 12:20:51',1,70,NULL),(20,15,NULL,'Tarjeta',0,'2024-05-16 12:22:51',1,5,NULL),(21,24,NULL,'Tarjeta',0,'2024-05-23 12:30:51',1,14.99,NULL);
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments_articles`
--

DROP TABLE IF EXISTS `payments_articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payments_articles` (
  `payments_articles_id` int(11) NOT NULL AUTO_INCREMENT,
  `payments_id` int(11) NOT NULL,
  `articles_id` int(11) NOT NULL,
  `payments_articles_quantity` int(11) NOT NULL DEFAULT 1,
  `payments_articles_discount` float NOT NULL DEFAULT 0,
  `payments_articles_tax` float NOT NULL DEFAULT 21,
  PRIMARY KEY (`payments_articles_id`),
  KEY `payments_articles_payments_FK_idx` (`payments_id`),
  KEY `payments_articles_articles_FK_idx` (`articles_id`),
  CONSTRAINT `payments_articles_articles_FK` FOREIGN KEY (`articles_id`) REFERENCES `articles` (`article_id`),
  CONSTRAINT `payments_articles_payments_FK` FOREIGN KEY (`payments_id`) REFERENCES `payments` (`payment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments_articles`
--

LOCK TABLES `payments_articles` WRITE;
/*!40000 ALTER TABLE `payments_articles` DISABLE KEYS */;
INSERT INTO `payments_articles` VALUES (1,1,11,1,0,21),(2,2,5,1,0,21),(3,3,6,1,0,21),(4,3,67,1,50,21),(5,4,9,1,0,21),(6,5,9,1,0,21),(7,6,1,1,0,21),(8,6,12,1,0,21),(9,7,67,2,0,21),(10,7,1,1,0,21),(11,7,5,1,0,21),(12,8,12,1,0,21),(13,9,3,1,0,21),(14,10,9,1,0,21),(15,11,3,1,0,21),(16,12,9,1,0,21),(17,13,1,1,0,21),(18,13,19,1,0,21),(19,13,20,1,0,21),(20,13,12,1,0,21),(21,13,3,1,0,21),(22,14,70,1,15,21),(23,15,1,1,0,21),(24,15,22,1,0,21),(25,15,20,1,0,21),(26,15,3,1,0,21),(27,16,1,1,0,21),(28,17,1,1,0,21),(29,18,1,1,0,21),(30,19,6,1,0,21),(31,20,12,1,0,21),(32,21,3,1,0,21),(33,21,12,1,0,21);
/*!40000 ALTER TABLE `payments_articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pets`
--

DROP TABLE IF EXISTS `pets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pets` (
  `pet_id` int(11) NOT NULL AUTO_INCREMENT,
  `pet_name` varchar(15) NOT NULL,
  `pet_owner` int(11) NOT NULL,
  `pet_status` tinyint(1) NOT NULL DEFAULT 1,
  `pet_chip` bigint(20) DEFAULT NULL,
  `pet_sex` enum('M','F','O') NOT NULL,
  `pet_birthdate` date NOT NULL,
  `pet_species` varchar(15) NOT NULL,
  `pet_breed` varchar(45) DEFAULT NULL,
  `pet_sterilized` tinyint(1) NOT NULL,
  `pet_vet` int(11) DEFAULT NULL,
  `pet_observations` mediumtext DEFAULT NULL,
  `pet_clinical_observations` mediumtext DEFAULT NULL,
  `pet_registration` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`pet_id`),
  UNIQUE KEY `pets_id_UNIQUE` (`pet_id`),
  KEY `pet_owner_FK` (`pet_owner`),
  KEY `pet_vet_FK` (`pet_vet`),
  CONSTRAINT `pet_owner_FK` FOREIGN KEY (`pet_owner`) REFERENCES `clients` (`client_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pet_vet_FK` FOREIGN KEY (`pet_vet`) REFERENCES `sys_users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pets`
--

LOCK TABLES `pets` WRITE;
/*!40000 ALTER TABLE `pets` DISABLE KEYS */;
INSERT INTO `pets` VALUES (1,'BENITO',1,1,941000021436742,'M','2017-01-31','CANINA','PARSON RUSSELL TERRIER',0,1,NULL,NULL,'2024-04-21 22:38:12'),(2,'UMI',2,1,941010001499153,'F','2023-09-02','CANINA','BOYERO DE BERNA',0,1,NULL,NULL,'2024-04-23 14:11:09'),(3,'LINCOLN',3,1,380260170230820,'M','2023-05-02','Canina','CANE CORSO',0,2,NULL,NULL,'2024-04-23 16:06:23'),(4,'LEO',4,1,992000000762966,'M','2021-02-25','FELINA','COMUN EUROPEO',1,1,NULL,NULL,'2024-04-23 18:25:24'),(5,'CODY',4,1,981098102581225,'M','2009-12-09','CANINA','YORKSHIRE TERRIER',1,1,NULL,NULL,'2024-04-23 18:25:24'),(6,'SANDY',4,1,981098104554459,'F','2015-08-15','CANINA','YORKSHIRE TERRIER',1,1,NULL,NULL,'2024-04-23 18:25:24'),(7,'TAO',1,1,941000026970204,'M','2019-08-07','FELINA','COMUN EUROPEO',1,1,NULL,NULL,'2024-04-23 18:28:29'),(8,'AKELA',2,1,941000026429153,'M','2024-04-23','CANINA','HUSKY SIBERIANO',1,1,NULL,NULL,'2024-04-23 18:34:18'),(9,'BIMBO',5,1,941000028809259,'M','2023-12-12','CANINA','BICHON HABANERO',0,2,NULL,NULL,'2024-04-24 12:31:55'),(10,'LULÚ',6,1,992000003385984,'F','2023-04-15','CANINA','POMERANIA',0,2,NULL,NULL,'2024-04-24 12:50:17'),(11,'GINA',7,1,0,'F','2024-04-24','CANINA','BICHON MALTES',0,2,'-','-','2024-04-24 13:20:53'),(12,'COTO',8,1,9920000033859871,'M','2024-01-15','CANINA','LABRADOR RETRIEVER',0,2,'-','-','2024-04-25 11:11:47'),(13,'SANDY',9,1,2324245,'F','2014-04-25','CANINA','YORKSHIRE TERRIER',0,1,'2','2','2024-04-25 11:44:29'),(14,'PIQUÉ',10,1,1324876543634353,'M','2009-05-01','CANINA','MESTIZO',1,2,NULL,NULL,'2024-04-25 12:13:20'),(15,'MARIA',11,1,3233334,'F','2023-04-07','CANINA','PERRO DE AGUA ESPAÑOL',0,1,NULL,NULL,'2024-04-30 12:28:20'),(16,'LUNA',12,1,941010001440698,'F','2023-04-14','CANINA','SHITZU',1,1,NULL,NULL,'2024-05-03 13:13:46'),(17,'ROCCO',13,1,941000022004567,'M','2015-12-27','CANINA','BRETÓN ESPAÑOL',0,1,NULL,NULL,'2024-05-03 13:27:36'),(18,'TURQUESA',14,1,0,'F','2021-05-07','FELINA','SIAMES',1,1,NULL,NULL,'2024-05-07 12:46:47'),(19,'POLI ',15,1,941000017655064,'M','2015-03-07','CANINA','MESTIZO',1,1,NULL,NULL,'2024-05-14 14:01:32'),(20,'TEO',16,1,0,'M','2024-03-10','CANINA','GOLDEN RETRIEVER',0,2,NULL,NULL,'2024-05-22 12:38:24'),(21,'SHELDON',17,1,941010001460830,'M','2023-07-03','CANINA','GALGO ESPAÑOL',0,2,NULL,NULL,'2024-05-27 12:03:08'),(22,'ROMA',18,1,941000019528656,'F','2016-07-23','CANINA','CANICHE',1,1,'-','-','2024-05-30 13:24:20'),(23,'MILA',19,1,992000001939474,'F','2023-06-18','CANINA','YORKSHIRE TERRIER',0,2,'-','-','2024-05-31 10:46:31'),(24,'MILA',20,1,0,'F','2024-06-03','CANINA','BICHON MALTES',0,1,NULL,NULL,'2024-06-03 12:29:45'),(25,'SAMARA',21,1,992000003625941,'F','2024-02-02','CANINA','MASTÍN ESPAÑOL',0,1,NULL,NULL,'2024-06-12 12:42:03'),(26,'SAMIRA',21,1,992000003625940,'M','2024-02-02','CANINA','MASTÍN ESPAÑOL',0,2,NULL,NULL,'2024-06-12 12:43:38'),(27,'LIMA',22,1,941000021144173,'F','2017-01-09','CANINA','PASTOR ALEMÁN ',0,1,NULL,NULL,'2024-06-12 23:27:36'),(28,'AMY',23,1,941000026498459,'F','2021-01-10','CANINA','JACK RUSSELL',1,2,NULL,NULL,'2024-07-06 01:04:11'),(29,'THOR',24,1,941000027256689,'M','2022-02-24','CANINA','MASTÍN ESPAÑOL',0,2,NULL,NULL,'2024-07-18 19:45:22'),(30,'OLE - PISTACHO',25,1,941000027616401,'M','2022-05-21','CANINA','PASTOR BELGA MALINOIS',0,2,NULL,NULL,'2024-07-18 19:53:59'),(31,'GINA',25,1,0,'F','2024-05-01','CANINA','MESTIZO',0,2,NULL,NULL,'2024-07-18 20:01:47'),(32,'ZEUS',26,1,992000001911197,'M','2023-06-26','CANINA','BRACO ALEMÁN',0,2,NULL,NULL,'2024-07-18 20:13:12'),(33,'MIA',26,1,941000025848665,'F','2020-07-10','CANINA','MESTIZO',0,1,NULL,NULL,'2024-07-18 20:22:33'),(34,'LOLO',27,1,941000023883120,'M','2018-12-06','CANINA','MESTIZO',0,2,NULL,NULL,'2024-07-19 08:10:00'),(35,'FURIA DULF',28,1,941000025932792,'F','2020-08-25','CANINA','BRACO ALEMÁN',0,2,NULL,NULL,'2024-07-19 08:21:14'),(36,'PURO',29,1,941000021950477,'M','2017-10-16','CANINA','BRACO ALEMÁN',0,2,NULL,NULL,'2024-07-29 14:17:57');
/*!40000 ALTER TABLE `pets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registers`
--

DROP TABLE IF EXISTS `registers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `registers` (
  `register_id` int(11) NOT NULL AUTO_INCREMENT,
  `register_user` int(11) NOT NULL,
  `register_start_date` datetime NOT NULL,
  `register_end_date` datetime DEFAULT NULL,
  `register_initial_balance` decimal(10,2) NOT NULL,
  `register_in_cash` decimal(10,2) DEFAULT NULL,
  `register_out_cash` decimal(10,2) DEFAULT NULL,
  `register_discrepancy` decimal(10,2) DEFAULT NULL,
  `register_final_balance` decimal(10,2) DEFAULT NULL,
  `register_difference` decimal(10,2) DEFAULT NULL,
  `register_in_card` decimal(10,2) DEFAULT NULL,
  `register_out_card` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`register_id`),
  KEY `register_user_FK` (`register_user`),
  CONSTRAINT `register_user_FK` FOREIGN KEY (`register_user`) REFERENCES `sys_users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registers`
--

LOCK TABLES `registers` WRITE;
/*!40000 ALTER TABLE `registers` DISABLE KEYS */;
INSERT INTO `registers` VALUES (1,1,'2024-03-24 21:15:00','2024-03-24 10:15:00',0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00);
/*!40000 ALTER TABLE `registers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_users`
--

DROP TABLE IF EXISTS `sys_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sys_users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(45) NOT NULL,
  `user_email` varchar(45) NOT NULL,
  `user_tlf` varchar(15) NOT NULL,
  `user_document` varchar(15) NOT NULL,
  `user_state` tinyint(4) NOT NULL DEFAULT 1,
  `user_registration` datetime NOT NULL DEFAULT current_timestamp(),
  `user_password` varchar(45) NOT NULL,
  `user_photo` blob DEFAULT NULL,
  `user_full_name` varchar(45) NOT NULL DEFAULT '-',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_users`
--

LOCK TABLES `sys_users` WRITE;
/*!40000 ALTER TABLE `sys_users` DISABLE KEYS */;
INSERT INTO `sys_users` VALUES (1,'Tony','tony@gmail.com','123456789','12312312Y',1,'2024-03-14 13:03:32','password',NULL,'Antonio Sevilla Ureba'),(2,'Borja','borja@example.com','123456789','admin123',1,'2024-03-18 21:44:32','adminpassword',NULL,'Borja Ojeda Ariza');
/*!40000 ALTER TABLE `sys_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vaccinations`
--

DROP TABLE IF EXISTS `vaccinations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vaccinations` (
  `vaccination_id` int(11) NOT NULL AUTO_INCREMENT,
  `vaccination_article` int(11) NOT NULL,
  `vaccination_pet` int(11) NOT NULL,
  `vaccination_validity_period` int(11) DEFAULT 365,
  `vaccination_visit_applied` int(11) DEFAULT NULL,
  `vaccination_visit_planned` int(11) DEFAULT NULL,
  `vaccination_date` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`vaccination_id`),
  KEY `vaccination_article_FK_idx` (`vaccination_article`),
  KEY `vaccination_pet_FK_idx` (`vaccination_pet`),
  KEY `vaccination_visit_planned_FK_idx` (`vaccination_visit_planned`),
  KEY `vaccination_visit_applied_FK_idx` (`vaccination_visit_applied`),
  CONSTRAINT `vaccination_article_FK` FOREIGN KEY (`vaccination_article`) REFERENCES `articles` (`article_id`),
  CONSTRAINT `vaccination_pet_FK` FOREIGN KEY (`vaccination_pet`) REFERENCES `pets` (`pet_id`),
  CONSTRAINT `vaccination_visit_applied_FK` FOREIGN KEY (`vaccination_visit_applied`) REFERENCES `visits` (`visit_id`),
  CONSTRAINT `vaccination_visit_planned_FK` FOREIGN KEY (`vaccination_visit_planned`) REFERENCES `visits` (`visit_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vaccinations`
--

LOCK TABLES `vaccinations` WRITE;
/*!40000 ALTER TABLE `vaccinations` DISABLE KEYS */;
INSERT INTO `vaccinations` VALUES (1,10,2,365,4,NULL,'2024-04-23 22:51:59'),(2,5,9,365,5,NULL,'2024-04-24 12:32:04'),(3,9,11,14,7,NULL,'2024-04-24 12:27:52'),(4,9,26,15,32,NULL,'2024-06-12 10:46:04');
/*!40000 ALTER TABLE `vaccinations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visits`
--

DROP TABLE IF EXISTS `visits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `visits` (
  `visit_id` int(11) NOT NULL AUTO_INCREMENT,
  `visit_client` int(11) NOT NULL,
  `visit_pet` int(11) NOT NULL,
  `visit_date` datetime NOT NULL,
  `visit_vet` int(11) NOT NULL,
  `visit_actions` mediumtext DEFAULT NULL,
  `visit_weight` int(11) DEFAULT NULL,
  `visit_condition` int(11) DEFAULT NULL,
  `visit_temperature` float DEFAULT NULL,
  `visit_anam` mediumtext DEFAULT NULL,
  `visit_symptoms` mediumtext DEFAULT NULL,
  `visit_tests` mediumtext DEFAULT NULL,
  `visit_diagnostics` mediumtext DEFAULT NULL,
  `visit_treatment` mediumtext DEFAULT NULL,
  `visit_vaccines` mediumtext DEFAULT NULL,
  `visit_deworm` mediumtext DEFAULT NULL,
  `visit_recommendations` mediumtext DEFAULT NULL,
  `visit_completed` tinyint(4) NOT NULL DEFAULT 0,
  `visit_tests_diagnostics` mediumtext DEFAULT NULL,
  PRIMARY KEY (`visit_id`),
  KEY `visit_client_FK` (`visit_client`),
  KEY `visit_pet_FK` (`visit_pet`),
  KEY `visit_vet_FK` (`visit_vet`),
  CONSTRAINT `visit_client_FK` FOREIGN KEY (`visit_client`) REFERENCES `clients` (`client_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `visit_pet_FK` FOREIGN KEY (`visit_pet`) REFERENCES `pets` (`pet_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `visit_vet_FK` FOREIGN KEY (`visit_vet`) REFERENCES `sys_users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visits`
--

LOCK TABLES `visits` WRITE;
/*!40000 ALTER TABLE `visits` DISABLE KEYS */;
INSERT INTO `visits` VALUES (3,3,3,'2024-04-23 16:07:19',2,'BAÑO EN PELUQUERIA',NULL,NULL,NULL,'SE LLEVA 3 LATAS DE COMIDA  \"RICH IN RABBIT\"\nY UNA PIPETA',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(4,2,2,'2024-04-23 22:51:59',1,'Vacunacion leishmania + Test rapido',30,3,38.7,'Acude a consulta Umi, paciente canina boyera de berna de 1 año de edad. \n','En consulta, Umi se presenta alerta y activa.\n\nRealizamos examen físico y vemos mucosas rosadas y TRC<2\". Hidratación correcta. \n\nA la auscultación cardiorrespiratoria, escuchamos corazón y sonidos respiratorios aparentemente normales. \n\nA la palpación abdominal, encontramos abdomen depresible, sin signos de dolor.\nRealizamos palpación de la zona dorsolumbar, no habiendo signos de dolor ni molestia.','Realizamos test rápido de leishmania, resultando negativo.',NULL,NULL,'Vacunamos a Umi contra la leishmaniosis',NULL,NULL,1,NULL),(5,5,9,'2024-04-24 12:32:04',1,'VACUNACION RABIA',2,3,NULL,'Acude a consulta Bimbo, para ponerse la primera vacunación de la rabia','En consulta, Bimbo se presenta alerta y activo. \nRealizamos examen físico y vemos mucosas rosadas y TRC<2\".\nA la auscultación cardiorrespiratoria, escuchamos corazón y sonidos respiratorios aparentemente normales. \nA la palpación abdominal, encontramos abdomen depresible, sin dolor. \nRealizamos palpación de la zona dorsolumbar, sin encontrar signos de dolor o molestia.\nRealizamos examen propioceptivo, siendo satisfactorio en todas las extremidades.  ',NULL,NULL,'Administramos vacunación antirrábica',NULL,NULL,NULL,1,NULL),(6,6,10,'2024-04-24 12:50:17',2,'RABIA+CHIP+PASAPORTE',5,3,38.4,'Acude a consulta Lulú','En consulta, Lulú se presenta alerta y activa. \nRealizamos exploración física y vemos mucosas rosadas y TRC<2\".\nA la auscultación cardiorrespiratoria escuchamos corazón y sonidos respiratorios aparentemente normales. \nA la palpación abdominal, encontramos abdomen depresible, sin signos de dolor, ni molestia. \nRealizamos palpación de la zona dorsolumbar, sin haber signos de dolor o molestia.\nRealizamos examene propioceptivo, resultando satisfactorio en todas las extremidades. ',NULL,NULL,'Aplicamos vacunación antirrábica y colocamos microchip.\nAdministramos praziquantel.','Rabia',NULL,NULL,1,NULL),(7,7,11,'2024-04-24 12:27:52',1,'VACUNANCION TETRAVALENTE 1ª DOSIS',2,3,38.2,'La paciente acude a consulta para proseguir con su plan vacunal','Examen fisico sin alteraciones reseñables. Constantes dentro de rangos fisiologicos. ',NULL,NULL,NULL,'TETRAVALENTE 1ª DOSIS',NULL,'Acordamos con la tutora que acuda dentro de dos semanas para continuar con su plan vacunal',1,NULL),(8,9,13,'2024-04-29 12:00:42',1,'REVISION BUCAL',NULL,NULL,NULL,'El cliente no se presenta porque se le ha olvidado. \nComenta que ya llamara mas tarde',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(9,10,14,'2024-05-07 15:45:20',2,'VACUNACION ANTIRRABICA',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(10,2,2,'2024-05-23 11:30:57',1,'Vacuna dirofilaria + TEST',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(11,6,10,'2024-04-24 11:56:50',1,'Control vacunal + Alta de microchip',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(12,11,15,'2024-04-30 12:28:19',1,'Tuvo ayer cita en peluquería y observan bulto. Aconsejan revisión por parte del veterinario',16,3,NULL,NULL,'La paciente se presenta en consulta con un estado mental alerta. \n\nMucosas rosadas con un TRC de 2\". Auscultación cardiopulmonar APN.\n\nEn el examen físico, apreciamos pequeño\neccema de 1cm de diámetro en región interna de axila izquierda. \nA la manipulación, expulsa pequeño contenido de pus. ',NULL,'Absceso en cara interna de axila izquierda','Procedemos por tanto a rasurar la zona y a administrar amoxicilina. \n\nFacilitamos al tutor prescripción para que continúe el tratamiento 5-6 días mas.\n\nRecomendamos que limpien bien la zona al menos 3 veces al día con agua con jabón y posteriormente aplicar clorhexidina.',NULL,NULL,NULL,1,NULL),(13,12,16,'2024-05-02 12:19:29',1,'SE RASCA MUCHO',NULL,3,38.4,'ACUDE DEBIDO A QUE ÚLTIMAMENTE SE RASCA MUCHO LA ZONA DEL CUARTO TRASERO. \nNOS COMENTAN QUE COME PIENSO DE CACHORRO Y PIENSO DE ADULTO.\nADEMÁS, LE DAN 4 TIPOS DE CHUCHERÍA Y VARIOS TIPOS DE PATÉ.','SE MUESTRA ALERTA Y ACTIVA EN CONUSLTA. \nREALIZAMOS EXAMEN FÍSICO Y VEMOS MUCOSAS ROSADAS Y TRC<2\". HIDRATACIÓN OK.\nA LA AUSCULTACIÓN CARDIORRESPIRATORIA, ESCUCHAMOS CORAZÓN Y SONIDOS RESPIRATORIOS APARENTEMENTE NORMALES. \nA LA PALPACIÓN ABDOMINAL, ENCONTRAMOS ABOMEN DEPRESIBLE. \nNO PRESENTA ENROJECIMIENTO DE LA PIEL NI INFLAMACIÓN. TAMPOCO HAY RONCHAS O HERIDAS. \nESTORNUDA DOS VECES EN CONSULTA.',NULL,'\"SOSPECHA DE ALERGIA ALIMENTARIA O AMBIENTAL.','RECOMENDAMOS CAMBIAR YA A PIENSO ADULTO. ',NULL,NULL,NULL,1,'PROPONEMOS REALIZAR SCREENING ALÉRGICO, TANTO AMBIENTAL COMO ALIMENATARIO, PERO PREFIEREN IR VARIANDO LA COMIDA PARA VER SI AVERIGUAN SI ALÉRGICA A ALGÚN ALIMENTO. '),(14,13,17,'2024-05-03 12:31:51',1,'INFORMACION SOBRE BULTOS EN LA PATA Y EN LA LENGUA',20,3,38,'ACUDE YA QUE PIENSAN QUE PUEDE TENER ALERGIA, ADEMÁS PRESENTA UN BULTO EN LA EXTREMIDAD POSTERIOR IZQUIERDA Y OTRO EN LA ZONA IZQUIERDA DE LA LENGUA. \nUN VETERINARIO LES DIJO QUE PROBABLEMENTE TUVIERA HONGOS, PERO NO MEJORA CON EL TRATAMIENTO. ','SE MUESTRA ALERTA Y ACTIVO EN CONSULTA.\n\nREALIZAMOS EXAMEN FÍSICO Y VEMOS MUCOSAS ROSADAS Y TRC<2\".\n\nA LA AUSCULTACIÓN CARDIORRESPIRATORIA, ESCUCHAMOS CORAZÓN Y SONIDOS RESPIRATORIOS APARENTEMENTE NORMALES. \n\nA LA PALPACIÓN ABDOMINAL, ENCONTRAMOS ABDOMEN DEPRESIBLE.\n\nPRESENTA BULTO EN EXTREMIDAD POSTERIO IZQUIERDA, DE CONSISTENCIA FIRME Y NO ESTÁ FIJO AL HUESO NI A LA PIEL.\nASÍ MISMO, EN LA LENGUA PRESENTA UN ÉPULIS, EN LA ZONA LATERAL IZQUIERDA. ',NULL,NULL,NULL,NULL,NULL,NULL,1,'PROPONEMOS SCREENING DE ALERGIA, TANTO AMBIENTAL COMO ALIMENTARIO. \nRECOMENDAMOS PUNCIÓN DEL BULTO DE LA EPI PAR ADESCARTAR POSIBLE TUMOR. '),(15,14,18,'2024-05-13 11:00:47',1,'test leucemia y chequeo general',4,3,NULL,'La paciente se presenta antes de su cita ya que perciben que los síntomas se acentúan. \n\nEl motivo de consulta es que ha estado un tiempo perdiendo peso, además de presentar diferentes alopecias en región abdominal y en tercio posterior. \n\nAyer le administraron la pipeta y justo en la zona de administración ha presentado nuevamente una alopecia. ','La paciente se presenta en consulta con un estado mental alerta. Mucosas rosadas con un TRC de 2\". Auscultacion cardiopulmonar APN. \n\nEn el examen físico, apreciamos abdomen depresible sin signos aparentes de dolor. \nAdemás, cabe destacar presencia de alopecia en región inguinal y tal y como describen en región cervical, donde se administro previamente.','FIV/Felv Resultando negativo.',NULL,'Inicialmente para descartar proceso inmunomediado o infeccioso, administramos amoxicilina clavulánico y dexametasona. \n',NULL,NULL,'Prescribimos:\n-Amoxicilina clavulánico 50mg para que le administren 1 comprimido  cada 12 horas. durante 5-7 días. \n-Prednisolona  5 mg 1 comprimido cada 24 horas durante 5-7 días, la cual iremos valorando según evolución ir disminuyendo dosis progresivamente para evitar efectos secundarios.\n\nPor último, en caso de que la paciente no presente mejoría dentro de los días descritas previamente o incluso antes, se valorará continuar con el estudio del caso realizando mas pruebas complementarias para llegar a un tratamiento mas preciso. ',1,NULL),(16,15,19,'2024-05-14 13:01:32',1,'EN EL LAVADO DE HOY LE VEN EL OIDO MAL',40,NULL,NULL,NULL,NULL,NULL,NULL,'ANTIBIOTICO',NULL,NULL,'DARLE TRATAMIENTO UNOS DIAS Y VER SI FUNCIONA O NO, EN CASO CONTRARIO PROBAR CON CULTIVO',1,NULL),(17,3,3,'2024-05-22 13:00:07',2,'Bulto en el pie',45,3,38.4,'Acude ya que la semana pasada le salió un bulto en el pie. Nos comentan que es muy juguetón y muy bruto y no descartan un golpe. ','En consulta, Lincoln se presenta alerta y activo. \nRealizamos exploración física y vemos mucosas rosadas y TRC<2\". Pliegue cutáneo, ok.\nA la auscultación cardiorrespiratoria, escuchamos corazón y sonidos respiratorios aparentemente normales. \nAbdomen depresible.\nExamen propioceptivo,  ok.\nPresenta herida en la extremidad posterior derecha. No presenta cambios con respecto al tamaño, pero si la presenta enrojecida. ',NULL,NULL,'Administramos amoxoil retard y recetamos furacín y blastoestimulina.',NULL,NULL,NULL,1,NULL),(18,14,18,'2024-05-22 11:00:12',2,'revisión',3,2,38.3,'Acude a revisión Turquesa, la propietaria nos comenta que desde que ha estado tomando el antibiótico y el corticoide ha mejorado.','En consulta, Turquesa se muestra alerta y activa. Pliegue cutáneo ok.\nPresenta mucosas rosadas y TRC<2\".\nA la auscultación cardiorrespiratoria, escuchamos corazón y sonidos respiratorios aparentemente normales. \nAbdomen depresible. ',NULL,NULL,'Durante esta semana observaremos como evoluciona la paciente. La propietaria comenzará a darle acupuntura. ',NULL,NULL,NULL,1,NULL),(19,16,20,'2024-05-22 12:00:24',2,'vacunación',7,3,38.6,'Acude para que le administremos la 2ª vacuna',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(20,8,12,'2024-05-22 13:30:38',2,'vacunación tetravalente',12,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(21,16,20,'2024-06-05 13:57:57',2,'2ª tetravalente',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(22,8,12,'2024-06-03 10:30:59',2,'vacunacion rabia + microchip',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(24,17,21,'2024-05-27 09:30:46',2,'mordedura por otro perro',17,3,NULL,'Acude a consulta Sheldon, paciente canino de 1 año de edad. Su propietaria nos comenta que esta mañana estaba jugando en el parque con otro perro, cuando de pronto este le ha atacado y le ha mordido.','En consulta, Sheldon se muestra alerta y activo.\nRealizamos examen físico y vemos mucosas rosadas y TRC<2\".\nA la auscultación cardiorrespiratoria, escuchamos ligera taquicardia y sonidos respiratorios aparentemente normales. \nAdvertimos laceración por mordedura en costado izquierdo.','-','Laceración por mordedura en costado izquierdo','Administramos amoxicilina clavulánico y meloxicam.\nRasuramos la zona afectada y limpiamos y desinfectamos con suero fisiológico y clorhexidina. \nBajo sedación, suturamos la herida.',NULL,NULL,'Continuación de tratamiento antibiótico durante 4 días más.\nRevisión en 7 días.',1,'-'),(25,3,3,'2024-05-30 12:00:43',2,'Bulto en pie derecho',44,3,38,'Acude a consulta Lincoln. \nSu propietario nos comenta que lleva un par de semanas con un bulto en el pie. \nComenzó siendo pequeño, pero ha ido creciendo, has el punto de supurar sangre. ','En consulta, Lincoln se presenta alerta y activo.\nRealizamos examen físico y vemos mucosas rosadas y TRC<2\".\nA la auscultación cardiorrespiratoria, escuchamos corazón y sonidos respiratorios aparentemente normales. \nA la palpación abdominal, encontramos abdomen depresible, sin signos de dolor o molestia. \nApreciamos masa en extremidad posterior derecha, encontrándose localizada en la piel.',NULL,NULL,'Bajo sedación, rasuramos la zona y limpiamos con clorhexidina.\nExtirpamos la masa y aplicamos sutura simple.\nAdministramos amoxicilina-clavulánico. ',NULL,NULL,'Reposo y continuación de tratamiento antibiótico y antiinflamatorio.\nCuras 2 veces al día durante 5 días.\nRevisión la semana que viene',1,NULL),(26,18,22,'2024-05-30 13:24:23',2,'FISIOTERAPIA Y REHABILITACIÓN',4,2,38.4,'Acude a consulta Roma, paciente canina de casi 8 años de edad.\nSu tutora nos comenta que la adoptó hace poco más de un año de un criadero donde la usaban para la cría.\nRoma fue adoptada y presentaba amputada la extremidad posterior izquierda, pero no saben el motivo. \nAdemás, presenta balanceo del oso. Quedándose muchas veces caminado en círculos. \nDebido a esta lesión, Roma se cansa muy rápido cuando sale a pasear y la tutora debe cogerla en brazos. Además, cuando camina se va apoyando en el costado derecho para no caerse.','En consulta, Roma se presenta alerta y activa. \nRealizamos examen físico y vemos mucosas rosadas y TRC<2\".\nA la auscultación cardiorrespiratoria, escuchamos corazón y sonidos respiratorios aparentemente normales. \nA la palpación abdominal, encontramos abdomen depresible, sin signos de dolor o molestia. \nRealizamos palpación de la zona dorsolumbar, encontrando molestia a nivel lumbar, donde podemos apreciar atrofia grave de la musculatura.\nPalpamos la extremidad posterior derecha, encontrando fuerte contractura y dolor. \nRoma rehúsa mantener la estación, aprovechando para tumbarse cada vez que la dejamos. ',NULL,NULL,NULL,NULL,NULL,'Recomendamos realizar sesiones de fisioterapia y rehabilitación para eliminar las contracturas y fortalecer la zona, estimulando la musculatura para que pueda tener una calidad de vida digna.\nEl presupuesto sería de 200 euros por 5 sesiones. ',1,NULL),(27,19,23,'2024-05-31 10:46:34',2,'LUXACION DE ROTULA',2,3,38.4,'Acude a consulta Mila, paciente canina de 1 año de edad.\nSu propietaria nos comenta que ayer estaba jugando y de repente dejó la rodilla doblada y no quería apoyar la pata. \nFue a su veterinario habitual y le realizaron una radiografía, donde confirmaron la luxación de rótula. \nLe administraron meloxicam y le recomendaron tratamiento de 20 días.','En consulta, Mila se presenta alerta y activa. \nRealizamos examen físico y vemos mucosas rosadas y TRC<2\".\nA la auscultación cardiorrespiratoria, escuchamos corazón y sonidos respiratorios aparentemente normales. \nA la palpación abdominal, encontramos abdomen depresible, sin signos de dolor.\nPalpamos la rodilla afectada (izquierda), confirmando luxación de la rótula. La paciente no muestra signos de  molestia a la manipulación.\nPalpamos la rodilla derecha, sin haber signos de luxación o subluxación. ',NULL,'Luxación de rótula izquierda','Recomendamos continúe con tratamiento antiinflamatorio durante 3 días y acudan la semana que viene para comenzar sesiones de rehabilitación.',NULL,NULL,NULL,1,NULL),(28,7,11,'2024-05-14 12:17:16',1,'Rabia + chip + pasaporte',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(29,20,24,'2024-05-23 12:29:45',1,'OTITIS TRAS LAVADO EN SPA',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(30,16,20,'2024-06-20 17:35:56',1,'VACUNACION RABIA + MICROCHIP',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(31,21,25,'2024-06-12 10:43:49',2,'2º VACUNACIÓN PENTAVALENTE',NULL,NULL,NULL,'PONEMOS 2º PENTAVALENTE Y COLOCAMOS MICROCHIP',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(32,21,26,'2024-06-12 10:46:04',1,'2º VACUNA PENTAVALENTE + MICROCHIP',NULL,NULL,NULL,'PONEMOS 2º VACUNA PENTAVALENTE Y COLOCAMOS MICROCHIP',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(33,7,11,'2025-04-24 10:31:58',1,'Revacunacion rabia ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(34,22,27,'2024-07-04 17:30:59',1,'Vacuna rabia Pentavalente y Leishmania',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(35,21,26,'2024-07-01 00:54:08',2,'Vacuna Rabia',NULL,NULL,NULL,'Ponemos la vacuna de la rabia',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(36,21,25,'2024-07-01 00:56:18',2,'Vacuna rabia',NULL,NULL,NULL,'Ponemos vacuna de la rabia',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(37,23,28,'2024-07-05 10:05:21',2,'CASTRACIÓN',6,3,38.6,'Acude a consulta Amy, paciente canina de 3 años de edad. \nEl motivo es la esterilización de la paciente. ','Amy se presenta alerta y activa.\nRealizamos examen físico y vemos mucosas rosadas y TRC<2\".\nA la auscultación cardiorrespiratoria, escuchamos corazón y sonidos respiratorios aparentemente normales. \nA la palpación abdominal, encontramos abdomen depresible, sin signos de dolor o molestia. \nRealizamos examen propioceptivo, siendo satisfactorio en todas las extremidades.',NULL,'OVH','Previamente a la cirugía, administramos amoxoil retard y meloxicam.\nSedamos a la paciente con butorfanol, midazolam y dexmedetomidina. Inducimos anestesia con propofol y mantenemos con isofluorano y oxigenoterapia en máquina de anestesia con circuito cerrado ciclado pro volumen.\nRasuramos la zona abdominal y limpiamos y desinfectamos con clorhexidina y alcohol. \nSe realiza incisión por línea media y accedemos a cavidad abdominal, advirtiendo esplenomegalia, pero con coloración y aspecto normal.\nLocalizamos cuernos uterinos y procedemos a la extirpación.\nAdvertimos masa en cuerno uterino izquierdo (abriéndola postcirugía y resultando ser un quiste de pus).\nUna vez extraídos útero y ovarios, procedemos al cierre en capas de la cavidad abdominal con sutura absorbible. \nLa paciente se recupera. satisfactoriamente de la anestesia.',NULL,NULL,'Recomendamos medicación con amoxicilina clavulánico durante 5 días y meloxicam durante 4 días. ',0,NULL),(38,24,29,'2024-07-11 10:00:23',2,'VACUNACION',50,NULL,NULL,'VACUNAMOS DE RABIA ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(39,25,30,'2024-07-11 19:54:04',2,'VACUNACION RABIA',20,NULL,NULL,'VACUNACION DE RABIA',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(40,26,32,'2024-07-05 12:26:46',1,'bulto en lado izquierdo del cuello',33,3,38.5,'Acudimos a ver a Zeus, paciente canino de 1 año de edad. Su propietario nos comenta que presenta un bulto desde hace unas semanas. \nLo llevo al veterinario cuando le salió y le administraron y recetaron antibiótico, bajando la inflamación. \nPero acabado el tratamiento, ha vuelto a inflamarse. \nNos comentan, que estuvieron recolectando el trigo y haciendo pacas de paja, donde el perro se tiró y estuvo jugando.\nAl día siguiente comenzó la inflamación.','Zeus se presenta alerta y activo. \nRealizamos examen físico y vemos mucosas rosadas y TRC<2\".\nA la auscultación cardiorrespiratoria, escuchamos corazón y sonidos respiratorios aparentemente normales. \nApreciamos masa en zona submandibular izquierda, de consistencia dura. ',NULL,'Sospecha de presencia de espiga','Abrimos acceso y conseguimos drenar un poco de líquido.\nAdministramos amoxicilina-clavulánico',NULL,NULL,'Recetamos amoxicilina-clavulánico.\n',1,NULL),(41,26,32,'2024-07-10 20:27:32',2,'Bulto en el cuello',33,3,38.6,'Acudimos a revisión de la masa que presenta en el cuello','El paciente se presenta alerta y activo.\nRealizamos examen físico y apreciamos que la masa presenta consistencia más blanda que la vez anterior.',NULL,'Sospecha de espiga','Bajo sedación, rasuramos la zona afectada y limpiamos con clorhexidina.\nProcedemos a la colocación de drenaje penrose, para drenar contenido. Saliendo contenido seropurulento, con presencia de coágulos de sangre.',NULL,NULL,'Mantener drenaje limpio con clorhexidina diluida en suero fisiológico.\nContinuar con tratamiento antibiótico.',1,NULL),(42,26,32,'2024-07-15 12:27:32',2,'BULTO EN EL CUELLO',NULL,NULL,NULL,NULL,'Realizamos examen físico y vemos notoria mejoría con respecto al día en que colocamos el drenaje. ',NULL,'Sospecha de espiga','Realizamos lavados del drenaje con clorhexidina diluida en suero fisiológico.\nContinúa saliendo contenido seropurulento y pus con consistencia dura (probablemente resto de la cápsula que se formó).\nAdministramos dexametasona.',NULL,NULL,'Continuar con lavados y tratamiento antibiótico.',1,NULL),(43,26,32,'2024-07-18 12:27:32',2,'BULTO EN EL CUELLO',33,NULL,38.7,NULL,'Se presenta alerta y activo, con ganas de jugar.\nEl absceso ha disminuido considerablemente de tamaño hasta recuperar la normalidad casi por completo.\nDurante la exploración conseguimos ver la espiga y extraerla.',NULL,'Presencia de espiga','Realizamos lavado del drenaje.\nAdministramos dexametasona',NULL,NULL,'Continuar con lavados del drenaje y tratamiento antibiótico',1,NULL),(44,26,33,'2024-07-10 20:48:07',2,'Vacunación',NULL,NULL,NULL,'Vacunamos a la paciente de la rabia y pentavalente',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(45,27,34,'2024-07-18 16:30:03',2,'REACCIÓN DE HIPERSENSIBILIDAD',45,3,38.7,'Acudimos a visitar a Lolo ya que de repente se le ha empezado a hinchar la cara, sobre todo el lado derecho en la zona supraorbitaria, llegando a cerrársele el ojo.','Lolo se presenta alerta y activo, con buena respiración.\nRealizamos exploración física y vemos mucosas rosadas y TRC<2\". \nPresenta inflamación de la zona periorbitaria derecha, así como los belfos. \nA la auscultación cardiorrespiratoria, escuchamos sonidos cardíacos y respiratorios aparentemente normales. ',NULL,'Reacción de hipersensibilidad','Administramos dosis única de dexametasona.',NULL,NULL,'En caso de empeoramiento o que no haya evolución correcta, recomendamos que nos avisen para poner de nuevo medicación.',1,NULL),(46,28,35,'2024-07-18 08:37:58',2,'VACUNACIÓN ANTIRRÁBICA',18,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(47,7,11,'2025-07-29 14:11:54',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(48,7,11,'2025-07-29 14:11:54',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(49,21,26,'2025-07-29 14:11:54',1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(50,29,36,'2024-07-29 10:30:11',1,'GOTEA SANGRE AL ORINAR',31,3,38.8,'El  tutor comenta que ha estado estos dias muy nervisoso en casa, llegando incluso a tener dificultades para orinar y presentando la orina mas concentrada, incluso con pequeño goteo de sangre','El paciente se presenta con un estado mental alerta, muy excitado queriendo montar en consulta. \nMucosas rosadas con un TRC de 2\". Auscultación cardiopulmonar APN.\nEn el examen físico, presenta testículo APN, con abdomen distendido con signos de molestia. ',NULL,NULL,'Meloxicam y amoxicilina clavulánico durante 7 días.',NULL,NULL,'En caso de no presentar mejoría, se valorara realización de ecografía y en base a los hallazgos optar por como proceder a continuación. ',1,NULL);
/*!40000 ALTER TABLE `visits` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-08 14:12:37
