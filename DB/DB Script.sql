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
  `cat_right` varchar(10) NOT NULL,
  `cat_top` varchar(10) NOT NULL,
  `dog_right` varchar(10) NOT NULL,
  `dog_top` varchar(10) NOT NULL,
  PRIMARY KEY (`css_property_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `css_properties`
--

LOCK TABLES `css_properties` WRITE;
/*!40000 ALTER TABLE `css_properties` DISABLE KEYS */;
INSERT INTO `css_properties` VALUES (1,'5%','27%','10%','17%'),(2,'5%','20%','15%','15%'),(3,'18%','25%','25%','25%'),(4,'25%','15%','30%','15%'),(5,'27%','25%','30%','20%'),(6,'30%','30%','30%','25%');
/*!40000 ALTER TABLE `css_properties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customizables`
--

DROP TABLE IF EXISTS `customizables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customizables` (
  `css_property_id` int DEFAULT NULL,
  `customizable_id` int NOT NULL AUTO_INCREMENT,
  `price` double NOT NULL,
  `stock` int DEFAULT NULL,
  `category` varchar(20) NOT NULL,
  `type` varchar(20) NOT NULL,
  `img_url` varchar(150) NOT NULL,
  `name` varchar(200) NOT NULL,
  PRIMARY KEY (`customizable_id`),
  KEY `FKgxef4ggelf6t3e448q7ur394v` (`css_property_id`),
  CONSTRAINT `FKgxef4ggelf6t3e448q7ur394v` FOREIGN KEY (`css_property_id`) REFERENCES `css_properties` (`css_property_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customizables`
--

LOCK TABLES `customizables` WRITE;
/*!40000 ALTER TABLE `customizables` DISABLE KEYS */;
INSERT INTO `customizables` VALUES (1,1,234.99,30,'custome-head','mariachi','/assets/img/products/customizable/customizable-head-mariachi.png','Sombrero de Mariachi'),(2,2,145,33,'custome-head','cold','/assets/img/products/customizable/customizable-head-cold-red.png','Sombrero Color Rojo para el Frío'),(3,3,269,26,'custome-body','shark','/assets/img/products/customizable/customizable-body-shark-jacket.png','Traje de Tiburón'),(4,4,249.29,27,'custome-body','rider','/assets/img/products/customizable/customizable-body-rider.png','Traje con Jinete'),(6,5,224,30,'custome-body','turtle','/assets/img/products/customizable/customizable-body-turtle-shell.png','Caparazón de Tortuga'),(NULL,6,19.99,NULL,'pattern','circles','/assets/img/products/customizable/customizable-pattern-circles.jpg','Estampado de Círculos'),(NULL,7,29.73,NULL,'pattern','hearts','/assets/img/products/customizable/customizable-pattern-hearts.png','Estampado de Corazones'),(NULL,8,39,NULL,'pattern','fabric','/assets/img/products/customizable/customizable-pattern-fabric.jpg','Estampado de Tela'),(NULL,9,59.12,NULL,'pattern','squares','/assets/img/products/customizable/customizable-pattern-squares.jpg','Estampado de Cuadrados');
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
  `petphone` varchar(15) DEFAULT NULL,
  `material` varchar(20) DEFAULT NULL,
  `pattern` varchar(20) DEFAULT NULL,
  `shape` varchar(20) DEFAULT NULL,
  `body` varchar(50) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `head` varchar(50) DEFAULT NULL,
  `size` varchar(50) DEFAULT NULL,
  `petname` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`product_property_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_properties`
--

LOCK TABLES `product_properties` WRITE;
/*!40000 ALTER TABLE `product_properties` DISABLE KEYS */;
INSERT INTO `product_properties` VALUES (1,NULL,'nylon','circles',NULL,NULL,'hsla(237, 100%, 50%, 1)',NULL,'Pequeño - 25 cm a 38 cm - 1.5 cm de ancho',NULL),(2,NULL,'synthetic-leather','circles',NULL,NULL,'hsla(237, 100%, 50%, 1)',NULL,'Mediano - 32 cm a 48 cm - 2 cm de ancho',NULL),(3,NULL,'plastic','hearts',NULL,NULL,'hsla(78, 100%, 50%, 1)',NULL,'Pequeño - 250 ml','firulais'),(4,NULL,'ceramic','fabric',NULL,NULL,'hsla(288, 100%, 50%, 1)',NULL,'Mediano - 500 ml','neko'),(5,'firulais',NULL,'paw','55123456',NULL,'hsla(342, 100%, 50%, 1)',NULL,'Pequeño - 35 mm x 18 mm','circles'),(6,'cheems',NULL,'bone','55123456',NULL,'hsla(24, 100%, 50%, 1)',NULL,'Pequeño - 35 mm x 18 mm','circles'),(7,'lomito',NULL,'circle-double','55123456',NULL,'hsla(173, 100%, 50%, 1)',NULL,'Grande - 50 mm x 32 mm','circles'),(8,'max',NULL,'circles','55123456',NULL,'hsla(33, 100%, 50%, 1)',NULL,'Pequeño - 35 mm x 18 mm','circles'),(9,'dog',NULL,'star','55123456',NULL,'hsla(193, 100%, 50%, 1)',NULL,'Mediano - 38 mm x 25 mm','circles'),(10,NULL,NULL,NULL,NULL,'turtle',NULL,'cold',NULL,NULL),(11,NULL,NULL,NULL,NULL,'shark',NULL,'mariachi',NULL,NULL);
/*!40000 ALTER TABLE `product_properties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `customizable` bit(1) NOT NULL,
  `price` double DEFAULT NULL,
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_property_id` int DEFAULT NULL,
  `stock` int DEFAULT NULL,
  `category` varchar(20) NOT NULL,
  `type` varchar(20) DEFAULT NULL,
  `img_url` varchar(150) NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `FKmlvsae5uaeau5sja09uyqg2ku` (`product_property_id`),
  CONSTRAINT `FKmlvsae5uaeau5sja09uyqg2ku` FOREIGN KEY (`product_property_id`) REFERENCES `product_properties` (`product_property_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (_binary '\0',4123,1,NULL,5,'food','dog','/assets/img/products/not customizable/dog-food-hills-adult-large-breed.png','Hill\'s Adult Large Breed Lamb Meal & Brown Rice Recipe Alimento para perros','El alimento seco para perros Hill\'s Science Diet Large Breed Adult está especialmente formulado para satisfacer las necesidades energéticas de los perros de razas grandes durante la flor de su vida.\n\nDelicioso sabor a cordero para aquellos que prefieren la variedad y elaborado con ingredientes de alta calidad y fáciles de digerir. Fuentes naturales de glucosamina y condroitina para la salud de las articulaciones. Omega-6 y vitamina E para una piel y un pelaje hermosos. Proteína de alta calidad para músculos magros'),(_binary '\0',250,2,NULL,19,'toys','dog','/assets/img/products/not customizable/dog-toys-flamingo-rubber-frisbee.png','Flamingo Frisbee de Goma para Perros','Si quieres un juguete divertido y seguro para tu perro, este frisbee de goma es justo lo que estás buscando. Con él tu mascota podrá disfrutar jugando, realizando ejercicios de adiestramiento o practicando deporte. Este producto está fabricado con goma maciza natural, no tóxica, que, además, no hace daño al golpear.\n\nLos perros suelen coger los discos en el aire, antes de que caigan al suelo. Otros frisbee pueden dañarles la boca y dientes, ya que están hechos con materiales más duros o de peor calidad. Con este juguete, tu mascota no se hará daño, ya que está diseñado para masajear y cuidar de la dentadura de tu mejor amigo mientras lo muerde.\n\nEste frisbee de goma es un juguete muy divertido para tu perro que además viene en llamativos colores, rojo, verde o naranja. Pídelo ya y déjate sorprender por el color que te toque. ¡A tu mascota le encantará!'),(_binary '\0',97,3,NULL,269,'cleaning','dog','/assets/img/products/not customizable/dog-cleaning-hartz-groomers-shampoo.png','Hartz Groomer\'s Best Champú para Cachorros, aroma a jazmín','Fórmula suave y sin lágrimas especialmente formulada para la piel y el pelaje delicado de los cachorros sin ser agresiva ni secar. Incluye 18 onzas líquidas de champú extra suave con aroma a jazmín.\n\nAdecuado para todo tipo de pelaje, esta solución super espumosa es suave para la piel sensible y fácil de enjabonar para un pelaje completamente limpio que es suave y brillante. Hecho con ingredientes 100% seguros para mascotas.'),(_binary '\0',740,4,NULL,10,'cleaning','dog','assets/img/products/not customizable/dog-cleaning-furminator-shedding-tool.png','Cepillo Deslanador Perros Grandes Furminator Pelo Largo','Furminator Deslanador para Perro Pelo Corto La herramienta patentada Deslanador para Perro Pelo Corto, elimina de forma fácil y rápida no corta sino que elimina la muda el pelo muerto y el subpelo que es el problema más común de los dueños de mascotas la muda y los problemas de alergia y limpieza que supone.\n\nEl cepillo de diseño único con su borde de acero inoxidable agarra el pelo suelto y lo elimina sin causar ningún daño en la piel. Ahora con una manera práctica y rápida de vaciar el pelo recogido por la hoja. El pelo lustroso de la mascota es un indicativo del cuidado excelente que el cepillo le proporciona.'),(_binary '\0',292.53,5,NULL,23,'saupplies','dog','/assets/img/products/not customizable/dog-supplies-fancy-pets-plastic-bed.png','Fancy Pets Cojin/Cama para Cama de Plásico para Perro Tamaño Grande','Dale a su mascota el sueño reparador ya que es un factor clave para su inteligencia y longevidad. Su mascota se merece todo esto y con un cojín para cama grande fabricado con tela suave de alta calidad resistente al manejo cotidiano lo va a conseguir. Este cojín proporciona descanso y comodidad, previene la formación de callosidades y es totalmente lavable.'),(_binary '\0',800,6,NULL,16,'health','dog','/assets/img/products/not customizable/dog-health-zamipet-vitamin-chews.png','ZamiPet Skin, Coat & Nails','ZamiPet Skin, Coat & Nails son masticables para tu mascota de muy buen sabor que contienen Omega 6, Miel de Manuka, Prebiótico, MSM, Cúrcuma y Biotina para mantener la piel sana de su perro, además de promover un pelaje brillante y uñas fuertes.'),(_binary '\0',185.89,7,NULL,25,'food','cat','/assets/img/products/not customizable/cat-food-kit-cat-kitten-pregnant.png','Kit Cat Gatitos y Embarazadas (Crecimiento Sano) Alimento Seco para Gatos','Kit Cat alimento natural premium para gatos fue creado por nuestros nutricionistas que también son amantes de los gatos y elaborado con la bondad de ingredientes naturales cuidadosamente seleccionados que no contienen colorantes artificiales.\n\nAdemás, esta dieta contiene fructooligosacáridos que promueven un tracto digestivo más saludable y taurina para ojos saludables. Omega 3 y 6. Piel sana. Sin cerdo, sin manteca. Añadido Taurino. Prebiótico, Vitamina E'),(_binary '\0',229,8,NULL,15,'toys','cat','/assets/img/products/not customizable/cat-toys-leaps-bounds-feather-ball.png','Leaps & Bounds Pista con Pluma y Pelota con Luz Juguete para Gato, Rosa','¡Los gatitos inteligentes saben que pensar es muy divertido! La pista de Leaps & Bounds ofrece divertidos desafíos en la lucha por reflejos y la resolución de problemas, y permite que los gatos te impresionen con sus habilidades. La pelota se enciende y recorre la pista. Pluma en un resorte para llamar la atención de tu mejor amigo. Color rosa de material resistente.'),(_binary '\0',254,9,NULL,34,'cleaning','cat','/assets/img/products/not customizable/cat-cleaning-slicker-brush.png','Cepillo para Gatos, Cepillo Slicker para Masaje de Mascotas y Limpieza Automática.','Remueve el pelo: remueve los pelos sueltos, largos, cortos, la suciedad y los enredos, ¡no más pelos en el suelo!\n\nFácil de limpiar: cuando hayas terminado de cepillar a tu mascota, simplemente presiona el botón y las cerdas se retraen de vuelta en el cepillo, haciendo que sea sencillo quitar el pelo del cepillo, para que esté listo para usar la próxima vez.'),(_binary '\0',249,10,NULL,22,'cleaning','cat','/assets/img/products/not customizable/cat-cleaning-bio-groom-shampoo.png','BIO GROOM Flea & Tick Shampoo para Gato','Flea & Tick es un concentrado de champú acondicionador que contiene PYRETHRINS para un control efectivo de pulgas, piojos y garrapatas. Los ingredientes derivados del aceite de coco en esta fórmula limpian suavemente, resaltan todos los colores y hacen que el blanco brille.\n\nLa proteína y la lanolina en este champú ayudan a acondicionar la piel y el pelaje, previenen la sequedad y le dan al pelaje un brillo y brillo profundos. El abrigo se seca suave, manejable y sin enredos. pH equilibrado, suave, se enjuaga por completo, dejando el pelaje con un olor fresco y limpio.'),(_binary '\0',521.61,11,NULL,16,'supplies','cat','/assets/img/products/not customizable/cat-supplies-bedsure-big-bed.png','Bedsure Cama Gato Grande Estampada - Camas para Gatos Suave y Lavable, Cojin Pequeño Interior y Redondo','COMODIDAD INSTANTÁNEA: La cama gato verano tiene una zona para dormir y ultra lujosa y relleno de fibra de poliéster esponjoso para acurrucarse.\n\nDISEÑO ESPECIAL: La cama perro pequeño con lados elevados crea una sensación de seguridad y un lugar espacioso para anidar.\n\nPARTE INFERIOR ANTIDESLIZANTE: La cama gatos suave presenta un fondo antideslizante que ayuda a mantener la cama gato grande en su lugar en superficies lisas.\n\nFÁCIL MANTENIMIENTO: La cama gato lavable y resistente al agua de un lado proporciona comodidad durante todo el año.\n\nCUIDAD SENCILLA: La cama gato desenfundable se puede lavar a máquina en agua fría, circulación suave, lavada por separado, secada y planchada a baja temperatura, no limpie en seco.'),(_binary '\0',335,12,NULL,12,'health','cat','/assets/img/products/not customizable/cat-health-petag-supplement-gel.png','Suplemento en gel de vitaminas y minerales PetAg - Soporte inmunitario para gatos -Contiene vitamina D y Zinc','Sistema Inmunológico y Salud ósea: Este poderoso suplemento es para apoyar a gatos de 4 meses o más. Soporte Inmunológico para Gatos: Los nutrientes apoyan el sistema inmunológico y la energía, perfecto para gatos activos.\n\nExcelente Adición a la Dieta Diaria: Las vitaminas con excelente sabor mantendrán a los gatos vibrantes y alegres todos los días.\n\nFácil de Administrar: El sabor altamente apetitoso de pollo ayuda a los gatos a obtener un pelaje brillante, suave y grueso.\n\nExcelente Solución de Cuidado: PetAg ofrece productos de alta calidad para dueños y profesionales de animales.'),(_binary '',179.99,13,1,67,'collar',NULL,'/assets/img/products/customizable/customizable-collar-nylon.png','Collar de Nylon',NULL),(_binary '',150,14,2,67,'collar',NULL,'/assets/img/products/customizable/customizable-collar-leather.png','Collar de Cuero Sintético',NULL),(_binary '',209.99,15,3,136,'bowl',NULL,'/assets/img/products/customizable/customizable-bowl-plastic.png','Plato de Comida de Plástico',NULL),(_binary '',259.99,16,4,136,'bowl',NULL,'/assets/img/products/customizable/customizable-bowl-ceramic.png','Plato de Comida de Cerámica',NULL),(_binary '',299.99,17,5,376,'nameplate',NULL,'/assets/img/products/customizable/customizable-nameplate-paw.png','Plaquita con Forma de Pata',NULL),(_binary '',255.99,18,6,323,'nameplate',NULL,'/assets/img/products/customizable/customizable-nameplate-bone.png','Plaquita con Forma de Hueso',NULL),(_binary '',255,19,7,299,'nameplate',NULL,'/assets/img/products/customizable/customizable-nameplate-circle-double.png','Plaquita con Forma de Círculo Doble',NULL),(_binary '',219,20,8,311,'nameplate',NULL,'/assets/img/products/customizable/customizable-nameplate-circle.png','Plaquita con Forma de Círculo',NULL),(_binary '',119,21,9,288,'nameplate',NULL,'/assets/img/products/customizable/customizable-nameplate-star.png','Plaquita con Forma de Estrella',NULL),(_binary '',NULL,22,10,NULL,'pet','cat','/assets/img/products/customizable/customizable-pet-cat.png','Traje de Michi',NULL),(_binary '',NULL,23,11,NULL,'pet','dog','/assets/img/products/customizable/customizable-pet-dog.png','Traje de Lomito',NULL);
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
  `big` varchar(100) NOT NULL,
  `medium` varchar(100) NOT NULL,
  `small` varchar(100) NOT NULL,
  PRIMARY KEY (`size_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sizes`
--

LOCK TABLES `sizes` WRITE;
/*!40000 ALTER TABLE `sizes` DISABLE KEYS */;
INSERT INTO `sizes` VALUES (1,'bowl','Grande - 1000 ml','Mediano - 500 ml','Pequeño - 250 ml'),(2,'nameplate','Grande - 50 mm x 32 mm','Mediana - 38 mm x 25 mm','Pequeña - 35 mm x 18 mm'),(3,'collar','Grande - 39 cm a 59 cm - 2.5 cm de ancho','Mediano - 32 cm a 48 cm - 2 cm de ancho','Pequeño - 25 cm a 38 cm - 1.5cm de ancho');
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
  `phone` varchar(15) NOT NULL,
  `password` varchar(20) NOT NULL,
  `privileges` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'525519673129','password','admin','juanreyssan@gmail.com','Juan Fernando Reyes Sánchez'),(2,'525517909516','guestguest','client','mayitabar98@gmail.com','Amaya Hernández Barrera'),(3,'525580528301','qwertyuiop','admin','lupita_osito32@gmail.com','María Guadalupe Castellanos Córdoba'),(4,'525527839796','col12345','client','darioastronautagp@gmail.com','Darío González Pichardo'),(5,'525518090880','megustaelarroz18','admin','manu93rzgz@gmail.com','Manuel Rodríguez González'),(6,'525542481533','alexisperalta22','client','alpemu_electro22@gmail.com','Alexis Peralta Muñoz'),(7,'525573406189','footballkristy92','admin','kristyespinoza921@gmail.com','Cristina Espinoza Leyva'),(8,'525569771680','dragonisidro123','client','juarezsd29473@gmail.com','Isidro Juárez Velázquez'),(9,'525569753092','princessjuanita77','admin','jusanarmenti21@gmail.com','Juana Sánchez Armenta'),(10,'525546483824','passw0rdstarwars21','client','sandraexploradora21@gmail.com','Sandra Castillo Pérez');
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

-- Dump completed on 2023-06-05  1:01:27
