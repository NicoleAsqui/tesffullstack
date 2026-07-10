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

## Ejecución en local

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

Crear `.env` en `app-ui/`:

```env
REACT_APP_API_URL=http://localhost:8080
```

## Pantallas

| Pantalla | Requisito | Archivo |
|----------|-----------|---------|
| Listado | Botón Crear | `PersonList.js` |
| Listado | Todas las personas | GET `/person` |
| Listado | Editar / Borrar por fila | botones en tabla |
| Formulario | Guardar / Cancelar | `PersonForm.js` |
| Formulario | Datos al editar | carga por id |

## Capturas de pantalla

Imágenes en la carpeta `screenshots/`:

- `01-listado.png` — listado con personas
- `02-crear.png` — formulario vacío
- `03-editar.png` — formulario con datos cargados
- `04-eliminar.png` — confirmación o mensaje tras borrar

## Estructura

```
src/
├── api/personApi.js       # Llamadas al backend
├── components/
│   ├── PersonList.js      # Listado
│   └── PersonForm.js      # Crear / editar
└── App.js                 # Navegación entre vistas
```

## Build para entrega

```bash
npm run build
```

## Prueba rápida en el navegador

1. Crear una persona desde el botón **Crear** → **Guardar**
2. Verificar que aparece en el listado
3. **Editar** → **Guardar**
4. **Borrar** → confirmar → desaparece del listado
