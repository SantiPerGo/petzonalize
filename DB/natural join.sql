SELECT *
	FROM products
    INNER JOIN categories
    -- ON products.category_id = categories.category_id -- Se especifica
    USING (category_id); -- Tiene campo el común
    
SELECT *
	FROM products
    NATURAL JOIN categories; -- Combina tablas en columnas de nombres comunes