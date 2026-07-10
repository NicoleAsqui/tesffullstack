# Backend — CRUD Person (Spring Boot)

API REST para la tabla `person` de la base `bd_asqui`.

## Requisitos

- Java 17+
- MySQL con `bd_asqui`, tabla `person` y usuario `conexion` / `123456`
- Maven (incluido el wrapper `mvnw`)

## Ejecutar en local

```bash
cd backend
./mvnw spring-boot:run
```

## Estructura (arquitectura hexagonal)

```
src/main/java/com/example/backend/
├── BackendApplication.java
├── domain/                          # Núcleo del negocio
│   ├── model/Person.java
│   └── port/out/PersonRepositoryPort.java   # Puerto de salida (BD)
├── application/                     # Casos de uso
│   ├── dto/ApiResponse.java
│   └── service/PersonService.java
└── infrastructure/                  # Adaptadores
    └── adapter/
        ├── in/web/PersonController.java     # Entrada REST
        └── out/persistence/
            ├── PersonJpaRepository.java
            └── PersonRepositoryAdapter.java # Salida MySQL/JPA
```

- **Dominio**: modelo y puertos (sin depender de Spring ni HTTP).
- **Aplicación**: lógica CRUD y formato de respuesta.
- **Infraestructura**: REST y persistencia implementan los puertos.

## Endpoints

| Método | URL | Descripción |
|--------|-----|-------------|
| GET | `/person` | Listar todas |
| GET | `/person/{id}` | Buscar por id |
| POST | `/person` | Crear |
| PUT | `/person/{id}` | Actualizar |
| DELETE | `/person/{id}` | Eliminar |

## Respuesta JSON

```json
{
  "status": true,
  "msg": "Mensaje de la operación",
  "data": []
}
```

- `status`: `true` si salió bien, `false` si hubo error
- `data`: arreglo con los registros (vacío si falló)

## Ejemplos (curl)

```bash
# Listar
curl http://localhost:8080/person

# Crear
curl -X POST http://localhost:8080/person \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Nicole","apellido":"Asqui","fechaNacimiento":"2000-01-15","puesto":"Dev","sueldo":1200}'

# Actualizar
curl -X PUT http://localhost:8080/person/1 \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Nicole","apellido":"Asqui","fechaNacimiento":"2000-01-15","puesto":"Senior Dev","sueldo":1500}'

# Eliminar
curl -X DELETE http://localhost:8080/person/1
```

## Postman

Capturas de prueba en la carpeta `postman_captures/`.

## Configuración

Conexión a MySQL en `src/main/resources/application.properties`.
