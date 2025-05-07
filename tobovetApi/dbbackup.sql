-- MySQL dump 10.13  Distrib 8.1.0, for Win64 (x86_64)
--
-- Host: localhost    Database: tobovet
-- ------------------------------------------------------
-- Server version	8.1.0
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO,ANSI' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table "articles"
--

DROP TABLE IF EXISTS "articles";
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE "articles" (
  "article_id" int NOT NULL AUTO_INCREMENT,
  "article_name" varchar(45) NOT NULL,
  "article_group" varchar(45) NOT NULL,
  "article_pvp" float NOT NULL,
  "article_stock" int NOT NULL,
  PRIMARY KEY ("article_id")
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table "client_contacts"
--

DROP TABLE IF EXISTS "client_contacts";
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE "client_contacts" (
  "client_contact_id" int NOT NULL AUTO_INCREMENT,
  "client_id" int NOT NULL,
  "client_contact_name" varchar(45) NOT NULL,
  "client_contact_tlf" varchar(15) DEFAULT NULL,
  "client_contact_email" varchar(45) DEFAULT NULL,
  PRIMARY KEY ("client_contact_id"),
  UNIQUE KEY "client_contact_id_UNIQUE" ("client_contact_id"),
  KEY "contact_client_FK_idx" ("client_id"),
  CONSTRAINT "contact_client_FK" FOREIGN KEY ("client_id") REFERENCES "clients" ("client_id") ON DELETE CASCADE ON UPDATE CASCADE
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table "clients"
--

DROP TABLE IF EXISTS "clients";
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE "clients" (
  "client_id" int NOT NULL AUTO_INCREMENT,
  "client_name" varchar(45) NOT NULL,
  "client_document" varchar(15) NOT NULL,
  "client_status" tinyint(1) NOT NULL DEFAULT '1' COMMENT '0 => Baja, 1 => Activo',
  "client_dir" varchar(45) NOT NULL,
  "client_city" varchar(45) NOT NULL,
  "client_cp" int NOT NULL,
  "client_prov" varchar(45) NOT NULL,
  "client_observations" mediumtext,
  "client_registration" datetime NOT NULL DEFAULT (now()),
  PRIMARY KEY ("client_id"),
  UNIQUE KEY "idClients_UNIQUE" ("client_id"),
  UNIQUE KEY "client_document_UNIQUE" ("client_document")
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table "payments"
--

DROP TABLE IF EXISTS "payments";
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE "payments" (
  "payment_id" int NOT NULL AUTO_INCREMENT,
  "payment_client" int NOT NULL,
  "payment_type" enum('Efectivo','Tarjeta','Bizum','Transferencia') NOT NULL,
  "payment_pending" tinyint NOT NULL DEFAULT '0',
  "payment_date" datetime NOT NULL,
  "payment_register" int DEFAULT NULL,
  "payment_total" float DEFAULT '0',
  PRIMARY KEY ("payment_id"),
  UNIQUE KEY "payment_id_UNIQUE" ("payment_id"),
  KEY "payment_client_FK_idx" ("payment_client"),
  KEY "payment_register_FK_idx" ("payment_register"),
  CONSTRAINT "payment_client_FK" FOREIGN KEY ("payment_client") REFERENCES "clients" ("client_id"),
  CONSTRAINT "payment_register_FK" FOREIGN KEY ("payment_register") REFERENCES "registers" ("register_id")
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table "payments_articles"
--

DROP TABLE IF EXISTS "payments_articles";
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE "payments_articles" (
  "payments_articles_id" int NOT NULL AUTO_INCREMENT,
  "payments_id" int NOT NULL,
  "articles_id" int NOT NULL,
  "payments_articles_quantity" int NOT NULL DEFAULT '1',
  "payments_articles_discount" float NOT NULL DEFAULT '0',
  "payments_articles_tax" float NOT NULL DEFAULT '21',
  PRIMARY KEY ("payments_articles_id"),
  KEY "payments_articles_payments_FK_idx" ("payments_id"),
  KEY "payments_articles_articles_FK_idx" ("articles_id"),
  CONSTRAINT "payments_articles_articles_FK" FOREIGN KEY ("articles_id") REFERENCES "articles" ("article_id"),
  CONSTRAINT "payments_articles_payments_FK" FOREIGN KEY ("payments_id") REFERENCES "payments" ("payment_id")
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table "pets"
--

DROP TABLE IF EXISTS "pets";
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE "pets" (
  "pet_id" int NOT NULL AUTO_INCREMENT,
  "pet_name" varchar(15) NOT NULL,
  "pet_owner" int NOT NULL,
  "pet_nhc" int NOT NULL COMMENT '????',
  "pet_status" tinyint(1) NOT NULL DEFAULT (1),
  "pet_chip" int NOT NULL,
  "pet_sex" enum('M','F','O') NOT NULL,
  "pet_birthdate" date NOT NULL,
  "pet_species" varchar(15) NOT NULL,
  "pet_breed" varchar(45) DEFAULT NULL,
  "pet_sterilized" tinyint(1) NOT NULL,
  "pet_vet" int DEFAULT NULL,
  "pet_observations" mediumtext,
  "pet_clinical_observations" mediumtext,
  "pet_registration" datetime NOT NULL DEFAULT (now()),
  PRIMARY KEY ("pet_id"),
  UNIQUE KEY "pets_id_UNIQUE" ("pet_id"),
  UNIQUE KEY "pet_nhc_UNIQUE" ("pet_nhc"),
  KEY "pet_owner_FK" ("pet_owner"),
  KEY "pet_vet_FK" ("pet_vet"),
  CONSTRAINT "pet_owner_FK" FOREIGN KEY ("pet_owner") REFERENCES "clients" ("client_id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "pet_vet_FK" FOREIGN KEY ("pet_vet") REFERENCES "sys_users" ("user_id")
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table "registers"
--

DROP TABLE IF EXISTS "registers";
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE "registers" (
  "register_id" int NOT NULL AUTO_INCREMENT,
  "register_user" int NOT NULL,
  "register_start_date" datetime NOT NULL,
  "register_end_date" datetime DEFAULT NULL,
  "register_initial_balance" decimal(10,2) NOT NULL,
  "register_in_cash" decimal(10,2) DEFAULT NULL,
  "register_out_cash" decimal(10,2) DEFAULT NULL,
  "register_discrepancy" decimal(10,2) DEFAULT NULL,
  "register_final_balance" decimal(10,2) DEFAULT NULL,
  "register_difference" decimal(10,2) DEFAULT NULL,
  "register_in_card" decimal(10,2) DEFAULT NULL,
  "register_out_card" decimal(10,2) DEFAULT NULL,
  PRIMARY KEY ("register_id"),
  KEY "register_user_FK" ("register_user"),
  CONSTRAINT "register_user_FK" FOREIGN KEY ("register_user") REFERENCES "sys_users" ("user_id")
);
/*!40101 SET character_set_client = @saved_cs_client */;

-- Table structure for table "sys_users"
--

DROP TABLE IF EXISTS "sys_users";
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE "sys_users" (
  "user_id" int NOT NULL AUTO_INCREMENT,
  "user_name" varchar(45) NOT NULL,
  "user_email" varchar(45) NOT NULL,
  "user_tlf" varchar(15) NOT NULL,
  "user_document" varchar(15) NOT NULL,
  "user_state" tinyint NOT NULL DEFAULT '1',
  "user_registration" datetime NOT NULL DEFAULT (now()),
  "user_password" varchar(45) NOT NULL,
  "user_photo" blob,
  PRIMARY KEY ("user_id"),
  UNIQUE KEY "user_id_UNIQUE" ("user_id")
);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table "sys_users"
--

LOCK TABLES "sys_users" WRITE;
/*!40000 ALTER TABLE "sys_users" DISABLE KEYS */;
INSERT INTO "sys_users" VALUES (1,'Tony','tony@gmail.com','123456789','12312312Y',1,'2024-03-14 13:03:32','password',NULL),(2,'Borja','borja@example.com','123456789','admin123',1,'2024-03-18 21:44:32','adminpassword',NULL);
/*!40000 ALTER TABLE "sys_users" ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table "visits"
--

DROP TABLE IF EXISTS "visits";
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE "visits" (
  "visit_id" int NOT NULL AUTO_INCREMENT,
  "visit_client" int NOT NULL,
  "visit_pet" int NOT NULL,
  "visit_date" datetime NOT NULL,
  "visit_vet" int NOT NULL,
  "visit_actions" mediumtext,
  "visit_weight" int DEFAULT NULL,
  "visit_condition" mediumtext,
  "visit_temperature" float DEFAULT NULL,
  "visit_anam" mediumtext,
  "visit_symptoms" mediumtext,
  "visit_tests" mediumtext,
  "visit_diagnostics" mediumtext,
  "visit_treatment" mediumtext,
  "visit_vaccines" mediumtext,
  "visit_deworm" mediumtext,
  "visit_recommendations" mediumtext,
  "visit_completed" tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY ("visit_id"),
  KEY "visit_client_FK" ("visit_client"),
  KEY "visit_pet_FK" ("visit_pet"),
  KEY "visit_vet_FK" ("visit_vet"),
  CONSTRAINT "visit_client_FK" FOREIGN KEY ("visit_client") REFERENCES "clients" ("client_id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "visit_pet_FK" FOREIGN KEY ("visit_pet") REFERENCES "pets" ("pet_id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "visit_vet_FK" FOREIGN KEY ("visit_vet") REFERENCES "sys_users" ("user_id")
);
/*!40101 SET character_set_client = @saved_cs_client */;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-21 17:11:24
