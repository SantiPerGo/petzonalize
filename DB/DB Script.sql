-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: petzonalize
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `css_properties`
--

DROP TABLE IF EXISTS `css_properties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `css_properties` (
  `css_property_id` int NOT NULL AUTO_INCREMENT,
  `dog_top` varchar(10) NOT NULL,
  `dog_right` varchar(10) NOT NULL,
  `cat_top` varchar(10) NOT NULL,
  `cat_right` varchar(10) NOT NULL,
  PRIMARY KEY (`css_property_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `css_properties`
--

LOCK TABLES `css_properties` WRITE;
/*!40000 ALTER TABLE `css_properties` DISABLE KEYS */;
INSERT INTO `css_properties` VALUES (1,'17%','10%','27%','5%'),(2,'15%','15%','20%','5%'),(3,'25%','25%','25%','18%'),(4,'15%','30%','15%','25%'),(5,'20%','30%','25%','27%'),(6,'25%','30%','30%','30%');
/*!40000 ALTER TABLE `css_properties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customizables`
--

DROP TABLE IF EXISTS `customizables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customizables` (
  `customizable_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `category` varchar(20) NOT NULL,
  `type` varchar(20) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `imgUrl` varchar(150) NOT NULL,
  `stock` int DEFAULT NULL,
  `css_property_id` int DEFAULT NULL,
  PRIMARY KEY (`customizable_id`),
  KEY `fk_css_property_idx` (`css_property_id`),
  CONSTRAINT `fk_css_property` FOREIGN KEY (`css_property_id`) REFERENCES `css_properties` (`css_property_id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customizables`
--

LOCK TABLES `customizables` WRITE;
/*!40000 ALTER TABLE `customizables` DISABLE KEYS */;
INSERT INTO `customizables` VALUES (1,'Sombrero de Mariachi','custome-head','mariachi',234.99,'/assets/img/products/customizable/customizable-head-mariachi.png',30,1),(2,'Sombrero Color Rojo para el Frío','custome-head','cold',145.00,'/assets/img/products/customizable/customizable-head-cold-red.png',33,2),(3,'Traje de Tiburón','custome-body','shark',269.00,'/assets/img/products/customizable/customizable-body-shark-jacket.png',26,3),(4,'Traje con Jinete','custome-body','rider',249.29,'/assets/img/products/customizable/customizable-body-rider.png',27,4),(5,'Capa Roja','custome-body','cape',195.00,'/assets/img/products/customizable/customizable-body-cape.png',39,5),(6,'Caparazón de Tortuga','custome-body','turtle',224.00,'/assets/img/products/customizable/customizable-body-turtle-shell.png',30,6),(7,'Estampado de Círculos','pattern','circles',19.99,'/assets/img/products/customizable/customizable-pattern-circles.jpg',NULL,NULL),(8,'Estampado de Corazones','pattern','hearts',29.73,'/assets/img/products/customizable/customizable-pattern-hearts.png',NULL,NULL),(9,'Estampado de Tela','pattern','fabric',39.00,'/assets/img/products/customizable/customizable-pattern-fabric.jpg',NULL,NULL),(10,'Estampado de Cuadrados','pattern','squares',59.12,'/assets/img/products/customizable/customizable-pattern-squares.jpg',NULL,NULL);
/*!40000 ALTER TABLE `customizables` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_properties`
--

DROP TABLE IF EXISTS `product_properties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_properties` (
  `product_property_id` int NOT NULL AUTO_INCREMENT,
  `color` varchar(50) DEFAULT NULL,
  `size` varchar(50) DEFAULT NULL,
  `pattern` varchar(20) DEFAULT NULL,
  `material` varchar(20) DEFAULT NULL,
  `petname` varchar(100) DEFAULT NULL,
  `petphone` varchar(15) DEFAULT NULL,
  `shape` varchar(20) DEFAULT NULL,
  `body` varchar(50) DEFAULT NULL,
  `head` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`product_property_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_properties`
--

LOCK TABLES `product_properties` WRITE;
/*!40000 ALTER TABLE `product_properties` DISABLE KEYS */;
INSERT INTO `product_properties` VALUES (1,'hsla(237, 100%, 50%, 1)','Pequeño - 25 cm a 38 cm - 1.5 cm de ancho','circles','nylon',NULL,NULL,NULL,NULL,NULL),(2,'hsla(237, 100%, 50%, 1)','Mediano - 32 cm a 48 cm - 2 cm de ancho','circles','synthetic-leather',NULL,NULL,NULL,NULL,NULL),(3,'hsla(78, 100%, 50%, 1)','Pequeño - 250 ml','hearts','plastic','firulais',NULL,NULL,NULL,NULL),(4,'hsla(288, 100%, 50%, 1)','Mediano - 500 ml','fabric','ceramic','neko',NULL,NULL,NULL,NULL),(5,'hsla(342, 100%, 50%, 1)','Pequeño - 35 mm x 18 mm','paw',NULL,'circles','firulais','55123456',NULL,NULL),(6,'hsla(24, 100%, 50%, 1)','Pequeño - 35 mm x 18 mm','bone',NULL,'circles','cheems','55123456',NULL,NULL),(7,'hsla(173, 100%, 50%, 1)','Grande - 50 mm x 32 mm','circle-double',NULL,'circles','lomito','55123456',NULL,NULL),(8,'hsla(33, 100%, 50%, 1)','Pequeño - 35 mm x 18 mm','circles',NULL,'circles','max','55123456',NULL,NULL),(9,'hsla(193, 100%, 50%, 1)','Mediano - 38 mm x 25 mm','star',NULL,'circles','dog','55123456',NULL,NULL),(10,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'turtle','cold'),(11,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'shark','mariachi');
/*!40000 ALTER TABLE `product_properties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `category` varchar(20) NOT NULL,
  `customizable` int NOT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `imgUrl` varchar(150) NOT NULL,
  `stock` int DEFAULT NULL,
  `type` varchar(20) DEFAULT NULL,
  `product_property_id` int DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `fk_product_property_idx` (`product_property_id`),
  CONSTRAINT `fk_product_property` FOREIGN KEY (`product_property_id`) REFERENCES `product_properties` (`product_property_id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Hill\'s Adult Large Breed Lamb Meal & Brown Rice Recipe Alimento para perros','El alimento seco para perros Hill\'s Science Diet Large Breed Adult está especialmente formulado para satisfacer las necesidades energéticas de los perros de razas grandes durante la flor de su vida.\n\nDelicioso sabor a cordero para aquellos que prefieren la variedad y elaborado con ingredientes de alta calidad y fáciles de digerir. Fuentes naturales de glucosamina y condroitina para la salud de las articulaciones. Omega-6 y vitamina E para una piel y un pelaje hermosos. Proteína de alta calidad para músculos magros','food',0,4123.00,'/assets/img/products/not customizable/dog-food-hills-adult-large-breed.png',5,'dog',NULL),(2,'Flamingo Frisbee de Goma para Perros','Si quieres un juguete divertido y seguro para tu perro, este frisbee de goma es justo lo que estás buscando. Con él tu mascota podrá disfrutar jugando, realizando ejercicios de adiestramiento o practicando deporte. Este producto está fabricado con goma maciza natural, no tóxica, que, además, no hace daño al golpear.\n\nLos perros suelen coger los discos en el aire, antes de que caigan al suelo. Otros frisbee pueden dañarles la boca y dientes, ya que están hechos con materiales más duros o de peor calidad. Con este juguete, tu mascota no se hará daño, ya que está diseñado para masajear y cuidar de la dentadura de tu mejor amigo mientras lo muerde.\n\nEste frisbee de goma es un juguete muy divertido para tu perro que además viene en llamativos colores, rojo, verde o naranja. Pídelo ya y déjate sorprender por el color que te toque. ¡A tu mascota le encantará! ','toys',0,250.00,'/assets/img/products/not customizable/dog-toys-flamingo-rubber-frisbee.png',19,'dog',NULL),(3,'Hartz Groomer\'s Best Champú para Cachorros, aroma a jazmín','Fórmula suave y sin lágrimas especialmente formulada para la piel y el pelaje delicado de los cachorros sin ser agresiva ni secar. Incluye 18 onzas líquidas de champú extra suave con aroma a jazmín.\n\nAdecuado para todo tipo de pelaje, esta solución super espumosa es suave para la piel sensible y fácil de enjabonar para un pelaje completamente limpio que es suave y brillante. Hecho con ingredientes 100% seguros para mascotas.','cleaning',0,97.00,'/assets/img/products/not customizable/dog-cleaning-hartz-groomers-shampoo.png',269,'dog',NULL),(4,'Cepillo Deslanador Perros Grandes Furminator Pelo Largo','Furminator Deslanador para Perro Pelo Corto La herramienta patentada Deslanador para Perro Pelo Corto, elimina de forma fácil y rápida no corta sino que elimina la muda el pelo muerto y el subpelo que es el problema más común de los dueños de mascotas la muda y los problemas de alergia y limpieza que supone.\n\nEl cepillo de diseño único con su borde de acero inoxidable agarra el pelo suelto y lo elimina sin causar ningún daño en la piel. Ahora con una manera práctica y rápida de vaciar el pelo recogido por la hoja. El pelo lustroso de la mascota es un indicativo del cuidado excelente que el cepillo le proporciona.','cleaning',0,740.00,'assets/img/products/not customizable/dog-cleaning-furminator-shedding-tool.png',10,'dog',NULL),(5,'Fancy Pets Cojin/Cama para Cama de Plásico para Perro Tamaño Grande','Dale a su mascota el sueño reparador ya que es un factor clave para su inteligencia y longevidad. Su mascota se merece todo esto y con un cojín para cama grande fabricado con tela suave de alta calidad resistente al manejo cotidiano lo va a conseguir. Este cojín proporciona descanso y comodidad, previene la formación de callosidades y es totalmente lavable.','saupplies',0,292.53,'/assets/img/products/not customizable/dog-supplies-fancy-pets-plastic-bed.png',23,'dog',NULL),(6,'ZamiPet Skin, Coat & Nails','ZamiPet Skin, Coat & Nails son masticables para tu mascota de muy buen sabor que contienen Omega 6, Miel de Manuka, Prebiótico, MSM, Cúrcuma y Biotina para mantener la piel sana de su perro, además de promover un pelaje brillante y uñas fuertes.','health',0,800.00,'/assets/img/products/not customizable/dog-health-zamipet-vitamin-chews.png',16,'dog',NULL),(7,'Kit Cat Gatitos y Embarazadas (Crecimiento Sano) Alimento Seco para Gatos','Kit Cat alimento natural premium para gatos fue creado por nuestros nutricionistas que también son amantes de los gatos y elaborado con la bondad de ingredientes naturales cuidadosamente seleccionados que no contienen colorantes artificiales.\n\nAdemás, esta dieta contiene fructooligosacáridos que promueven un tracto digestivo más saludable y taurina para ojos saludables. Omega 3 y 6. Piel sana. Sin cerdo, sin manteca. Añadido Taurino. Prebiótico, Vitamina E ','food',0,185.89,'/assets/img/products/not customizable/cat-food-kit-cat-kitten-pregnant.png',25,'cat',NULL),(8,'Leaps & Bounds Pista con Pluma y Pelota con Luz Juguete para Gato, Rosa','¡Los gatitos inteligentes saben que pensar es muy divertido! La pista de Leaps & Bounds ofrece divertidos desafíos en la lucha por reflejos y la resolución de problemas, y permite que los gatos te impresionen con sus habilidades. La pelota se enciende y recorre la pista. Pluma en un resorte para llamar la atención de tu mejor amigo. Color rosa de material resistente.','toys',0,229.00,'/assets/img/products/not customizable/cat-toys-leaps-bounds-feather-ball.png',15,'cat',NULL),(9,'Cepillo para Gatos, Cepillo Slicker para Masaje de Mascotas y Limpieza Automática.','Remueve el pelo: remueve los pelos sueltos, largos, cortos, la suciedad y los enredos, ¡no más pelos en el suelo!\n\nFácil de limpiar: cuando hayas terminado de cepillar a tu mascota, simplemente presiona el botón y las cerdas se retraen de vuelta en el cepillo, haciendo que sea sencillo quitar el pelo del cepillo, para que esté listo para usar la próxima vez.','cleaning',0,254.00,'/assets/img/products/not customizable/cat-cleaning-slicker-brush.png',34,'cat',NULL),(10,'BIO GROOM Flea & Tick Shampoo para Gato','Flea & Tick es un concentrado de champú acondicionador que contiene PYRETHRINS para un control efectivo de pulgas, piojos y garrapatas. Los ingredientes derivados del aceite de coco en esta fórmula limpian suavemente, resaltan todos los colores y hacen que el blanco brille.\n\nLa proteína y la lanolina en este champú ayudan a acondicionar la piel y el pelaje, previenen la sequedad y le dan al pelaje un brillo y brillo profundos. El abrigo se seca suave, manejable y sin enredos. pH equilibrado, suave, se enjuaga por completo, dejando el pelaje con un olor fresco y limpio.','cleaning',0,249.00,'/assets/img/products/not customizable/cat-cleaning-bio-groom-shampoo.png',22,'cat',NULL),(11,'Bedsure Cama Gato Grande Estampada - Camas para Gatos Suave y Lavable, Cojin Pequeño Interior y Redondo','COMODIDAD INSTANTÁNEA: La cama gato verano tiene una zona para dormir y ultra lujosa y relleno de fibra de poliéster esponjoso para acurrucarse.\n\nDISEÑO ESPECIAL: La cama perro pequeño con lados elevados crea una sensación de seguridad y un lugar espacioso para anidar.\n\nPARTE INFERIOR ANTIDESLIZANTE: La cama gatos suave presenta un fondo antideslizante que ayuda a mantener la cama gato grande en su lugar en superficies lisas.\n\nFÁCIL MANTENIMIENTO: La cama gato lavable y resistente al agua de un lado proporciona comodidad durante todo el año.\n\nCUIDAD SENCILLA: La cama gato desenfundable se puede lavar a máquina en agua fría, circulación suave, lavada por separado, secada y planchada a baja temperatura, no limpie en seco.','supplies',0,521.61,'/assets/img/products/not customizable/cat-supplies-bedsure-big-bed.png',16,'cat',NULL),(12,'Suplemento en gel de vitaminas y minerales PetAg - Soporte inmunitario para gatos -Contiene vitamina D y Zinc','Sistema Inmunológico y Salud ósea: Este poderoso suplemento es para apoyar a gatos de 4 meses o más. Soporte Inmunológico para Gatos: Los nutrientes apoyan el sistema inmunológico y la energía, perfecto para gatos activos.\n\nExcelente Adición a la Dieta Diaria: Las vitaminas con excelente sabor mantendrán a los gatos vibrantes y alegres todos los días.\n\nFácil de Administrar: El sabor altamente apetitoso de pollo ayuda a los gatos a obtener un pelaje brillante, suave y grueso.\n\nExcelente Solución de Cuidado: PetAg ofrece productos de alta calidad para dueños y profesionales de animales.','health',0,335.00,'/assets/img/products/not customizable/cat-health-petag-supplement-gel.png',12,'cat',NULL),(13,'Collar de Nylon',NULL,'collar',1,179.99,'/assets/img/products/customizable/customizable-collar-nylon.png',67,NULL,1),(14,'Collar de Cuero Sintético',NULL,'collar',1,150.00,'/assets/img/products/customizable/customizable-collar-leather.png',67,NULL,2),(15,'Plato de Comida de Plástico',NULL,'bowl',1,209.99,'/assets/img/products/customizable/customizable-bowl-plastic.png',136,NULL,3),(16,'Plato de Comida de Cerámica',NULL,'bowl',1,259.99,'/assets/img/products/customizable/customizable-bowl-ceramic.png',136,NULL,4),(17,'Plaquita con Forma de Pata',NULL,'nameplate',1,299.99,'/assets/img/products/customizable/customizable-nameplate-paw.png',376,NULL,5),(18,'Plaquita con Forma de Hueso',NULL,'nameplate',1,255.99,'/assets/img/products/customizable/customizable-nameplate-bone.png',323,NULL,6),(19,'Plaquita con Forma de Círculo Doble',NULL,'nameplate',1,255.00,'/assets/img/products/customizable/customizable-nameplate-circle-double.png',299,NULL,7),(20,'Plaquita con Forma de Círculo',NULL,'nameplate',1,219.00,'/assets/img/products/customizable/customizable-nameplate-circle.png',311,NULL,8),(21,'Plaquita con Forma de Estrella',NULL,'nameplate',1,119.00,'/assets/img/products/customizable/customizable-nameplate-star.png',288,NULL,9),(22,'Traje de Michi',NULL,'pet',1,NULL,'/assets/img/products/customizable/customizable-pet-cat.png',NULL,'cat',10),(23,'Traje de Lomito',NULL,'pet',1,NULL,'/assets/img/products/customizable/customizable-pet-dog.png',NULL,'dog',11);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sizes`
--

DROP TABLE IF EXISTS `sizes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sizes` (
  `size_id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(20) NOT NULL,
  `small` varchar(100) NOT NULL,
  `medium` varchar(100) NOT NULL,
  `big` varchar(100) NOT NULL,
  PRIMARY KEY (`size_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sizes`
--

LOCK TABLES `sizes` WRITE;
/*!40000 ALTER TABLE `sizes` DISABLE KEYS */;
INSERT INTO `sizes` VALUES (1,'bowl','Pequeño - 250 ml','Mediano - 500 ml','Grande - 1000 ml'),(2,'nameplate','Pequeña - 35 mm x 18 mm','Mediana - 38 mm x 25 mm','Grande - 50 mm x 32 mm'),(3,'collar','Pequeño - 25 cm a 38 cm - 1.5cm de ancho','Mediano - 32 cm a 48 cm - 2 cm de ancho','Grande - 39 cm a 59 cm - 2.5 cm de ancho');
/*!40000 ALTER TABLE `sizes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `password` varchar(20) NOT NULL,
  `privileges` varchar(20) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Juan Fernando Reyes Sánchez','juanreyssan@gmail.com','525519673129','password','admin'),(2,'Amaya Hernández Barrera','mayitabar98@gmail.com','525517909516','guestguest','client'),(3,'María Guadalupe Castellanos Córdoba','lupita_osito32@gmail.com','525580528301','qwertyuiop','admin'),(4,'Darío González Pichardo','darioastronautagp@gmail.com','525527839796','col12345','client'),(5,'Manuel Rodríguez González','manu93rzgz@gmail.com','525518090880','megustaelarroz18','admin'),(6,'Alexis Peralta Muñoz','alpemu_electro22@gmail.com','525542481533','alexisperalta22','client'),(7,'Cristina Espinoza Leyva','kristyespinoza921@gmail.com','525573406189','footballkristy92','admin'),(8,'Isidro Juárez Velázquez','juarezsd29473@gmail.com','525569771680','dragonisidro123','client'),(9,'Juana Sánchez Armenta','jusanarmenti21@gmail.com','525569753092','princessjuanita77','admin'),(10,'Sandra Castillo Pérez','sandraexploradora21@gmail.com','525546483824','passw0rdstarwars21','client');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-04 22:34:22
