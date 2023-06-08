
-- Ver todos los usuarios en MySQL
SELECT user, Host FROM mysql.user;

-- Crear nuevo usuario
CREATE USER patito@"%" IDENTIFIED BY "12345";

-- Crear permisos para ch26_la_comer
GRANT SELECT, INSERT on ch26_la_comer.* TO patito@"%"; 

-- Conocer los privilegios de un usuario
SHOW GRANTS FOR patito@"%";

-- Quitar privilegios a un usuario
REVOKE INSERT ON ch26_la_comer.* FROM patito@"%";

-- Eliminar un usuario
DROP USER alejandro@"%";

-- Cambiar la contraseña a un usuario
ALTER USER patito@"%" IDENTIFIED BY "tacosalpastor123";