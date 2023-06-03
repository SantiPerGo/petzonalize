USE petzonalize;

SELECT * FROM petzonalize.customizables;

-- INSERT EXAMPLE
-- INSERT INTO product_properties (`color`, `size`, `pattern`, `material`, `petname`, `petphone`, `shape`, `body`, `head`) 
-- 	VALUES ('1', '1', '1', '1', '1', '1', '1', '1', '1');

-- ID 1
INSERT INTO customizables (`customizable_id`, `name`, `category`, `type`, `price`, `imgUrl`, `stock`, `css_property_id`)
	VALUES ('1', 'Sombrero de Mariachi', 'custome-head', 'mariachi', 234.99, '/assets/img/products/customizable/customizable-head-mariachi.png', 30, '1');
    
-- ID 2
INSERT INTO customizables (`customizable_id`, `name`, `category`, `type`, `price`, `imgUrl`, `stock`, `css_property_id`)
	VALUES ('2', 'Sombrero Color Rojo para el Frío', 'custome-head', 'cold', 145, '/assets/img/products/customizable/customizable-head-cold-red.png', 33, '2');

-- ID 3
INSERT INTO customizables (`customizable_id`, `name`, `category`, `type`, `price`, `imgUrl`, `stock`, `css_property_id`)
	VALUES ('3', 'Traje de Tiburón', 'custome-body', 'shark', 269, '/assets/img/products/customizable/customizable-body-shark-jacket.png', 26, '3');
    
-- ID 4
INSERT INTO customizables (`customizable_id`, `name`, `category`, `type`, `price`, `imgUrl`, `stock`, `css_property_id`)
	VALUES ('4', 'Traje con Jinete', 'custome-body', 'rider', 249.29, '/assets/img/products/customizable/customizable-body-rider.png', 27, '4');
    
-- ID 5
INSERT INTO customizables (`customizable_id`, `name`, `category`, `type`, `price`, `imgUrl`, `stock`, `css_property_id`)
	VALUES ('5', 'Capa Roja', 'custome-body', 'cape', 195, '/assets/img/products/customizable/customizable-body-cape.png', 39, '5');
    
-- ID 6
INSERT INTO customizables (`customizable_id`, `name`, `category`, `type`, `price`, `imgUrl`, `stock`, `css_property_id`)
	VALUES ('6', 'Caparazón de Tortuga', 'custome-body', 'turtle', 224, '/assets/img/products/customizable/customizable-body-turtle-shell.png', 30, '6');
    
-- ID 7
INSERT INTO customizables (`customizable_id`, `name`, `category`, `type`, `price`, `imgUrl`, `stock`)
	VALUES ('7', 'Estampado de Círculos', 'pattern', 'circles', 19.99, '/assets/img/products/customizable/customizable-pattern-circles.jpg', 0);
    
-- ID 8
INSERT INTO customizables (`customizable_id`, `name`, `category`, `type`, `price`, `imgUrl`, `stock`)
	VALUES ('8', 'Estampado de Corazones', 'pattern', 'hearts', 29.73, '/assets/img/products/customizable/customizable-pattern-hearts.png', 0);
    
-- ID 9
INSERT INTO customizables (`customizable_id`, `name`, `category`, `type`, `price`, `imgUrl`, `stock`)
	VALUES ('9', 'Estampado de Tela', 'pattern', 'fabric', 39, '/assets/img/products/customizable/customizable-pattern-fabric.jpg', 0);
    
-- ID 10
INSERT INTO customizables (`customizable_id`, `name`, `category`, `type`, `price`, `imgUrl`, `stock`)
	VALUES ('10', 'Estampado de Cuadrados', 'pattern', 'squares', 59.12, '/assets/img/products/customizable/customizable-pattern-squares.jpg', 0);
