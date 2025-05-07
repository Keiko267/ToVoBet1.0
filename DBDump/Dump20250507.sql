CREATE DATABASE  IF NOT EXISTS `tobovet` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `tobovet`;
-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: tobovet
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
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
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articles` (
  `article_id` int NOT NULL AUTO_INCREMENT,
  `article_name` varchar(45) NOT NULL,
  `article_group` varchar(45) NOT NULL,
  `article_pvp` float NOT NULL,
  `article_stock` int NOT NULL,
  `article_validity_period` int DEFAULT (_utf8mb4'365'),
  `article_active` tinyint NOT NULL DEFAULT (_utf8mb4'1'),
  PRIMARY KEY (`article_id`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles`
--

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` VALUES (1,'Premium Dog Food','Food',10.99,100,365,0),(2,'Pain Relief Medicine','Vacuna',25.5,50,20,0),(3,'Interactive Dog Toy','Toys',5.75,75,365,1),(4,'Stylish Pet Collar','Accessories',18,30,365,0),(5,'Gentle Pet Grooming Brush','Grooming',8.99,60,365,1),(6,'Orthopedic Pet Bed','Bedding',25,25,15,1),(7,'Adjustable Dog Collar','Collars',7.5,45,365,1),(8,'Durable Dog Leash','Leashes',6.25,55,365,1),(9,'Natural Dog Treats','Treats',12.75,40,365,1),(11,'Organic Cat Food','Food',10.99,100,365,1),(12,'Vitamin Supplements for Pets','Vacuna',25.5,50,365,1),(13,'Catnip Filled Toy','Toys',5.75,75,365,1),(14,'Pet Bow Tie','Accessories',200.45,30,365,0),(15,'Shedding Blade for Dogs','Grooming',8.99,60,22,1),(16,'Soft Fleece Blanket for Pets','Bedding',20,25,365,1),(17,'Reflective Cat Collar','Collars',7.5,45,365,1),(18,'Retractable Dog Leash','Leashes',6.25,55,365,1),(19,'Rawhide Dog Chews','Treats',12.75,40,365,1),(20,'Pet Dental Chews','Healthcare',18.5,35,365,1),(21,'Grain-Free Puppy Food','Food',10.99,100,365,1),(22,'Anti-Anxiety Supplements for Pets','Vacuna',25.5,50,15,1),(23,'Chewable Dog Bone','Toys',5.75,75,365,1),(24,'Designer Pet Carrier','Accessories',15.25,30,365,0),(25,'Stainless Steel Pet Comb','Grooming',8.99,60,365,1),(26,'Elevated Pet Feeder','Bedding',250,25,365,1),(27,'Harness with Handle for Dogs','Collars',7.5,45,365,1),(28,'Waterproof Dog Collar','Leashes',6.25,55,365,1),(29,'Interactive Cat Treat Dispenser','Treats',12.75,40,365,1),(30,'Joint Support Supplements for Pets','Healthcare',22.385,35,365,1),(31,'Natural Rabbit Food','Food',10.99,100,365,1),(32,'Antibacterial Pet Shampoo','Vacuna',25.5,50,20,1),(33,'Squeaky Plush Dog Toy','Toys',5.75,75,365,1),(34,'Pet Travel Water Bottle','Accessories',15.25,30,365,1),(35,'Dog Training Clicker','Grooming',8.99,60,365,1),(36,'Cooling Gel Pet Mat','Bedding',20,25,365,1),(37,'LED Dog Leash','Collars',70.5,45,365,1),(38,'Chew-Proof Dog Harness','Leashes',6.25,55,365,1),(40,'Pet First Aid Kit','Healthcare',18.5,35,365,1),(41,'Consulta','Servicio',36,999,365,1),(42,'Toys','Toys',120,20,365,1),(59,'Test Vac 1','Vacuna',0,0,365,0),(62,'TestValidity','Food',20,10,10,1),(63,'Vacuna tetravalente perro','Vacuna',20.66,0,365,1),(65,'Intento nuevo ar','Food',12,2,365,0),(66,'Consulta','Real',25,99,365,1),(67,'Ecografia Abdominal','Real',50,99,365,1),(68,'Inyectable IM','Real',5,99,365,1),(69,'Prescripcion medicamento','Real',10,99,365,1),(70,'Abdominocentesis ecoguiada','Real',40,99,365,1),(71,'Canitenol BT 50','Real',3,99,365,1),(72,'Collar Seresto pequeño','Real',40,99,365,1),(73,'Revision','Real',10,99,365,1),(74,'Estudio radiográfico (hasta 4 proyecciones)','Real',100,99,365,1),(75,'Pain','Vacuna',25.5,40,20,1),(76,'CAMBIADO','Accessories',18,30,365,1),(77,'Designer Pet Carrier','Accessories',15,30,365,1),(78,'Test Vacuna 2','Vacuna',1,0,365,0),(79,'Test Vacuna 3','Vacuna',1.5,0,365,0),(80,'Test Vacuna 4','Vacuna',1.75,0,365,0),(81,'Test Vacuna 5','Vacuna',10.75,0,365,0),(82,'Test Vacuna 6','Vacuna',1.75,0,365,0),(83,'Test Vacuna 8','Vacuna',1,0,365,1),(84,'Nuevo Alimento','Food',120,2,365,0),(86,'Premium Dog Foods','Food',10.99,100,365,1);
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `client_contacts`
--

DROP TABLE IF EXISTS `client_contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client_contacts` (
  `client_contact_id` int NOT NULL AUTO_INCREMENT,
  `client_id` int DEFAULT NULL,
  `company_id` int DEFAULT NULL,
  `client_contact_name` varchar(45) DEFAULT NULL,
  `client_contact_tlf` varchar(20) DEFAULT NULL,
  `client_contact_email` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`client_contact_id`),
  UNIQUE KEY `client_contact_id_UNIQUE` (`client_contact_id`),
  KEY `contact_client_FK_idx` (`client_id`),
  KEY `contact_company_FK_idx` (`company_id`),
  CONSTRAINT `contact_client_FK` FOREIGN KEY (`client_id`) REFERENCES `clients` (`client_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `contact_company_FK` FOREIGN KEY (`company_id`) REFERENCES `companies` (`company_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Norm. Table for contacts (up to 3 per client). Polimorphic table to join either through client_id or through company_id';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client_contacts`
--

LOCK TABLES `client_contacts` WRITE;
/*!40000 ALTER TABLE `client_contacts` DISABLE KEYS */;
INSERT INTO `client_contacts` VALUES (1,1,NULL,'Main contact','987654321','contact1@example.com'),(2,3,NULL,'Alice Johnson - Contact 1','654987321','contact2@example.com'),(3,2,NULL,'Jane Smith - Contact 1','123456789','contact3@example.com'),(4,3,NULL,'Alice Johnson - Contact 2','111222333','contact4@example.com'),(5,4,NULL,'Bob Roberts - Contact 1','444555666','contact5@example.com'),(6,5,NULL,'Sarah Williams - Contact 1','777888999','contact6@example.com'),(7,6,NULL,'Michael Brown - Contact 1','111111222','contact7@example.com'),(8,7,NULL,'Emily Davis - Contact 1','333444555','contact8@example.com'),(9,8,NULL,'David Wilson - Contact 1','666777888','contact9@example.com'),(10,9,NULL,'Jessica Miller - Contact 1','999888777','contact10@example.com'),(11,10,NULL,'William Taylor - Contact 1','342423423','aa@example.com'),(12,1,NULL,'Second contact','3','a@a.a'),(14,11,NULL,'Test Contact 1','\"asdf\"','\"asdf\"'),(15,12,NULL,'Pedro','\"123\"','\"a@a.a\"'),(17,13,NULL,'Test Contact 2','2','a'),(18,14,NULL,'Test Contact 3','123','asd'),(19,15,NULL,'Test Contact 4','asd','asd'),(21,16,NULL,'Test Contact 5','asd','asd'),(22,17,NULL,'ALBERTO SALADO FERNANDEZ','636520395','AZXC'),(23,18,NULL,'Test Contact 6','1','a'),(24,NULL,1,'Mercadona Contact','123678','mercadona@mercadona.es'),(25,19,NULL,'Multiples mascotas','2345234234','dsefsef@hsd.com'),(26,10000,NULL,'Carlos de la Torre','661283459','carlosjdltm@gmail.com'),(29,10001,NULL,'Jairo','661284599','correo@test.com');
/*!40000 ALTER TABLE `client_contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients` (
  `client_id` int NOT NULL AUTO_INCREMENT,
  `client_name` varchar(45) NOT NULL,
  `client_document` varchar(15) NOT NULL,
  `client_status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '0 => Baja, 1 => Activo',
  `client_dir` varchar(100) NOT NULL,
  `client_city` varchar(45) NOT NULL,
  `client_cp` int NOT NULL,
  `client_prov` varchar(45) NOT NULL,
  `client_observations` mediumtext,
  `client_registration` datetime NOT NULL DEFAULT (now()),
  PRIMARY KEY (`client_id`),
  UNIQUE KEY `idClients_UNIQUE` (`client_id`),
  UNIQUE KEY `client_document_UNIQUE` (`client_document`)
) ENGINE=InnoDB AUTO_INCREMENT=10002 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Clients';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (1,'John Doe','12345678A',1,'123 Main St','Anytown',12345,'Some Province','Regular client','2024-03-18 21:33:11'),(2,'Jane Smith','87654321B',1,'456 Elm St','Othertown',54321,'Another Province','New client','2024-03-18 21:33:11'),(3,'Alice Johnson','11111111C',1,'789 Oak St','Smalltown',67890,'Different Province','Long-time client','2024-03-18 21:33:11'),(4,'Bob Roberts','22222222D',1,'321 Pine St','Villagetown',54321,'Same Province','Occasional client','2024-03-18 21:33:11'),(5,'Sarah Williams','33333333E',1,'654 Birch St','Countrytown',98765,'Far Province','Frequent client','2024-03-18 21:33:11'),(6,'Michael Brown','44444444F',1,'987 Maple St','Bigcity',54321,'Urban Province','Valued client','2024-03-18 21:33:11'),(7,'Emily Davis','55555555G',1,'159 Cedar St','Metropolis',23456,'Busy Province','New customer','2024-03-18 21:33:11'),(8,'David Wilson','66666666H',1,'357 Walnut St','Hometown',87654,'Home Province','Regular visitor','2024-03-18 21:33:11'),(9,'Jessica Miller','77777777I',1,'753 Pine St','Distantville',54321,'Remote Province','Loyal patron','2024-03-18 21:33:11'),(10,'William Taylor','88888888J',1,'852 Elm St','Nearbytown',12345,'Close Province','Veteran client','2024-03-18 21:33:11'),(11,'Test Client 1','TestDoc1',1,'\"asdf\"','\"asdf\"',1,'\"asdf\"','NULL','2024-04-18 17:52:38'),(12,'Pedro','TestDoc2',1,'\"a\"','\"b\"',11500,'\"c\"','NULL','2024-04-19 18:50:45'),(13,'Test','TestDoc3',1,'sdf','fsfdg',23423,'gdsfgds',NULL,'2024-04-19 23:28:32'),(14,'Test Client 2','TestDoc4',1,'asd','asd',123,'asd','test','2024-04-20 00:39:31'),(15,'Test Client 3','TestDoc5',1,'dsf','sdf',123,'asd',NULL,'2024-04-22 14:35:11'),(16,'Test Client 4','TestDoc6',1,'dsf','sdf',123,'asd',NULL,'2024-04-23 19:07:07'),(17,'ALBERTO SALADO FERNANDEZ','TestDoc7',1,'a','JEREZ DE LA FRONTERA',114010,'CADIZ',NULL,'2024-04-30 12:11:09'),(18,'Test Client 5','TestDoc8',1,'a','a',0,'a','a','2024-05-28 09:55:47'),(19,'Multiples mascotas','TestDoc9',1,'vxcfljnk','lknjlk',11500,'linl',NULL,'2025-01-14 18:31:28'),(9999,'Test','12345678B',1,'Calle Test','Test',12345,'Test','Test','2025-02-26 12:09:53'),(10000,'Carlos de la Torre','48980145Y',1,'C/ Calle 24, 1º A','El Puerto de Santa María',11500,'Cádiz','Desarrollador','2025-03-15 13:22:59'),(10001,'Jairo Iñiguez','42120046X',1,'Santa Fe','El Puerto de Santa María',11500,'Cádiz',NULL,'2025-04-25 12:20:06');
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `companies` (
  `company_id` int NOT NULL AUTO_INCREMENT,
  `company_name` varchar(45) NOT NULL,
  `company_NIF` varchar(45) NOT NULL,
  `company_address` varchar(105) NOT NULL,
  `company_city` varchar(45) NOT NULL,
  `company_provence` varchar(45) NOT NULL,
  `company_pc` varchar(45) NOT NULL,
  `company_country` varchar(45) NOT NULL,
  PRIMARY KEY (`company_id`),
  UNIQUE KEY `company_NIF_UNIQUE` (`company_NIF`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies`
--

LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
INSERT INTO `companies` VALUES (1,'Mercadona','123456789','Avenida Nuestra Señora del Sagrado Corazón de Jesús, 22','Jerez de la Frontera','Cádiz','11407','España'),(2,'Gaston y Gales S.L.','B56988512','Avenida Nuestra Señora del Sagrado Corazón de Jesús, 22','Jerez de la Frontera','Cádiz','11407','España'),(4,'Cambio de nombre','123456999','Avenida Sagrado Corazón de Jesús, 22','El Puerto de Santa María','Cádiz','11500','España');
/*!40000 ALTER TABLE `companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `payment_id` int NOT NULL AUTO_INCREMENT,
  `payment_pet` int DEFAULT NULL,
  `payment_company` int DEFAULT NULL,
  `payment_type` enum('Efectivo','Tarjeta','Bizum','Transferencia') NOT NULL,
  `payment_virtual` tinyint NOT NULL DEFAULT '0',
  `payment_pending` tinyint NOT NULL DEFAULT '0',
  `payment_date` datetime NOT NULL,
  `payment_register` int DEFAULT NULL,
  `payment_total` float DEFAULT '0',
  `payment_number` int DEFAULT NULL,
  PRIMARY KEY (`payment_id`),
  UNIQUE KEY `payment_id_UNIQUE` (`payment_id`),
  UNIQUE KEY `payment_number_UNIQUE` (`payment_number`),
  KEY `payment_register_FK_idx` (`payment_register`),
  KEY `payment_pet_FK` (`payment_pet`),
  KEY `payment_company_FK_idx` (`payment_company`),
  KEY `payment_date_INDEX` (`payment_date`),
  CONSTRAINT `payment_company_FK` FOREIGN KEY (`payment_company`) REFERENCES `companies` (`company_id`),
  CONSTRAINT `payment_pet_FK` FOREIGN KEY (`payment_pet`) REFERENCES `pets` (`pet_id`),
  CONSTRAINT `payment_register_FK` FOREIGN KEY (`payment_register`) REFERENCES `registers` (`register_id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Payments made\nPolimorphic table to join either through payment_company or through payment_pet';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (1,1,NULL,'Efectivo',0,0,'1970-01-01 00:00:00',NULL,0,NULL),(2,2,NULL,'Tarjeta',0,0,'1970-01-01 00:00:00',NULL,0,NULL),(3,3,NULL,'Bizum',0,0,'1970-01-01 00:00:00',NULL,0,NULL),(4,4,NULL,'Efectivo',0,0,'1970-01-01 00:00:00',NULL,0,NULL),(5,5,NULL,'Tarjeta',0,0,'1970-01-01 00:00:00',NULL,0,NULL),(6,6,NULL,'Efectivo',0,0,'1970-01-01 00:00:00',NULL,0,NULL),(7,7,NULL,'Tarjeta',0,0,'1970-01-01 00:00:00',NULL,0,NULL),(8,8,NULL,'Efectivo',0,0,'1970-01-01 00:00:00',NULL,0,NULL),(9,9,NULL,'Tarjeta',0,0,'1970-01-01 00:00:00',NULL,0,NULL),(10,10,NULL,'Bizum',0,0,'1970-01-01 00:00:00',NULL,0,NULL),(11,12,NULL,'Bizum',0,0,'1970-01-01 00:00:00',1,99.86,NULL),(12,2,NULL,'Tarjeta',0,0,'1970-01-01 00:00:00',NULL,0,NULL),(15,5,NULL,'Tarjeta',0,0,'1970-01-01 00:00:00',NULL,0,NULL),(17,30,NULL,'Tarjeta',0,0,'1970-01-01 00:00:00',NULL,0,NULL),(20,28,NULL,'Tarjeta',0,0,'2024-04-20 19:49:14',1,0,NULL),(22,28,NULL,'Tarjeta',0,0,'2024-04-20 19:49:14',1,0,NULL),(23,28,NULL,'Tarjeta',0,1,'2024-04-20 19:49:14',1,55.36,NULL),(24,28,NULL,'Tarjeta',0,0,'2024-10-11 10:48:18',1,142.76,NULL),(25,2,NULL,'Transferencia',0,0,'2024-04-20 20:06:10',1,0,NULL),(26,2,NULL,'Tarjeta',0,0,'2025-01-22 18:03:50',1,33.25,NULL),(27,9,NULL,'Tarjeta',0,0,'2024-04-20 23:18:05',1,20.68,NULL),(28,6,NULL,'Tarjeta',0,0,'2024-04-21 11:11:23',1,0,NULL),(30,4,NULL,'Tarjeta',0,0,'2024-04-21 11:28:54',1,92.26,NULL),(31,4,NULL,'Tarjeta',0,0,'2024-04-21 11:43:48',1,103.75,NULL),(32,8,NULL,'Tarjeta',0,0,'2024-04-21 12:05:06',1,0,NULL),(33,33,NULL,'Tarjeta',0,0,'2024-04-26 21:31:54',1,242,NULL),(34,33,NULL,'Tarjeta',0,0,'2024-04-27 12:52:18',1,55.36,NULL),(35,33,NULL,'Tarjeta',0,0,'2024-04-27 12:52:29',1,36.91,NULL),(36,33,NULL,'Tarjeta',0,0,'2024-04-27 12:56:40',1,36.91,124),(37,1,NULL,'Tarjeta',0,0,'2024-04-27 13:38:52',1,55.36,224),(38,35,NULL,'Tarjeta',0,0,'2024-05-28 11:12:35',1,55.36,324),(39,35,NULL,'Tarjeta',0,0,'2024-06-20 13:36:01',1,18.45,424),(40,35,NULL,'Tarjeta',0,0,'2024-10-09 21:50:16',1,92.26,524),(41,35,NULL,'Tarjeta',0,1,'2025-01-15 20:05:55',1,125,125),(42,37,NULL,'Tarjeta',0,0,'2025-01-16 16:25:44',1,80,225),(43,36,NULL,'Tarjeta',0,1,'2025-01-18 16:43:31',1,0,325),(44,34,NULL,'Tarjeta',0,0,'2025-01-22 18:09:44',1,20,425),(45,34,NULL,'Tarjeta',0,0,'2025-01-22 18:11:41',1,122,525),(46,34,NULL,'Tarjeta',0,0,'2025-01-22 18:16:33',1,21.45,625),(47,36,NULL,'Tarjeta',0,0,'2025-01-22 19:20:46',1,22.2,725),(48,12,NULL,'Tarjeta',0,0,'2025-01-21 19:40:43',1,9.25,825),(49,36,NULL,'Tarjeta',0,1,'2025-01-24 10:45:32',1,215.7,925),(50,30,NULL,'Tarjeta',0,0,'2025-01-27 18:25:46',1,12,1025),(51,30,NULL,'Tarjeta',0,0,'2025-01-27 18:27:25',1,120,1125),(52,30,NULL,'Tarjeta',1,0,'2025-01-27 18:27:25',1,0,NULL),(53,37,NULL,'Tarjeta',1,0,'2025-02-12 12:20:40',1,53.25,NULL),(54,39,NULL,'Tarjeta',0,0,'2025-04-24 13:41:08',1,32.28,1225),(55,39,NULL,'Tarjeta',0,0,'2025-04-25 12:23:07',1,27.28,1325);
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments_articles`
--

DROP TABLE IF EXISTS `payments_articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments_articles` (
  `payments_articles_id` int NOT NULL AUTO_INCREMENT,
  `payments_id` int NOT NULL,
  `articles_id` int NOT NULL,
  `payments_articles_quantity` int NOT NULL DEFAULT (_utf8mb4'1'),
  `payments_articles_discount` float NOT NULL DEFAULT (_utf8mb4'0'),
  `payments_articles_tax` float NOT NULL DEFAULT (_utf8mb4'21'),
  `payments_articles_pvp` float NOT NULL DEFAULT (_utf8mb4'0'),
  PRIMARY KEY (`payments_articles_id`),
  KEY `payments_articles_payments_FK_idx` (`payments_id`),
  KEY `payments_articles_articles_FK_idx` (`articles_id`),
  CONSTRAINT `payments_articles_articles_FK` FOREIGN KEY (`articles_id`) REFERENCES `articles` (`article_id`),
  CONSTRAINT `payments_articles_payments_FK` FOREIGN KEY (`payments_id`) REFERENCES `payments` (`payment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8893 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments_articles`
--

LOCK TABLES `payments_articles` WRITE;
/*!40000 ALTER TABLE `payments_articles` DISABLE KEYS */;
INSERT INTO `payments_articles` VALUES (2,11,3,2,0,21,0),(3,11,2,2,0,21,0),(4,20,24,1,0,21,0),(6,22,24,1,0,21,0),(10,25,24,2,0,21,0),(11,25,37,1,0,21,0),(12,25,37,4,0,21,0),(17,26,4,1,0,21,0),(18,11,36,1,0,21,109),(19,27,24,3,80.2,50,0),(20,28,34,1,0,21,110),(21,28,6,1,0,21,0),(22,28,14,1,0,21,0),(23,28,24,2,0,21,0),(28,30,34,1,0,21,0),(29,30,14,2,0,21,0),(30,30,24,2,0,21,0),(31,31,14,2,0,21,0),(32,31,4,1,0,21,0),(33,31,36,1,0,21,0),(34,31,16,1,0,21,0),(35,32,14,1,0,21,0),(36,32,24,1,0,21,0),(40,27,3,1,0,21,0),(41,33,62,10,0,21,0),(42,26,24,1,0,21,0),(43,34,24,1,0,21,0),(44,34,14,1,0,21,0),(45,34,34,1,0,21,0),(46,35,24,1,0,21,0),(47,35,14,1,0,21,0),(48,36,24,1,0,21,0),(49,36,34,1,0,21,0),(50,37,34,1,0,21,0),(51,37,24,1,0,21,0),(52,37,14,1,0,21,0),(53,38,14,2,0,21,0),(54,38,4,1,0,21,0),(63,39,14,1,0,21,0),(64,40,24,3,0,21,0),(65,40,4,1,0,21,0),(66,40,14,1,0,21,0),(67,24,4,3,0,21,0),(70,24,6,1,0,21,0),(71,24,14,1,0,21,0),(72,24,27,1,0,21,0),(73,24,21,1,0,21,0),(74,24,37,1,0,21,0),(75,24,31,1,0,21,0),(85,41,66,1,0,21,0),(87,41,74,1,58.3,21,0),(91,42,66,1,0,21,0),(92,42,67,1,0,21,0),(93,42,68,1,0,21,0),(94,44,59,1,0,21,0),(95,44,62,1,0,21,0),(96,45,78,2,0,21,0),(97,45,65,1,0,21,0),(98,46,79,2,0,21,1.5),(99,46,14,1,0,21,18.45),(100,47,14,1,0,21,20.45),(101,47,80,1,0,21,1.75),(103,48,82,1,0,21,1.75),(104,48,37,1,0,21,7.5),(105,49,14,1,0,21,0),(106,49,34,1,0,21,0),(107,50,65,1,0,21,12),(108,51,84,1,0,21,120),(109,53,76,1,0,21,18),(110,53,36,1,0,21,20),(111,53,34,1,0,21,15.25),(8888,1,1,1,0,21,0),(8889,54,86,2,10,21,10.99),(8890,54,28,2,0,21,6.25),(8891,55,86,2,10,21,10.99),(8892,55,7,1,0,21,7.5);
/*!40000 ALTER TABLE `payments_articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pet_tags`
--

DROP TABLE IF EXISTS `pet_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pet_tags` (
  `pet_tag_id` int NOT NULL AUTO_INCREMENT,
  `pet_tag_pet` int NOT NULL,
  `pet_tag_tag` int NOT NULL,
  `pet_tag_active` tinyint NOT NULL DEFAULT '1',
  `pet_tag_record` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`pet_tag_id`),
  KEY `pet_tag_tag_FK_idx` (`pet_tag_tag`),
  KEY `pet_tag_pet_FK` (`pet_tag_pet`),
  CONSTRAINT `pet_tag_pet_FK` FOREIGN KEY (`pet_tag_pet`) REFERENCES `pets` (`pet_id`),
  CONSTRAINT `pet_tag_tag_FK` FOREIGN KEY (`pet_tag_tag`) REFERENCES `tags` (`tag_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='N:N relation for pets/tags';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pet_tags`
--

LOCK TABLES `pet_tags` WRITE;
/*!40000 ALTER TABLE `pet_tags` DISABLE KEYS */;
INSERT INTO `pet_tags` VALUES (1,5,7,1,'2025-01-14 19:53:43'),(2,12,3,1,'2025-01-14 19:53:43'),(3,1,10,1,'2025-01-14 19:53:43'),(4,8,1,1,'2025-01-14 19:53:43'),(7,30,4,1,'2025-01-14 19:53:43'),(8,3,9,1,'2025-01-14 19:53:43'),(9,10,5,1,'2025-01-14 19:53:43'),(11,28,12,1,'2025-01-14 19:53:43'),(12,34,14,1,'2025-01-14 19:53:43'),(13,6,2,1,'2025-01-14 19:53:43'),(14,25,13,1,'2025-01-14 19:53:43'),(16,12,5,0,'2025-01-14 18:00:00');
/*!40000 ALTER TABLE `pet_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pets`
--

DROP TABLE IF EXISTS `pets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pets` (
  `pet_id` int NOT NULL AUTO_INCREMENT,
  `pet_name` varchar(15) NOT NULL,
  `pet_owner` int NOT NULL,
  `pet_status` tinyint(1) NOT NULL DEFAULT (1),
  `pet_chip` bigint NOT NULL,
  `pet_sex` enum('M','F','O') NOT NULL,
  `pet_birthdate` date NOT NULL,
  `pet_species` varchar(15) NOT NULL,
  `pet_breed` varchar(45) DEFAULT NULL,
  `pet_sterilized` tinyint(1) NOT NULL,
  `pet_vet` int DEFAULT NULL,
  `pet_observations` mediumtext,
  `pet_clinical_observations` mediumtext,
  `pet_registration` datetime NOT NULL DEFAULT (now()),
  PRIMARY KEY (`pet_id`),
  UNIQUE KEY `pets_id_UNIQUE` (`pet_id`),
  KEY `pet_owner_FK` (`pet_owner`),
  KEY `pet_vet_FK` (`pet_vet`),
  CONSTRAINT `pet_owner_FK` FOREIGN KEY (`pet_owner`) REFERENCES `clients` (`client_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pet_vet_FK` FOREIGN KEY (`pet_vet`) REFERENCES `sys_users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pets`
--

LOCK TABLES `pets` WRITE;
/*!40000 ALTER TABLE `pets` DISABLE KEYS */;
INSERT INTO `pets` VALUES (1,'Fluffy',1,1,789456,'F','2019-05-15','Cat','Persian',1,1,'aaa','test','2024-03-18 21:44:32'),(2,'Buddy',2,1,456123,'M','2020-02-20','Dog','Labrador',0,2,NULL,NULL,'2024-03-18 21:44:32'),(3,'Max',3,1,321987,'M','2018-10-10','Dog','German Shepherd',1,1,NULL,NULL,'2024-03-18 21:44:32'),(4,'Molly',4,1,654321,'F','2021-04-25','Dog','Golden Retriever',0,1,NULL,NULL,'2024-03-18 21:44:32'),(5,'Charlie',5,1,987654,'M','2020-08-08','Cat','Siamese',1,1,NULL,NULL,'2024-03-18 21:44:32'),(6,'Luna',6,1,123987,'F','2017-12-12','Dog','Poodle',0,2,NULL,NULL,'2024-03-18 21:44:32'),(7,'Rocky',7,1,951357,'M','2019-03-20','Dog','Boxer',1,1,NULL,NULL,'2024-03-18 21:44:32'),(8,'Lucy',8,1,369258,'F','2018-06-05','Cat','Maine Coon',0,2,NULL,NULL,'2024-03-18 21:44:32'),(9,'Bailey',9,1,147258,'F','2020-01-01','Dog','Beagle',1,2,NULL,NULL,'2024-03-18 21:44:32'),(10,'Oscar',10,1,987123,'M','2016-09-30','Cat','Bengal',0,1,NULL,NULL,'2024-03-18 21:44:32'),(11,'Julian',3,1,438731,'M','2016-09-29','Cat','Cat',1,2,NULL,NULL,'2024-03-18 21:44:32'),(12,'Rex',1,1,324234,'M','2024-04-17','Test','Pastor aleman',0,1,'ah',NULL,'2024-04-18 12:55:51'),(24,'Test Pet 1',11,1,11,'M','2020-02-02','Test','Test',0,1,NULL,NULL,'2024-04-18 17:52:38'),(25,'Pepe',12,1,123,'M','2017-04-18','Test','Test',0,1,NULL,NULL,'2024-04-19 18:50:45'),(26,'Test Pet 2',13,1,423423432,'M','2024-04-19','Test','Test',0,1,NULL,NULL,'2024-04-19 23:28:32'),(27,'Test Pet 3',13,1,423423,'M','2024-04-19','Test','Test',0,1,NULL,NULL,'2024-04-19 23:30:12'),(28,'Test Pet 4',14,1,123312312,'M','2024-04-20','Test','Test',0,1,NULL,NULL,'2024-04-20 00:39:31'),(29,'benito',15,1,312124908,'O','2024-04-22','Test','Test',0,1,'a','b','2024-04-22 14:35:12'),(30,'Doggo',7,1,234234,'O','2024-04-01','Test','Test',0,1,'asd','ads','2024-04-22 17:59:39'),(33,'Luna',16,1,312124908,'O','2024-04-22','FELINA','Test',0,1,'a','b','2024-04-23 19:07:07'),(34,'MARIA',17,1,985113005440536,'F','2024-04-30','CANINA','PERRO DE AGUA ESPAÑOL',0,2,NULL,NULL,'2024-04-30 12:11:09'),(35,'Test Pet 5',18,1,985113005440534,'F','2023-04-14','CANINA','PARSON RUSSELL TERRIER',0,1,'a','a','2024-05-28 09:55:47'),(36,'Test Pet 6',19,1,123123542023,'M','2025-01-14','Perro','Labrador',0,1,NULL,NULL,'2025-01-14 18:31:28'),(37,'Test Pet 7',19,1,1231235545323,'F','2025-01-14','Gato','Siames',0,1,NULL,NULL,'2025-01-14 18:31:28'),(38,'Margarita',9999,1,1234,'M','2021-01-01','Test',NULL,0,1,NULL,NULL,'2025-02-26 12:11:34'),(39,'Freud',10000,1,12234123,'M','2025-03-15','CANINA','Labrador',1,1,'Pelo corto',NULL,'2025-03-15 13:22:59'),(42,'Keko',10001,1,11120,'M','2023-04-16','CANINA',NULL,0,1,'Cruce de Chihuaha',NULL,'2025-04-25 12:20:06');
/*!40000 ALTER TABLE `pets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registers`
--

DROP TABLE IF EXISTS `registers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registers` (
  `register_id` int NOT NULL AUTO_INCREMENT,
  `register_user` int NOT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registers`
--

LOCK TABLES `registers` WRITE;
/*!40000 ALTER TABLE `registers` DISABLE KEYS */;
INSERT INTO `registers` VALUES (1,1,'2024-03-24 21:15:00','2024-03-24 10:15:00',0.00,0.00,0.00,0.00,0.00,0.00,901.00,0.00);
/*!40000 ALTER TABLE `registers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sys_users`
--

DROP TABLE IF EXISTS `sys_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sys_users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(45) NOT NULL,
  `user_email` varchar(45) NOT NULL,
  `user_tlf` varchar(15) NOT NULL,
  `user_document` varchar(15) NOT NULL,
  `user_state` tinyint NOT NULL DEFAULT '1',
  `user_registration` datetime NOT NULL DEFAULT (now()),
  `user_password` varchar(255) NOT NULL,
  `user_photo` blob,
  `user_full_name` varchar(45) NOT NULL DEFAULT '-',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='System users such as secretaries, vets, admins';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sys_users`
--

LOCK TABLES `sys_users` WRITE;
/*!40000 ALTER TABLE `sys_users` DISABLE KEYS */;
INSERT INTO `sys_users` VALUES (1,'Tony','tony@gmail.com','123456789','12312312Y',1,'2024-03-14 13:03:32','$2b$10$.9wvNMC6rD8ehSNZp4Nle.oKBKxq4ViEsDL3K52HYZ27kIw4Gnlxa',NULL,'Antonio Sevilla Ureba'),(2,'admin','admin@example.com','123456789','admin123',1,'2024-03-18 21:44:32','adminpassword',NULL,'Borja Ojeda Ariza'),(3,'vet1','vet1@example.com','987654321','vet123',1,'2024-03-18 21:44:32','vetpassword',NULL,'-'),(4,'vet2','vet2@example.com','111222333','vet456',1,'2024-03-18 21:44:32','vet2password',NULL,'-'),(5,'secretary1','secretary1@example.com','444555666','sec123',1,'2024-03-18 21:44:32','secpassword',NULL,'-'),(6,'secretary2','secretary2@example.com','777888999','sec456',1,'2024-03-18 21:44:32','sec2password',NULL,'-'),(7,'admin2','admin2@example.com','666777888','admin456',1,'2024-03-18 21:44:32','admin2password',NULL,'-'),(8,'vet3','vet3@example.com','333444555','vet789',1,'2024-03-18 21:44:32','vet3password',NULL,'-'),(9,'vet4','vet4@example.com','999888777','vet101112',1,'2024-03-18 21:44:32','vet4password',NULL,'-'),(10,'secretary3','secretary3@example.com','666555444','sec789',1,'2024-03-18 21:44:32','sec3password',NULL,'-'),(11,'admin3','admin3@example.com','111111222','admin789',1,'2024-03-18 21:44:32','admin3password',NULL,'-');
/*!40000 ALTER TABLE `sys_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tags` (
  `tag_id` int NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(45) NOT NULL,
  `tag_description` varchar(45) NOT NULL,
  PRIMARY KEY (`tag_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Tags to apply to client''s pets';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
INSERT INTO `tags` VALUES (1,'CCB','Plan de salud cachorro canino básico'),(2,'CCC','Plan de salud cachorro canino completo'),(3,'ACB','Plan de salud adulto canino básico'),(4,'ACC','Plan de salud adulto canino completo'),(5,'GCB','Plan de salud geriátrico canino básico'),(6,'GCC','Plan de salud geriátrico canino completo'),(7,'GCP','Plan de salud geriátrico canino premium'),(8,'CFB','Plan de salud cachorro felino básico'),(9,'CFC','Plan de salud cachorro felino completo'),(10,'AFB','Plan de salud adulto felino básico'),(11,'AFC','Plan de salud adulto felino completo'),(12,'GFB','Plan de salud geriátrico felino básico'),(13,'GFC','Plan de salud geriátrico felino completo'),(14,'GFP','Plan de salud geriátrico felino premium');
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vaccinations`
--

DROP TABLE IF EXISTS `vaccinations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vaccinations` (
  `vaccination_id` int NOT NULL AUTO_INCREMENT,
  `vaccination_article` int NOT NULL,
  `vaccination_pet` int NOT NULL,
  `vaccination_validity_period` int DEFAULT '365',
  `vaccination_next_article` int DEFAULT NULL,
  `vaccination_visit_applied` int DEFAULT NULL,
  `vaccination_visit_planned` int DEFAULT NULL,
  `vaccination_date` datetime DEFAULT NULL COMMENT 'Duplicated info in case the there''s no previous vaccine because the pet has one outside the system',
  PRIMARY KEY (`vaccination_id`),
  KEY `vaccination_article_FK_idx` (`vaccination_article`),
  KEY `vaccination_pet_FK_idx` (`vaccination_pet`),
  KEY `vaccination_visit_planned_FK_idx` (`vaccination_visit_planned`),
  KEY `vaccination_visit_applied_FK_idx` (`vaccination_visit_applied`),
  KEY `vaccination_next_article_FK` (`vaccination_next_article`),
  CONSTRAINT `vaccination_article_FK` FOREIGN KEY (`vaccination_article`) REFERENCES `articles` (`article_id`),
  CONSTRAINT `vaccination_next_article_FK` FOREIGN KEY (`vaccination_next_article`) REFERENCES `articles` (`article_id`),
  CONSTRAINT `vaccination_pet_FK` FOREIGN KEY (`vaccination_pet`) REFERENCES `pets` (`pet_id`),
  CONSTRAINT `vaccination_visit_applied_FK` FOREIGN KEY (`vaccination_visit_applied`) REFERENCES `visits` (`visit_id`),
  CONSTRAINT `vaccination_visit_planned_FK` FOREIGN KEY (`vaccination_visit_planned`) REFERENCES `visits` (`visit_id`)
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Pet vaccination ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vaccinations`
--

LOCK TABLES `vaccinations` WRITE;
/*!40000 ALTER TABLE `vaccinations` DISABLE KEYS */;
INSERT INTO `vaccinations` VALUES (1,2,9,20,2,NULL,NULL,NULL),(3,22,6,15,22,NULL,NULL,NULL),(4,32,6,20,32,38,NULL,'2024-04-21 12:02:08'),(5,12,2,365,12,32,NULL,'2024-04-19 23:50:31'),(7,2,5,20,2,5,105,'2024-03-18 21:44:32'),(8,2,1,20,2,NULL,NULL,NULL),(12,2,3,20,2,NULL,NULL,NULL),(13,12,9,365,12,31,NULL,'2024-04-17 23:30:00'),(16,2,8,20,2,NULL,NULL,NULL),(18,2,6,20,2,NULL,NULL,NULL),(19,32,24,20,32,41,NULL,'2024-04-23 17:13:16'),(20,2,24,365,2,41,NULL,'2024-04-23 17:13:16'),(23,59,1,365,59,40,NULL,'2024-04-22 17:13:16'),(24,2,1,33,2,33,NULL,'2024-04-20 00:08:05'),(25,12,1,365,12,33,NULL,'2024-04-20 00:08:05'),(37,32,6,365,32,64,NULL,'2024-05-02 12:53:22'),(38,59,6,365,59,64,NULL,'2024-05-02 12:53:22'),(48,2,34,20,2,83,103,'2024-05-20 16:20:12'),(49,22,34,15,22,83,103,'2024-05-20 16:20:12'),(50,59,34,15,59,83,104,'2024-05-20 16:20:12'),(53,12,35,10,12,85,99,'2024-05-28 11:12:51'),(54,59,35,365,59,87,NULL,'2024-10-09 18:24:25'),(55,63,35,365,63,87,NULL,'2024-10-09 18:24:25'),(58,12,35,365,12,99,NULL,'2025-01-14 19:30:41'),(61,2,34,20,2,103,NULL,'2025-01-18 17:04:16'),(62,22,34,15,22,103,NULL,'2025-01-18 17:04:16'),(63,59,34,365,59,104,NULL,'2025-01-18 17:04:16'),(64,2,5,20,2,105,NULL,'2025-01-22 18:02:40'),(65,59,37,10,59,112,NULL,'2025-02-11 20:12:44'),(66,2,39,20,NULL,121,NULL,'2025-03-15 15:00:09'),(67,12,39,365,NULL,121,NULL,'2025-03-15 15:00:09'),(78,2,42,2,NULL,138,NULL,'2025-04-25 12:30:06'),(79,32,42,20,NULL,138,NULL,'2025-04-25 12:30:06');
/*!40000 ALTER TABLE `vaccinations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visits`
--

DROP TABLE IF EXISTS `visits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visits` (
  `visit_id` int NOT NULL AUTO_INCREMENT,
  `visit_client` int NOT NULL,
  `visit_pet` int NOT NULL,
  `visit_date` datetime NOT NULL,
  `visit_vet` int NOT NULL,
  `visit_actions` mediumtext,
  `visit_weight` float DEFAULT NULL,
  `visit_condition` int DEFAULT '1',
  `visit_temperature` float DEFAULT NULL,
  `visit_anam` mediumtext,
  `visit_symptoms` mediumtext,
  `visit_tests` mediumtext,
  `visit_diagnostics` mediumtext,
  `visit_treatment` mediumtext,
  `visit_vaccines` mediumtext,
  `visit_deworm` mediumtext,
  `visit_recommendations` mediumtext,
  `visit_completed` tinyint NOT NULL DEFAULT '0',
  `visit_tests_diagnostics` mediumtext,
  PRIMARY KEY (`visit_id`),
  KEY `visit_client_FK` (`visit_client`),
  KEY `visit_pet_FK` (`visit_pet`),
  KEY `visit_vet_FK` (`visit_vet`),
  CONSTRAINT `visit_client_FK` FOREIGN KEY (`visit_client`) REFERENCES `clients` (`client_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `visit_pet_FK` FOREIGN KEY (`visit_pet`) REFERENCES `pets` (`pet_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `visit_vet_FK` FOREIGN KEY (`visit_vet`) REFERENCES `sys_users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=139 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visits`
--

LOCK TABLES `visits` WRITE;
/*!40000 ALTER TABLE `visits` DISABLE KEYS */;
INSERT INTO `visits` VALUES (1,1,1,'2024-03-18 20:00:00',2,'Routine checkup test',4,9,37.43,'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tincidunt nunc pulvinar sapien et ligula ullamcorper. Velit egestas dui id ornare arcu odio. Ullamcorper malesuada proin libero nunc consequat interdum. Vel pretium lectus quam id leo. Blandit cursus risus at ultrices mi tempus imperdiet nulla. Eu nisl nunc mi ipsum faucibus vitae aliquet nec. Facilisi morbi tempus iaculis urna. Ac tincidunt vitae semper quis lectus nulla. Laoreet sit amet cursus sit amet dictum sit. Venenatis lectus magna fringilla urna porttitor.','None','Blood tests','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tincidunt nunc pulvinar sapien et ligula ullamcorper. Velit egestas dui id ornare arcu odio. Ullamcorper malesuada proin libero nunc consequat interdum. Vel pretium lectus quam id leo. Blandit cursus risus at ultrices mi tempus imperdiet nulla. Eu nisl nunc mi ipsum faucibus vitae aliquet nec. Facilisi morbi tempus iaculis urna. Ac tincidunt vitae semper quis lectus nulla. Laoreet sit amet cursus sit amet dictum sit. Venenatis lectus magna fringilla urna porttitor.','None','Vaccination A','Deworming A','Prescribimos:\n-Amoxicilina clavulánico 50mg para que le administren 1 comprimido  cada 12 horas. durante 5-7 días. \n-Prednisolona  5 mg 1 comprimido cada 24 horas durante 5-7 días, la cual iremos valorando según evolución ir disminuyendo dosis progresivamente para evitar efectos secundarios.\n\nPor último, en caso de que la paciente no presente mejoría dentro de los días descritas previamente o incluso antes, se valorará continuar con el estudio del caso realizando mas pruebas complementarias para llegar a un tratamiento mas preciso. ',1,'a'),(2,2,2,'2024-03-18 21:44:32',2,'vaccination',NULL,2,NULL,NULL,NULL,NULL,NULL,NULL,'Vaccination B',NULL,NULL,1,NULL),(5,5,5,'2024-03-18 21:44:32',5,'Health check',5,3,36.9,'Low energy','Coughing','Blood test','Anemia','Iron supplements','Vaccination C','','Follow-up visit',1,NULL),(6,6,6,'2024-03-18 21:44:32',6,'Spaying procedure',21,4,NULL,'','','','','','','','Post-op care',1,NULL),(7,7,7,'2024-03-18 21:44:32',7,'Dental cleaning',16,9,38,'Bad breath','Tartar buildup','Dental exam','Gingivitis','Cleaning','','','Regular dental checkup',1,NULL),(8,8,8,'2024-03-18 21:44:32',8,'Behavioral consultation',9,7,37.5,'Aggressive tendencies','Destructive behavior','Behavioral assessment','Anxiety','Training','','','Behavioral training plan',1,NULL),(9,9,9,'2024-04-15 21:44:32',9,'Eye examination',8,6,NULL,'','Watery eyes','Eye test','Infection','Eye drops','','','Eye care regimen',1,NULL),(10,10,10,'2024-04-18 19:44:32',10,'Flea treatment',11,4,NULL,'Itching',NULL,'Skin scraping','Fleas','Topical treatment',NULL,'Deworming D',NULL,1,NULL),(31,9,9,'2025-12-02 23:30:00',1,'aaa',NULL,6,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(32,2,2,'2024-04-19 23:50:31',1,'aaaaaaaa',NULL,3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(33,1,1,'2024-04-20 00:08:05',1,'asasas',NULL,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(35,1,1,'2024-04-21 11:37:50',1,'Testing Buttonn',NULL,7,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(37,6,6,'2024-04-21 12:01:46',1,'Consulta',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(38,6,6,'2024-04-21 12:02:08',1,'consulta',NULL,6,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(39,6,6,'2024-04-21 12:02:34',1,'test',NULL,2,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(40,1,1,'2024-04-22 17:13:16',1,'test',NULL,7,NULL,'s',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'a'),(41,11,24,'2024-04-23 17:13:16',1,'Consulta',NULL,4,NULL,NULL,NULL,NULL,NULL,NULL,'[2,12,22]',NULL,NULL,0,NULL),(42,11,24,'2024-04-23 14:05:32',1,'a',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(44,16,33,'2024-05-08 11:37:51',1,'Esta primero',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(45,14,28,'2024-05-15 11:37:51',1,'Esta segunda',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(46,13,26,'2024-05-01 14:00:43',1,'Probando que funciona Facturas',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(47,12,25,'2024-05-01 18:00:43',1,'Esta segunda',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(48,17,34,'2024-05-02 12:53:22',1,'test',NULL,1,NULL,'sdfsdfsdf',NULL,NULL,'sdfsdf',NULL,NULL,NULL,NULL,0,NULL),(64,6,6,'2024-05-02 12:53:22',1,'Vacunas test varias',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(65,16,33,'2024-05-29 11:30:06',1,'Testing purposes',NULL,1,NULL,'asd\nasd\nasd\n',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(83,17,34,'2024-05-20 16:20:12',1,'vacunas',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(85,18,35,'2024-05-28 11:12:51',1,'URGENCIA POR MORDEDURA DE OTRO PERRO',15,3,39,'Paciente canino de raza Beagle, macho de 3 años de edad. Los tutores solicitan una consulta de urgencia a domicilio debido a un incidente donde Loki fue atacado por un perro de mayor tamaño. Aunque no presenta lesiones graves por el ataque, el paciente muestra heridas en el cuello y lesiones menores en el tercio posterior, además de cojera en la extremidad anterior izquierda (EAI), con escaso apoyo de la misma.','Loki presenta un estado mental alerta, aunque no permite realizar un examen físico completo debido a su temperamento. Se evidencia cojera en la EAI y heridas abiertas en el cuello, siendo una de mayor tamaño. Además, presenta pequeñas lesiones superficiales en el tercio posterior.',NULL,'Heridas por mordedura en el cuello, una de ellas de aproximadamente 3-4 cm de longitud y otra más pequeña, además de lesiones superficiales en el tercio posterior. Cojera en la EAI probablemente debido a traumatismo o sobreesfuerzo secundario al ataque.','Se procede al rasurado, limpieza y desinfección de todas las heridas, incluidas las superficiales.\nEn la herida de mayor tamaño, se aplica anestesia local y se colocan puntos de sutura simples junto con un drenaje para favorecer la eliminación de fluidos.\nAdministración de:\nAmoxicilina como cobertura antibiótica.\nMeloxicam como antiinflamatorio no esteroideo (AINE).\nCatosal para promover la regeneración tisular y la recuperación.\nTras el procedimiento, se administra el revertor de la sedación, observando una recuperación progresiva del paciente.\n',NULL,NULL,'Los tutores deben realizar limpieza diaria de las heridas con suero fisiológico y clorhexidina al menos dos veces al día.\nComprobar que el drenaje sigue funcionando correctamente y no se obstruya.\nSe acuerda una revisión general del paciente en 48 horas, donde se evaluará la evolución de las heridas y el estado general.\nEn caso de cualquier empeoramiento o signo de infección (enrojecimiento, calor, secreciones purulentas), los tutores deben ponerse en contacto inmediatamente para una nueva valoración.',1,'Se procede a la sedación del paciente para permitir una evaluación más precisa y el tratamiento de las heridas.\n\nA la exploración bajo sedación, se aprecian mucosas rosadas, con un TRC de 2 segundos, y la auscultación cardiopulmonar es normal (APN).\nEl abdomen es depresible y sin signos de dolor a la palpación.\nNo se encuentran lesiones aparentes en las extremidades tras manipularlas cuidadosamente.'),(86,18,35,'2024-10-07 21:48:44',1,'REVISION URGENCIA DEL FIN DE SEMANA',15,1,38.5,'Acudimos a la revisión de la urgencia del pasado sábado, donde el paciente fue atendido por heridas tras un ataque de otro perro. En esta ocasión, los tutores informan que Loki ha mejorado notablemente, ya que no presenta la misma cojera observada en la extremidad anterior izquierda (EAI) en la primera consulta.','A la exploración clínica, se requiere nuevamente la sedación del paciente para un manejo adecuado, dado su temperamento.',NULL,'Progresiva mejoría en la cicatrización de las heridas por mordedura, aunque sigue siendo necesario un manejo cuidadoso de las mismas para evitar complicaciones infecciosas. La cojera ha desaparecido o es mínima.','Se realiza la recolocación de un drenaje Penrose en la herida del cuello para optimizar el drenaje y permitir un mejor manejo en casa por parte de los tutores.\nSe administra complejo B y se le deja a los tutores una dosis de buprenorfina para administrarla transoral en caso de dolor.\n\nFacilitamos receta para amoxicilina-clavulánico, meloxicam, omeprazol y furacín.\nInsistimos en la importancia de iniciar el tratamiento hoy mismo, para prevenir infecciones secundarias. ',NULL,NULL,' Los tutores deben continuar con las curas diarias de las heridas utilizando suero fisiológico y clorhexidina, tal y como se les indicó en la consulta anterior.\nAdministrar la medicación oral pautada durante un período de 7 a 10 días, dependiendo de la evolución del caso.\nSe acuerda una nueva revisión para la próxima semana, momento en el cual se valorará la retirada del drenaje.\nEn caso de que el paciente presente alguna complicación (secreción anormal, hinchazón, fiebre) o cualquier duda, se recomienda contactar de inmediato para una nueva evaluación.\n\n\n\n',1,'Bajo sedación, se procede a una evaluación detallada:  Mucosas rosadas con un TRC de <2 segundos. Auscultación cardiopulmonar sin anomalías (APN). Las heridas muestran una mejoría evidente, aunque al realizar las curas, se observa una secreción sanguinolenta e inflamatoria típica del proceso traumático.'),(87,18,35,'2024-10-09 18:24:25',1,'CURAS Y MEDICACIÓN',NULL,1,NULL,'Hablamos vía telefónica con los propietarios de Loki. Nos comentan que el paciente se muestra apático y solo quiere comer pollo, rechazando el pienso. \nLe están haciendo las curas de la herida y administrando furacín como pueden, ya que según nos dicen, el paciente no se deja y tiene mucha fuerza. \nPor último, nos comentan que aún no han comprado la amoxcilina ni el meloxicam que recetamos el sábado, justo después de colocar el drenaje. ',NULL,NULL,NULL,NULL,NULL,NULL,'Insistimos en que deben conseguir la medicación a  la mayor brevedad posible y comenzar el tratamiento, para evitar infecciones secundarias y posteriores complicaciones. \n\nEl pronóstico es reservado hasta que se inicie el tratamiento antibiótico adecuado. Si los propietarios siguen las recomendaciones y no se desarrollan complicaciones infecciosas graves, se espera una evolución favorable en los próximos días.',1,NULL),(92,18,35,'2024-11-12 13:53:50',1,'a',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(93,18,35,'2028-11-12 13:53:50',1,'lejos',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(95,17,34,'2024-11-28 14:26:19',1,'Dificultad movimiento',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(99,18,35,'2025-01-14 19:30:41',1,'Prueba Siguiente Vacuna',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(100,17,34,'2025-01-14 19:30:41',1,'Prueba sin vacunas',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(101,19,37,'2025-01-15 20:15:31',1,'Consulta 1',38,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(103,17,34,'2025-01-18 17:04:16',1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(104,17,34,'2025-01-18 17:04:16',1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(105,5,5,'2025-01-22 18:02:40',1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(110,17,34,'2025-01-27 19:54:23',1,'Vac',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(111,7,30,'2025-01-28 19:59:36',1,'Matrix',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(112,19,37,'2025-02-11 20:12:44',1,'Patata',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(113,1,12,'2025-02-14 21:52:46',1,'Ninguno',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(114,1,12,'2025-02-12 21:53:20',1,'Ninguno',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(115,19,37,'2025-02-17 21:43:28',1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(116,19,37,'2025-02-17 21:43:36',1,NULL,NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(117,19,37,'2025-02-17 21:43:41',1,'dfgh',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(118,11,24,'2025-03-04 21:48:01',1,'no come',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(119,17,34,'2025-03-05 13:59:37',1,'pelos',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(120,10000,39,'2025-03-15 15:00:44',1,'No come',22,1,34,'lorem ipsum dolor',NULL,'Examen general',NULL,NULL,NULL,NULL,NULL,1,NULL),(121,10000,39,'2025-03-15 15:00:09',1,'Vomita',23,4,35,'lorem ipsum dolor',NULL,'Pruebas generales','Ecografía','Cambio de pienso',NULL,NULL,'No dar comida humana',1,NULL),(125,10000,39,'2025-04-22 09:41:39',1,'Se rasca',25,1,35,'lorem ipsum dolor',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL),(131,10000,39,'2025-04-28 12:40:46',1,'Revisión',NULL,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,NULL),(138,10001,42,'2025-04-25 12:30:06',1,'No come bien',25,1,23,NULL,NULL,NULL,'Parásito',NULL,NULL,NULL,NULL,1,NULL);
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

-- Dump completed on 2025-05-07 12:30:23
