CREATE DATABASE bd_asqui;

USE bd_asqui;

CREATE TABLE person (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    fechaNacimiento DATE NOT NULL,
    puesto VARCHAR(100) NOT NULL,
    sueldo DECIMAL(10, 2) NOT NULL
);

CREATE USER 'conexion'@'localhost' IDENTIFIED BY '123456';

GRANT ALL PRIVILEGES ON bd_asqui.* TO 'conexion'@'localhost';

FLUSH PRIVILEGES;
