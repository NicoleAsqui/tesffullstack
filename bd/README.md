# Base de datos

## Requerimientos

- MySQL
- Acceso de administrador (`root` u otro usuario con privilegios para crear BD y usuarios).

##  Despliegue

1. Abrir terminal y entrar a MySQL como administrador:

   ```bash
   mysql -u root -p
   ```

2. Ejecutar el script:

   ```sql
   source /ruta/al/proyecto/examen/tesffullstack/bd/script_bd.sql
   ```


3. Verificar que la base y la tabla existen:

   ```sql
   SHOW DATABASES LIKE 'bd_asqui';
   USE bd_asqui;
   DESCRIBE person;
   ```

4. Verificar permisos del usuario `conexion`:

   ```sql
   SHOW GRANTS FOR 'conexion'@'localhost';
   ```

5. Probar la conexión con el usuario creado:

   ```bash
   mysql -u conexion -p bd_asqui
   ```

   Contraseña: `123456`

6. Salir:

   ```sql
   exit;
   ```