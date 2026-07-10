# Frontend — CRUD Personas (React)

Interfaz web para el API REST del backend (`/person`).

## Requisitos

- Node.js 18+
- Backend Spring Boot corriendo en **http://localhost:8080**
- MySQL con datos en `bd_asqui`

## Instalación

```bash
cd app-ui
npm install
```

## Ejecución en local (punto 13)

**Terminal 1 — Backend:**

```bash
cd backend
./mvnw spring-boot:run
```

**Terminal 2 — Frontend:**

```bash
cd app-ui
npm start
```

Se abre el navegador en **http://localhost:3000**

## Variables de entorno (opcional)

Crear `.env` en `app-ui/` si el API no está en el puerto por defecto:

```env
REACT_APP_API_URL=http://localhost:8080
```

## Pantallas (puntos 12 y 14)

| Pantalla | Requisito | Archivo |
|----------|-----------|---------|
| Listado | 12.1 Botón Crear | `PersonList.js` |
| Listado | 12.2 Todas las personas | GET `/person` |
| Listado | 12.3 Editar / Borrar por fila | botones en tabla |
| Formulario | 14.1 Guardar / Cancelar | `PersonForm.js` |
| Formulario | 14.2 Datos al editar | carga por id |

## Capturas de pantalla (punto 15.2)

Guardar imágenes en la carpeta `screenshots/`:

- `01-listado.png` — listado con personas
- `02-crear.png` — formulario vacío
- `03-editar.png` — formulario con datos cargados
- `04-eliminar.png` — confirmación o mensaje tras borrar

## Estructura

```
src/
├── api/personApi.js       # Llamadas al backend
├── components/
│   ├── PersonList.js      # Listado (12)
│   └── PersonForm.js      # Crear / editar (14)
└── App.js                 # Navegación entre vistas
```

## Build para entrega

```bash
npm run build
```

La carpeta `build/` queda lista para desplegar en cualquier hosting estático.

## CORS

Si el navegador bloquea las peticiones, el backend debe permitir `http://localhost:3000`. En Spring Boot agregar `@CrossOrigin(origins = "http://localhost:3000")` en `PersonController` o configuración global CORS.

## Prueba rápida en el navegador

1. Crear una persona desde el botón **Crear** → **Guardar**
2. Verificar que aparece en el listado
3. **Editar** → cambiar puesto o sueldo → **Guardar**
4. **Borrar** → confirmar → desaparece del listado
