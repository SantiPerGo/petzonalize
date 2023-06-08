USE ch26_la_comer;

SELECT * FROM products;

DELETE FROM `products` WHERE products_id = 7;
INSERT INTO `products` (`name`, `description`, `price`)
	VALUES ("Lavadora", "Lavadora LG", 7000);

SELECT * FROM orders_delivery;
CALL show_delivery_time(5);