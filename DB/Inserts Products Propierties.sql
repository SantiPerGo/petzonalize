USE petzonalize;
SELECT * FROM petzonalize.product_properties;

-- INSERT EXAMPLE
-- INSERT INTO product_properties (`color`, `size`, `pattern`, `material`, `petname`, `petphone`, `shape`, `body`, `head`) 
-- 	VALUES ('1', '1', '1', '1', '1', '1', '1', '1', '1');

-- ID 13
INSERT INTO product_properties (`color`, `size`, `pattern`, `material`) 
	VALUES ('orange', 'Pequeño - 25 cm a 38 cm - 1.5 cm de ancho', 'circles', 'nylon');
-- ID 14
INSERT INTO product_properties (`color`, `size`, `pattern`, `material`) 
	VALUES ('blue', 'Mediano - 32 cm a 48 cm - 2 cm de ancho', 'circles', 'synthetic-leather');
-- ID 15
INSERT INTO product_properties (`color`, `size`, `pattern`, `petname`, `material`) 
	VALUES ('yellow', 'Pequeño - 250 ml', 'hearts', 'firulais', 'plastic');
-- ID 16
INSERT INTO product_properties (`color`, `size`, `pattern`, `petname`, `material`) 
	VALUES ('yellow', 'Mediano - 500 ml', 'fabric', 'neko', 'ceramic');
-- ID 17
INSERT INTO product_properties (`color`, `size`, `pattern`, `petname`, `petphone`, `shape`) 
	VALUES ('blue', 'Pequeño - 35 mm x 18 mm', 'paw', 'circles', 'firulais', '55123456');
-- ID 18
INSERT INTO product_properties (`color`, `size`, `pattern`, `petname`, `petphone`, `shape`) 
	VALUES ('blue', 'Pequeño - 35 mm x 18 mm', 'bone', 'circles', 'cheems', '55123456');
-- ID 19 
INSERT INTO product_properties (`color`, `size`, `pattern`, `petname`, `petphone`, `shape`) 
	VALUES ('blue', 'Grande - 50 mm x 32 mm', 'circle-double', 'circles', 'lomito', '55123456');
-- ID 20
INSERT INTO product_properties (`color`, `size`, `pattern`, `petname`, `petphone`, `shape`) 
	VALUES ('blue', 'Pequeño - 35 mm x 18 mm', 'circles', 'circles', 'max', '55123456');
-- ID 21
INSERT INTO product_properties (`color`, `size`, `pattern`, `petname`, `petphone`, `shape`) 
	VALUES ('blue', 'Mediano - 38 mm x 25 mm', 'star', 'circles', 'dog', '55123456');
-- ID 22
INSERT INTO product_properties (`body`, `head`) 
	VALUES ('turtle', 'cold');
-- ID 23
INSERT INTO product_properties (`body`, `head`) 
	VALUES ('shark', 'mariachi');

    
    
