# Mueblería Hermanos Jota — E-Commerce Fullstack

Proyecto integrador fullstack que simula una tienda interactiva de muebles artesanales y sustentables. La aplicación está dividida en un **frontend SPA en React**, un **backend REST con Node.js + Express.js** y una **base de datos NoSQL en MongoDB** administrada mediante **Mongoose**. El equipo trabajó colaborativamente usando Trello e issues para la gestión ágil, junto con Prettier, Husky y commitlint para mantener la calidad y el orden del código.

---

## 👥 Integrantes del Equipo

- **Integrante 1**: Diego Ruda — _GitHub: [@Diego-Ruda](https://github.com/Diego-Ruda)_
- **Integrante 2**: Ruth Carrasco — _GitHub: [@rutth03](https://github.com/rutth03)_
- **Integrante 3**: Ailin Arancibia — _GitHub: [@linarancibia](https://github.com/linarancibia)_
- **Integrante 4**: Juan Andres Tarragona — _GitHub: [@JuanTarra](https://github.com/JuanTarra)_
- **Integrante 5**: Maxi Moncada — _GitHub: [@Maxidevv](https://github.com/Maxidevv)_

> *_Sprint 5 y 6 — Trabajo colaborativo, gestión en Trello, 19 issues resueltas (gestión, nuevas features, bugs, testing, refactorización y QA)._

---

## 🌐 Demo Desplegada

👉 **[Ver Hermanos Jota en vivo](https://muebler-a-hermanos-jota-phi.vercel.app/)**

| Servicio          | Plataforma        | Descripción                            |
| ----------------- | ----------------- | -------------------------------------- |
| Frontend (React)  | **Vercel**        | SPA pública y panel de administración  |
| Backend (Express) | **Render**        | API REST `/api/productos`              |
| Base de datos     | **MongoDB Atlas** | Persistencia de productos vía Mongoose |

---

## 📋 Descripción y Funcionalidades

El sistema implementa:

- **Frontend moderno en React:**
  - Listado, detalle y carrito mediante componentes reutilizables, con finalización de compra simulada y comprobante descargable.
  - Hooks propios (`useProducts`) para el consumo de la API y el manejo de estado.
  - Ruteo dinámico con React Router (`/`, `/productos`, `/productos/:id`, `/contacto`, `/admin/...`).
  - Panel de administración para **crear, editar y eliminar productos**.
  - Interfaz mobile-first, validaciones y UI enfocada en la experiencia del usuario.

- **Backend sólido con Node.js + Express.js + MongoDB:**
  - API RESTful centralizada y desacoplada en rutas, controladores, modelos y configuración.
  - **MongoDB** como base de datos NoSQL, conectada mediante **Mongoose**.
  - Modelo `Product` con esquema tipado, validaciones (`required`, `min`) y `timestamps`.
  - CRUD completo de productos, manejo de errores y respuestas HTTP consistentes.
  - Script de **seed** para poblar la base de datos a partir de los datos iniciales.
  - Middleware de logging y **CORS** habilitado para la integración con el frontend.
  - Variables de entorno con `dotenv` para credenciales y configuración.

- **Herramientas y calidad:**
  - **Prettier:** Formateo automático de código consistente.
  - **Husky + lint-staged + commitlint:** Hooks de pre-commit y validación de convenciones para mantener la base limpia.
  - **Trello:** Gestión ágil con 19 issues resueltas, trabajo continuo y equipo multidisciplinario.
  - **Git y GitHub:** Control de versiones, trabajo por ramas, revisiones colaborativas.

---

## 🧱 Stack Tecnológico

| Capa          | Tecnologías                                               |
| ------------- | --------------------------------------------------------- |
| Frontend      | React 18, React Router DOM 6, React Scripts (CRA), CSS    |
| Backend       | Node.js 20+, Express 5, Mongoose 9, dotenv, CORS          |
| Base de datos | MongoDB / MongoDB Atlas                                   |
| Calidad       | ESLint, Prettier, Husky, lint-staged, commitlint          |
| Deploy        | Vercel (frontend) · Render (backend) · MongoDB Atlas (DB) |

---

## 📂 Estructura del Proyecto

```
Muebler-a-Hermanos-Jota/
├── backend/
│   ├── public/
│   │   └── img/                     # Imágenes servidas por Express en /img
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                # Conexión reutilizable a MongoDB con Mongoose
│   │   ├── controllers/
│   │   │   └── productosController.js  # Lógica CRUD de productos
│   │   ├── data/
│   │   │   └── productos.js         # Datos iniciales para el seed
│   │   ├── middlewares/
│   │   │   └── loggerMiddleware.js  # Log de cada request
│   │   ├── models/
│   │   │   └── Product.js           # Esquema y modelo de Mongoose
│   │   ├── routes/
│   │   │   └── productosRoutes.js   # Rutas /api/productos
│   │   ├── scripts/
│   │   │   └── seedProductos.js     # Carga/actualiza productos en MongoDB
│   │   └── server.js                # Servidor Express (desarrollo local)
│   ├── .env                         # Variables de entorno (no versionado)
│   └── package.json                 # Dependencias y scripts del backend
│
├── client/
│   ├── public/
│   │   ├── index.html
│   │   └── img/                     # Assets estáticos servidos en /img
│   ├── src/
│   │   ├── components/              # Navbar, Footer, ProductCard, ProductForm, CartPanel, etc.
│   │   ├── config/
│   │   │   └── api.js               # URL base de la API (REACT_APP_API_URL)
│   │   ├── hooks/
│   │   │   └── useProducts.js       # Fetch y estado de productos
│   │   ├── pages/                   # Home, catálogo, contacto, detalle y admin
│   │   ├── App.js                   # Rutas y estado global del carrito
│   │   ├── App.css, styles.css      # Estilos
│   │   └── index.js                 # Entrada de React
│   └── package.json                 # Dependencias y scripts del frontend
│
├── api/
│   └── productos.js                 # Adaptador serverless opcional para Vercel
│
├── vercel.json                      # Build, output y rewrites del frontend
├── .vercelignore                    # Archivos excluidos del upload a Vercel
├── .husky/                          # Hooks git (pre-commit, commit-msg)
├── .prettierrc, .prettierignore     # Reglas y exclusiones de Prettier
├── eslint.config.js                 # Configuración de ESLint
├── commitlint.config.cjs            # Convenciones de mensajes de commit
├── package.json                     # Monorepo (workspaces client + backend)
└── README.md                        # Documentación (este archivo)
```

> **Monorepo:** la raíz define `workspaces` para `client` y `backend`, por lo que los scripts se pueden ejecutar desde la raíz o dentro de cada paquete.

---

## 🔌 API REST

Base URL en producción: `https://backend-muebler-a-hermanos-jota.onrender.com/`

| Método   | Endpoint             | Descripción                              |
| -------- | -------------------- | ---------------------------------------- |
| `GET`    | `/api/productos`     | Lista todos los productos                |
| `GET`    | `/api/productos/:id` | Obtiene un producto por `_id` de MongoDB |
| `POST`   | `/api/productos`     | Crea un producto                         |
| `PUT`    | `/api/productos/:id` | Actualiza un producto                    |
| `DELETE` | `/api/productos/:id` | Elimina un producto                      |

**Modelo `Product`:** `nombre` (requerido), `descripcion`, `precio` (requerido, ≥ 0), `stock` (≥ 0), `imagenUrl`, `medidas`, `detallesFabricacion`, `destacado` (boolean) y `timestamps` (`createdAt` / `updatedAt`).

---

## ☁️ Deploy

El proyecto se despliega de forma **separada**: frontend estático en **Vercel** y backend con base de datos en **Render**.

### 🎨 Frontend en Vercel

- Proyecto de Vercel apuntando al repositorio (Root Directory en la raíz, donde vive `vercel.json`).
- Build: `npm run build --workspace client` → salida en `client/build`.
- Variable de entorno: **`REACT_APP_API_URL`** con la URL pública del backend en Render (ej. `https://tu-backend.onrender.com`). El cliente la consume desde `client/src/config/api.js`.
- El rewrite `/:path((?!api/).*)` → `/index.html` evita el 404 al recargar rutas internas de React Router (`/productos`, `/contacto`, `/producto/:id`) sin interceptar la API.
- `client/public/img` se publica junto al build y se sirve en `/img/*`.

Pasos:

1. Importar el repo en Vercel y dejar el **Root Directory** en la raíz (`.`).
2. Configurar `REACT_APP_API_URL` con la URL del backend en Render.
3. Deploy. Verificar el catálogo y una ruta interna con refresh.

### ⚙️ Backend en Render

- Crear un **Web Service** apuntando al repositorio con **Root Directory** en `backend/`.
- Build Command: `npm install`
- Start Command: `npm start` (levanta `src/server.js`).
- Variables de entorno en Render:
  - `MONGODB_URI`: cadena de conexión de MongoDB Atlas.
  - `PORT`: Render lo inyecta automáticamente (el servidor usa `process.env.PORT`).
- La conexión a MongoDB se realiza con **Mongoose** al iniciar el servidor (`src/config/db.js`); si falla, el proceso termina con error.
- Una vez desplegado, ejecutar el seed para cargar los productos iniciales:

```bash
npm run seed
```

- Verificar que el servicio responda en `/api/productos`.

### 🗄️ Base de datos en MongoDB Atlas

- Crear un cluster y un usuario de base de datos.
- Configurar el acceso de red para permitir conexiones desde Render (o `0.0.0.0/0` para pruebas).
- Copiar la cadena de conexión en `MONGODB_URI` (local y en Render).

> El archivo `api/productos.js` se mantiene como **adaptador serverless opcional** para Vercel. En la arquitectura actual el backend productivo corre en Render y el frontend lo consume directamente mediante `REACT_APP_API_URL`.

---

## 🚀 Instalación y Puesta en Marcha

1. **Clona el repositorio:**

```bash
git clone https://github.com/Diego-Ruda/Muebler-a-Hermanos-Jota.git
cd Muebler-a-Hermanos-Jota
```

2. **Instala dependencias** (el monorepo instala ambos workspaces):

```bash
npm install
```

3. **Configura las variables de entorno del backend** creando `backend/.env`:

```env
MONGODB_URI=mongodb+srv://<usuario>:<password>@<cluster>/<base>
PORT=3000
```

4. **Inicializa la base de datos** con los productos de ejemplo:

```bash
npm run seed --workspace backend
```

5. **Inicia ambos servidores en terminales separadas:**

```bash
# Terminal 1 — API Express (http://localhost:3000)
npm run dev:backend

# Terminal 2 — Frontend (http://localhost:5173)
npm run dev:client
```

6. Accede a `http://localhost:5173`. En desarrollo, CRA usa el `proxy` hacia `http://localhost:3000`; si definís `REACT_APP_API_URL`, el frontend consumirá esa URL.

---

## 📦 Scripts Útiles

- **Raíz (monorepo):**
  - `npm run dev:client`: Levanta el frontend React.
  - `npm run dev:backend`: Levanta la API Express.
  - `npm run build`: Compila el frontend para producción.
  - `npm run lint`: Ejecuta ESLint.
  - `npm run format`: Formatea con Prettier.
  - `npm run seed --workspace backend`: Puebla MongoDB con los productos iniciales.

- **Backend (`backend`):**
  - `npm start`: Levanta la API Express.
  - `npm run seed`: Ejecuta el seed de productos.

- **Frontend (`client`):**
  - `npm start`: Ejecuta la app React en desarrollo (puerto 5173).
  - `npm run build`: Compila la app para producción.
  - `npm test`: Ejecuta los tests.

---

## 🛡️ Herramientas y Workflow Adoptado

- **Prettier:** Autoformatea archivos `*.js` y `*.jsx` para mantener uniformidad.
- **Husky:** Previene commits con formato incorrecto ejecutando scripts de chequeo (`pre-commit`, `commit-msg`).
- **lint-staged:** Solo analiza y repara lo que se va a commitear.
- **commitlint:** Fuerza convenciones en los mensajes de commit según las buenas prácticas.
- **ESLint:** Detección de errores y estilo de código.
- **Trello:** Gestión ágil. Se resolvieron 19 issues (features, bugs, mejora UI, QA, etc.).
- **Control de versiones:** Flujo git semi trunk-based, trabajo en ramas cortas y merges frecuentes.

---

## 📌 Notas y Recomendaciones

- Requiere **Node.js v20+**.
- Usar siempre `npm install` al cambiar de rama principal.
- No versionar el archivo `.env`: contiene credenciales de MongoDB.
- En Render, recordá cargar `MONGODB_URI` y ejecutar el seed la primera vez.
- En Vercel, cada cambio en `REACT_APP_API_URL` requiere un nuevo deploy (las variables de CRA se inyectan en build time).
- ¡Revisá las issues y tareas resueltas en Trello para ver la evolución del trabajo colaborativo!

---

## 📝 Licencia

MIT — Ver archivo LICENSE.

---

## 🔗 Gestión del Proyecto y Issues

Todo el seguimiento de tareas, bugs, nuevas features y trabajo semanal se gestionó en:

👉 **[Trello — Hermanos Jota Sprint 5-6: Issues y organización (invitado, solo lectura)](https://trello.com/invite/b/6ab55c145297c632712ef631/ATTIe347149249543921b7c949892a8b4787641365F7/hermanos-jota-sprint-3-4)**

Podés revisar ahí todas las issues resueltas y el trabajo en equipo distribuido (al menos 19 issues, entre funcionalidades, correcciones y mejoras UI/UX).

---

_Para dudas, sugerencias o más información, contactá a cualquiera de los integrantes del equipo._
