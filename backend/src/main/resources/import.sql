-- privileges
INSERT INTO privileges(privilege) VALUES ("admin");
INSERT INTO privileges(privilege) VALUES ("client");

-- users
INSERT INTO users (`name`, `email`, `phone`, `password`, `address`) VALUES ("Santi PerGo", "tuprofedog@gmail.com", "5530827907", "TuProfeDog", "123 Main St, New York, USA");
INSERT INTO users (`name`, `email`, `phone`, `password`, `address`) VALUES ("Juan Fernando Reyes Sánchez", "juanreyssan@gmail.com", "525519673129", "password", "456 Elm St, Madrid, Spain");
INSERT INTO users (`name`, `email`, `phone`, `password`, `address`) VALUES ("Amaya Hernández Barrera", "mayitabar98@gmail.com", "525517909516", "guestguest", "789 Oak St, Mexico City, Mexico");
INSERT INTO users (`name`, `email`, `phone`, `password`, `address`) VALUES ("María Guadalupe Castellanos Córdoba", "lupita_osito32@gmail.com", "525580528301", "qwertyuiop", "321 Pine St, Sydney, Australia");
INSERT INTO users (`name`, `email`, `phone`, `password`, `address`) VALUES ("Darío González Pichardo", "darioastronautagp@gmail.com", "525527839796", "col12345", "654 Maple St, Paris, France");
INSERT INTO users (`name`, `email`, `phone`, `password`, `address`) VALUES ("Manuel Rodríguez González", "manu93rzgz@gmail.com", "525518090880", "megustaelarroz18", "987 Birch St, Tokyo, Japan");
INSERT INTO users (`name`, `email`, `phone`, `password`, `address`) VALUES ("Alexis Peralta Muñoz", "alpemu_electro22@gmail.com", "525542481533", "alexisperalta22", "741 Cedar St, Sao Paulo, Brazil");
INSERT INTO users (`name`, `email`, `phone`, `password`, `address`) VALUES ("Cristina Espinoza Leyva", "kristyespinoza921@gmail.com", "525573406189", "footballkristy92", "852 Walnut St, Berlin, Germany");
INSERT INTO users (`name`, `email`, `phone`, `password`, `address`) VALUES ("Isidro Juárez Velázquez", "juarezsd29473@gmail.com", "525569771680", "dragonisidro123", "963 Spruce St, Rome, Italy");
INSERT INTO users (`name`, `email`, `phone`, `password`, `address`) VALUES ("Juana Sánchez Armenta", "jusanarmenti21@gmail.com", "525569753092", "princessjuanita77", "159 Fir St, Beijing, China");
INSERT INTO users (`name`, `email`, `phone`, `password`, `address`) VALUES ("Sandra Castillo Pérez", "sandraexploradora21@gmail.com", "525546483824", "passw0rdstarwars21", "357 Palm St, Sydney, Australia");

-- user has privilege
INSERT INTO user_has_privilege(`user_id`, `privilege_id`) VALUES (1, 1);
INSERT INTO user_has_privilege(`user_id`, `privilege_id`) VALUES (2, 1);
INSERT INTO user_has_privilege(`user_id`, `privilege_id`) VALUES (3, 2);
INSERT INTO user_has_privilege(`user_id`, `privilege_id`) VALUES (4, 1);
INSERT INTO user_has_privilege(`user_id`, `privilege_id`) VALUES (5, 2);
INSERT INTO user_has_privilege(`user_id`, `privilege_id`) VALUES (6, 1);
INSERT INTO user_has_privilege(`user_id`, `privilege_id`) VALUES (7, 2);
INSERT INTO user_has_privilege(`user_id`, `privilege_id`) VALUES (8, 1);
INSERT INTO user_has_privilege(`user_id`, `privilege_id`) VALUES (9, 2);
INSERT INTO user_has_privilege(`user_id`, `privilege_id`) VALUES (10, 1);
INSERT INTO user_has_privilege(`user_id`, `privilege_id`) VALUES (11, 2);

-- orders
INSERT INTO orders (`user_id`) VALUES (1);
INSERT INTO orders (`user_id`) VALUES (2);
INSERT INTO orders (`user_id`) VALUES (3);
INSERT INTO orders (`user_id`) VALUES (4);
INSERT INTO orders (`user_id`) VALUES (5);
INSERT INTO orders (`user_id`) VALUES (6);
INSERT INTO orders (`user_id`) VALUES (7);
INSERT INTO orders (`user_id`) VALUES (8);
INSERT INTO orders (`user_id`) VALUES (9);
INSERT INTO orders (`user_id`) VALUES (10);

-- sizes
INSERT INTO sizes (`category`, `small`, `medium`, `big`) VALUES ("bowl", "Pequeño - 250 ml", "Mediano - 500 ml", "Grande - 1000 ml");
INSERT INTO sizes (`category`, `small`, `medium`, `big`) VALUES ("nameplate", "Pequeña - 35 mm x 18 mm", "Mediana - 38 mm x 25 mm", "Grande - 50 mm x 32 mm");
INSERT INTO sizes (`category`, `small`, `medium`, `big`) VALUES ("collar", "Pequeño - 25 cm a 38 cm - 1.5cm de ancho", "Mediano - 32 cm a 48 cm - 2 cm de ancho", "Grande - 39 cm a 59 cm - 2.5 cm de ancho");

-- css properties of customizables 
INSERT INTO css_properties (`dog_top`, `dog_right`, `cat_top`, `cat_right`) VALUES ('17%', '10%', '27%', '5%');
INSERT INTO css_properties (`dog_top`, `dog_right`, `cat_top`, `cat_right`) VALUES ('15%', '15%', '20%', '5%');
INSERT INTO css_properties (`dog_top`, `dog_right`, `cat_top`, `cat_right`) VALUES ('25%', '25%', '25%', '18%');
INSERT INTO css_properties (`dog_top`, `dog_right`, `cat_top`, `cat_right`) VALUES ('15%', '30%', '15%', '25%');
INSERT INTO css_properties (`dog_top`, `dog_right`, `cat_top`, `cat_right`) VALUES ('20%', '30%', '25%', '27%');
INSERT INTO css_properties (`dog_top`, `dog_right`, `cat_top`, `cat_right`) VALUES ('25%', '30%', '30%', '30%');
INSERT INTO css_properties (`dog_top`, `dog_right`, `cat_top`, `cat_right`) VALUES ('37%', '23%', '39%', '18%');

-- customizables
INSERT INTO customizables (`name`, `category`, `type`, `price`, `img_url`, `stock`, `css_property_id`) VALUES ('Sombrero de Mariachi', 'custome-head', 'mariachi', 234.99, '/assets/img/products/customizable/customizable-head-mariachi.png', 30, '1');
INSERT INTO customizables (`name`, `category`, `type`, `price`, `img_url`, `stock`, `css_property_id`) VALUES ('Sombrero Color Rojo para el Frío', 'custome-head', 'cold', 145, '/assets/img/products/customizable/customizable-head-cold-red.png', 33, '2');
INSERT INTO customizables (`name`, `category`, `type`, `price`, `img_url`, `stock`, `css_property_id`) VALUES ('Traje de Tiburón', 'custome-body', 'shark', 269, '/assets/img/products/customizable/customizable-body-shark-jacket.png', 26, '3');
INSERT INTO customizables (`name`, `category`, `type`, `price`, `img_url`, `stock`, `css_property_id`) VALUES ('Traje con Jinete', 'custome-body', 'rider', 249.29, '/assets/img/products/customizable/customizable-body-rider.png', 27, '4');
INSERT INTO customizables (`name`, `category`, `type`, `price`, `img_url`, `stock`, `css_property_id`) VALUES ('Capa Roja', 'custome-body', 'cape', 195, '/assets/img/products/customizable/customizable-body-cape.png', 39, '5');
INSERT INTO customizables (`name`, `category`, `type`, `price`, `img_url`, `stock`, `css_property_id`) VALUES ('Caparazón de Tortuga', 'custome-body', 'turtle', 224, '/assets/img/products/customizable/customizable-body-turtle-shell.png', 30, '6');
INSERT INTO customizables (`name`, `category`, `type`, `price`, `img_url`) VALUES ('Estampado de Círculos', 'pattern', 'circles', 19.99, '/assets/img/products/customizable/customizable-pattern-circles.jpg');
INSERT INTO customizables (`name`, `category`, `type`, `price`, `img_url`) VALUES ('Estampado de Corazones', 'pattern', 'hearts', 29.73, '/assets/img/products/customizable/customizable-pattern-hearts.png');
INSERT INTO customizables (`name`, `category`, `type`, `price`, `img_url`) VALUES ('Estampado de Tela', 'pattern', 'fabric', 39, '/assets/img/products/customizable/customizable-pattern-fabric.jpg');
INSERT INTO customizables (`name`, `category`, `type`, `price`, `img_url`) VALUES ('Estampado de Cuadrados', 'pattern', 'squares', 59.12, '/assets/img/products/customizable/customizable-pattern-squares.jpg');
INSERT INTO customizables (`name`, `category`, `type`, `price`, `img_url`, `stock`, `css_property_id`) VALUES ('Suéter (Sintético) de Generation', 'custome-body', 'generation-sweater', 459, '/assets/img/products/customizable/customizable-body-generation-sweater.png', 36, '7');

-- product properties
INSERT INTO product_properties (`color`, `size`, `pattern`, `material`) VALUES ('hsla(237, 100%, 50%, 1)', 'Pequeño - 25 cm a 38 cm - 1.5 cm de ancho', 'circles', 'nylon');
INSERT INTO product_properties (`color`, `size`, `pattern`, `material`) VALUES ('hsla(237, 100%, 50%, 1)', 'Mediano - 32 cm a 48 cm - 2 cm de ancho', 'circles', 'synthetic-leather');
INSERT INTO product_properties (`color`, `size`, `pattern`, `petname`, `material`) VALUES ('hsla(78, 100%, 50%, 1)', 'Pequeño - 250 ml', 'hearts', 'firulais', 'plastic');
INSERT INTO product_properties (`color`, `size`, `shape`, `pattern`, `petname`, `material`) VALUES ('hsla(288, 100%, 50%, 1)', 'Mediano - 500 ml', 'fabric', 'neko', 'ceramic');
INSERT INTO product_properties (`color`, `size`, `shape`, `pattern`, `petname`, `petphone`) VALUES ('hsla(342, 100%, 50%, 1)', 'Pequeño - 35 mm x 18 mm', 'paw', 'circles', 'firulais', '55123456');
INSERT INTO product_properties (`color`, `size`, `shape`, `pattern`, `petname`, `petphone`) VALUES ('hsla(24, 100%, 50%, 1)', 'Pequeño - 35 mm x 18 mm', 'bone', 'circles', 'cheems', '55123456');
INSERT INTO product_properties (`color`, `size`, `shape`, `pattern`, `petname`, `petphone`) VALUES ('hsla(173, 100%, 50%, 1)', 'Grande - 50 mm x 32 mm', 'circle-double', 'circles', 'lomito', '55123456');
INSERT INTO product_properties (`color`, `size`, `shape`, `pattern`, `petname`, `petphone`) VALUES ('hsla(33, 100%, 50%, 1)', 'Pequeño - 35 mm x 18 mm', 'circles', 'circles', 'max', '55123456');
INSERT INTO product_properties (`color`, `size`, `shape`, `pattern`, `petname`, `petphone`) VALUES ('hsla(193, 100%, 50%, 1)', 'Mediano - 38 mm x 25 mm', 'star', 'circles', 'dog', '55123456');
INSERT INTO product_properties (`body`, `head`) VALUES ('turtle', 'cold');
INSERT INTO product_properties (`body`, `head`) VALUES ('shark', 'mariachi');

-- products
INSERT INTO products (category, customizable, price, stock, type, description, img_url, name) value("food", false, 4123, 5, "dog", "El alimento seco para perros Hill's Science Diet Large Breed Adult está especialmente formulado para satisfacer las necesidades energéticas de los perros de razas grandes durante la flor de su vida.\n\nDelicioso sabor a cordero para aquellos que prefieren la variedad y elaborado con ingredientes de alta calidad y fáciles de digerir. Fuentes naturales de glucosamina y condroitina para la salud de las articulaciones. Omega-6 y vitamina E para una piel y un pelaje hermosos. Proteína de alta calidad para músculos magros", "/assets/img/products/not customizable/dog-food-hills-adult-large-breed.png", "Hill's Adult Large Breed Lamb Meal & Brown Rice Recipe Alimento para perros");
INSERT INTO products (category, customizable, price, stock, type, description, img_url, name) value("toys", false, 250, 19, "dog", "Si quieres un juguete divertido y seguro para tu perro, este frisbee de goma es justo lo que estás buscando. Con él tu mascota podrá disfrutar jugando, realizando ejercicios de adiestramiento o practicando deporte. Este producto está fabricado con goma maciza natural, no tóxica, que, además, no hace daño al golpear.\n\nLos perros suelen coger los discos en el aire, antes de que caigan al suelo. Otros frisbee pueden dañarles la boca y dientes, ya que están hechos con materiales más duros o de peor calidad. Con este juguete, tu mascota no se hará daño, ya que está diseñado para masajear y cuidar de la dentadura de tu mejor amigo mientras lo muerde.\n\nEste frisbee de goma es un juguete muy divertido para tu perro que además viene en llamativos colores, rojo, verde o naranja. Pídelo ya y déjate sorprender por el color que te toque. ¡A tu mascota le encantará!", "/assets/img/products/not customizable/dog-toys-flamingo-rubber-frisbee.png", "Flamingo Frisbee de Goma para Perros");
INSERT INTO products (category, customizable, price, stock, type, description, img_url, name) value("cleaning", false, 97, 269, "dog", "Fórmula suave y sin lágrimas especialmente formulada para la piel y el pelaje delicado de los cachorros sin ser agresiva ni secar. Incluye 18 onzas líquidas de champú extra suave con aroma a jazmín.\n\nAdecuado para todo tipo de pelaje, esta solución super espumosa es suave para la piel sensible y fácil de enjabonar para un pelaje completamente limpio que es suave y brillante. Hecho con ingredientes 100% seguros para mascotas.", "/assets/img/products/not customizable/dog-cleaning-hartz-groomers-shampoo.png", "Hartz Groomer's Best Champú para Cachorros, aroma a jazmín");
INSERT INTO products (category, customizable, price, stock, type, description, img_url, name) value("cleaning", false, 740, 10, "dog", "Furminator Deslanador para Perro Pelo Corto La herramienta patentada Deslanador para Perro Pelo Corto, elimina de forma fácil y rápida no corta sino que elimina la muda el pelo muerto y el subpelo que es el problema más común de los dueños de mascotas la muda y los problemas de alergia y limpieza que supone.\n\nEl cepillo de diseño único con su borde de acero inoxidable agarra el pelo suelto y lo elimina sin causar ningún daño en la piel. Ahora con una manera práctica y rápida de vaciar el pelo recogido por la hoja. El pelo lustroso de la mascota es un indicativo del cuidado excelente que el cepillo le proporciona.", "/assets/img/products/not customizable/dog-cleaning-furminator-shedding-tool.png", "Cepillo Deslanador Perros Grandes Furminator Pelo Largo");
INSERT INTO products (category, customizable, price, stock, type, description, img_url, name) value("supplies", false, 292.53, 23, "dog", "Dale a su mascota el sueño reparador ya que es un factor clave para su inteligencia y longevidad. Su mascota se merece todo esto y con un cojín para cama grande fabricado con tela suave de alta calidad resistente al manejo cotidiano lo va a conseguir. Este cojín proporciona descanso y comodidad, previene la formación de callosidades y es totalmente lavable.", "/assets/img/products/not customizable/dog-supplies-fancy-pets-plastic-bed.png", "Fancy Pets Cojin/Cama para Cama de Plásico para Perro Tamaño Grande");
INSERT INTO products (category, customizable, price, stock, type, description, img_url, name) value ("health", false, 800, 16, "dog", "ZamiPet Skin, Coat & Nails son masticables para tu mascota de muy buen sabor que contienen Omega 6, Miel de Manuka, Prebiótico, MSM, Cúrcuma y Biotina para mantener la piel sana de su perro, además de promover un pelaje brillante y uñas fuertes.", "/assets/img/products/not customizable/dog-health-zamipet-vitamin-chews.png", "ZamiPet Skin, Coat & Nails");
INSERT INTO products (category, customizable, price, stock, type, description, img_url, name) value("food", false, 185.89, 25, "cat", "Kit Cat alimento natural premium para gatos fue creado por nuestros nutricionistas que también son amantes de los gatos y elaborado con la bondad de ingredientes naturales cuidadosamente seleccionados que no contienen colorantes artificiales.\n\nAdemás, esta dieta contiene fructooligosacáridos que promueven un tracto digestivo más saludable y taurina para ojos saludables. Omega 3 y 6. Piel sana. Sin cerdo, sin manteca. Añadido Taurino. Prebiótico, Vitamina E", "/assets/img/products/not customizable/cat-food-kit-cat-kitten-pregnant.png", "Kit Cat Gatitos y Embarazadas (Crecimiento Sano) Alimento Seco para Gatos");
INSERT INTO products (category, customizable, price, stock, type, description, img_url, name) value("toys", false, 229, 15, "cat", "¡Los gatitos inteligentes saben que pensar es muy divertido! La pista de Leaps & Bounds ofrece divertidos desafíos en la lucha por reflejos y la resolución de problemas, y permite que los gatos te impresionen con sus habilidades. La pelota se enciende y recorre la pista. Pluma en un resorte para llamar la atención de tu mejor amigo. Color rosa de material resistente.", "/assets/img/products/not customizable/cat-toys-leaps-bounds-feather-ball.png", "Leaps & Bounds Pista con Pluma y Pelota con Luz Juguete para Gato, Rosa");
INSERT INTO products (category, customizable, price, stock, type, description, img_url, name) value("cleaning", false, 254, 34, "cat", "Remueve el pelo: remueve los pelos sueltos, largos, cortos, la suciedad y los enredos, ¡no más pelos en el suelo!\n\nFácil de limpiar: cuando hayas terminado de cepillar a tu mascota, simplemente presiona el botón y las cerdas se retraen de vuelta en el cepillo, haciendo que sea sencillo quitar el pelo del cepillo, para que esté listo para usar la próxima vez.", "/assets/img/products/not customizable/cat-cleaning-slicker-brush.png", "Cepillo para Gatos, Cepillo Slicker para Masaje de Mascotas y Limpieza Automática.");
INSERT INTO products (category, customizable, price, stock, type, description, img_url, name) value("cleaning", false, 249, 22, "cat", "Flea & Tick es un concentrado de champú acondicionador que contiene PYRETHRINS para un control efectivo de pulgas, piojos y garrapatas. Los ingredientes derivados del aceite de coco en esta fórmula limpian suavemente, resaltan todos los colores y hacen que el blanco brille.\n\nLa proteína y la lanolina en este champú ayudan a acondicionar la piel y el pelaje, previenen la sequedad y le dan al pelaje un brillo y brillo profundos. El abrigo se seca suave, manejable y sin enredos. pH equilibrado, suave, se enjuaga por completo, dejando el pelaje con un olor fresco y limpio.", "/assets/img/products/not customizable/cat-cleaning-bio-groom-shampoo.png", "BIO GROOM Flea & Tick Shampoo para Gato");
INSERT INTO products (category, customizable, price, stock, type, description, img_url, name) value("supplies", false, 521.61, 16, "cat", "COMODIDAD INSTANTÁNEA: La cama gato verano tiene una zona para dormir y ultra lujosa y relleno de fibra de poliéster esponjoso para acurrucarse.\n\nDISEÑO ESPECIAL: La cama perro pequeño con lados elevados crea una sensación de seguridad y un lugar espacioso para anidar.\n\nPARTE INFERIOR ANTIDESLIZANTE: La cama gatos suave presenta un fondo antideslizante que ayuda a mantener la cama gato grande en su lugar en superficies lisas.\n\nFÁCIL MANTENIMIENTO: La cama gato lavable y resistente al agua de un lado proporciona comodidad durante todo el año.\n\nCUIDAD SENCILLA: La cama gato desenfundable se puede lavar a máquina en agua fría, circulación suave, lavada por separado, secada y planchada a baja temperatura, no limpie en seco.", "/assets/img/products/not customizable/cat-supplies-bedsure-big-bed.png", "Bedsure Cama Gato Grande Estampada - Camas para Gatos Suave y Lavable, Cojin Pequeño Interior y Redondo");
INSERT INTO products (category, customizable, price, stock, type, description, img_url, name) value("health", false, 335, 12, "cat", "Sistema Inmunológico y Salud ósea: Este poderoso suplemento es para apoyar a gatos de 4 meses o más. Soporte Inmunológico para Gatos: Los nutrientes apoyan el sistema inmunológico y la energía, perfecto para gatos activos.\n\nExcelente Adición a la Dieta Diaria: Las vitaminas con excelente sabor mantendrán a los gatos vibrantes y alegres todos los días.\n\nFácil de Administrar: El sabor altamente apetitoso de pollo ayuda a los gatos a obtener un pelaje brillante, suave y grueso.\n\nExcelente Solución de Cuidado: PetAg ofrece productos de alta calidad para dueños y profesionales de animales.", "/assets/img/products/not customizable/cat-health-petag-supplement-gel.png", "Suplemento en gel de vitaminas y minerales PetAg - Soporte inmunitario para gatos -Contiene vitamina D y Zinc");

-- Customizable products
-- Starting in id = 13
INSERT INTO products (name, category, customizable, price, stock, product_property_id, img_url) value("Collar de Nylon", "collar", true, 179.99, 67, 1, "/assets/img/products/customizable/customizable-collar-nylon.png");
INSERT INTO products (name, category, customizable, price, stock, product_property_id, img_url) value("Collar de Cuero Sintético", "collar", true, 150, 67, 2, "/assets/img/products/customizable/customizable-collar-leather.png");  
INSERT INTO products (name, category, customizable, price, stock, product_property_id, img_url) value("Plato de Comida de Plástico", "bowl", true, 209.99, 136, 3, "/assets/img/products/customizable/customizable-bowl-plastic.png");
INSERT INTO products (name, category, customizable, price, stock, product_property_id, img_url) value("Plato de Comida de Cerámica", "bowl", true, 259.99, 136, 4, "/assets/img/products/customizable/customizable-bowl-ceramic.png");
INSERT INTO products (name, category, customizable, price, stock, product_property_id, img_url) value("Plaquita con Forma de Pata", "nameplate", true, 299.99, 376, 5, "/assets/img/products/customizable/customizable-nameplate-paw.png");
INSERT INTO products (name, category, customizable, price, stock, product_property_id, img_url) value("Plaquita con Forma de Hueso", "nameplate", true, 255.99, 323, 6, "/assets/img/products/customizable/customizable-nameplate-bone.png");
INSERT INTO products (name, category, customizable, price, stock, product_property_id, img_url) value("Plaquita con Forma de Círculo Doble", "nameplate", true, 255, 299, 7, "/assets/img/products/customizable/customizable-nameplate-circle-double.png");
INSERT INTO products (name, category, customizable, price, stock, product_property_id, img_url) value("Plaquita con Forma de Círculo", "nameplate", true, 219, 311, 8, "/assets/img/products/customizable/customizable-nameplate-circle.png");
INSERT INTO products (name, category, customizable, price, stock, product_property_id, img_url) value("Plaquita con Forma de Estrella", "nameplate", true, 119, 288, 9, "/assets/img/products/customizable/customizable-nameplate-star.png");
INSERT INTO products (name, category, customizable, type, product_property_id, img_url) value("Traje de Michi", "pet", true, "cat", 10, "/assets/img/products/customizable/customizable-pet-cat.png");
INSERT INTO products (name, category, customizable, type, product_property_id, img_url) value("Traje de Lomito", "pet", true, "dog", 11, "/assets/img/products/customizable/customizable-pet-dog.png");
