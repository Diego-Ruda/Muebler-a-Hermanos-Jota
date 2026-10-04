# Mueblería Hermanos Jota — E-Commerce Fullstack

Proyecto integrador fullstack cuyo objetivo es simular una tienda interactiva de muebles artesanales y sustentables, abarcando tanto el frontend moderno (React) como un backend robusto (Node.js + Express.js). El equipo trabajó colaborativamente usando Trello e issues para gestión ágil y herramientas como Prettier, Husky y commitlint para mantener la calidad y orden del código.

---

## 👥 Integrantes del Equipo

* **Integrante 1**: Diego Ruda — *GitHub: [@Diego-Ruda](https://github.com/Diego-Ruda)*
* **Integrante 2**: Ruth Carrasco — *GitHub: [@rutth03](https://github.com/rutth03)*
* **Integrante 3**: Ailin Arancibia — *GitHub: [@linarancibia](https://github.com/linarancibia)*
* **Integrante 4**: Juan Andres Tarragona — *GitHub: [@JuanTarra](https://github.com/JuanTarra)*
* **Integrante 5**: Maxi Moncada — *GitHub: [@Maxidevv](https://github.com/Maxidevv)*

> **Sprint 3 y 4 — Trabajo colaborativo, gestión en Trello, 17 issues resueltas (gestión, nuevas features, bugs, testing, refactorización y QA).*

---

## 🌐 Demo Desplegada

👉 **[Ver Hermanos Jota en vivo](https://muebleriahermanoj.netlify.app/)**

---

## 📋 Descripción y Funcionalidades

El sistema implementa:

- **Frontend moderno en React:**
  - Listado, detalle y carrito mediante componentes reutilizables.
  - Hooks propios (custom hooks) para manejo de estado y datos.
  - Ruteo dinámico con React Router.
  - Interfaz mobile-first.
  - Validaciones y UI enfocada en la experiencia del usuario.

- **Backend sólido con Node.js + Express.js:**
  - API RESTful centralizada, facilita la integración y escalabilidad.
  - Control de rutas, middlewares y lógica desacoplada.
  - Manejo y almacenamiento de datos de productos, simulando respuesta de base de datos.
  - CORS habilitado para integración frontend-backend durante desarrollo.

- **Herramientas y calidad:**
  - **Prettier:** Formateo automático de código consistente.
  - **Husky + lint-staged + commitlint:** Hooks de pre-commit y validación de convenciones para mantener la base limpia.
  - **Trello:** Gestión ágil con 17 issues resueltas, trabajo continuo y equipo multidisciplinario.
  - **Git y GitHub:** Control de versiones, trabajo por ramas, revisiones colaborativas.

---

## 📂 Estructura del Proyecto

```
Muebler-a-Hermanos-Jota/
├── backend/
│   ├── src/
│   │   ├── server.js            # Servidor Express
│   │   ├── routes/              # Rutas de la API REST
│   │   ├── data/                # Datos simulados
│   │   └── middlewares/         # Middlewares personalizados
│   └── package.json             # Dependencias y scripts backend
│
├── client/
│   ├── src/
│   │   ├── components/          # Componentes React reutilizables
│   │   ├── pages/               # Páginas principales (catálogo, contacto, etc.)
│   │   ├── hooks/               # Custom hooks
│   │   ├── styles.css           # Estilos globales
│   │   ├── App.js, index.js     # Entradas de la app
│   └── package.json             # Dependencias y scripts frontend
│
├── .husky/                      # Hooks git (pre-commit, commit-msg)
├── .prettierrc, .prettierignore # Reglas y exclusiones de Prettier
└── README.md                    # Documentación (este archivo)
```

---

## 🚀 Instalación y Puesta en Marcha

1. **Clona el repositorio:**

```bash
git clone https://github.com/tu-usuario/Muebler-a-Hermanos-Jota.git
cd Muebler-a-Hermanos-Jota
```

2. **Instala dependencias** para ambos entornos:

```bash
# Backend
cd backend && npm install

# Frontend
cd ../client && npm install
```

3. **Inicia ambos servidores en terminales separadas:**

```bash
# Backend (Puerto 3000 por default)
npm start

# Frontend (Puerto 5173, proxy al backend)
npm start
```

4. Accede a `http://localhost:5173` para la app React — el frontend consumirá el backend en `http://localhost:3000`.

---

## 📦 Scripts Útiles

- **Frontend (client):**
  - `npm start`: Ejecuta la app React en desarrollo.
  - `npm run build`: Compila la app para producción.
  - `npm test`: Ejecuta los tests.

- **Backend (backend):**
  - `npm start`: Levanta la API Express.

---

## 🛡️ Herramientas y Workflow Adoptado

- **Prettier:** Autoformatea archivos *.js y *.jsx para mantener uniformidad.
- **Husky:** Previene commits con formato incorrecto ejecutando scripts de chequeo (`pre-commit`, `commit-msg`).
- **lint-staged:** Solo analiza y repara lo que se va a commitear.
- **commitlint:** Fuerza convenciones en los mensajes de commit según las buenas prácticas.
- **Trello:** Gestión ágil. Se resolvieron 17 issues (features, bugs, mejora UI, QA, etc.).
- **Control de versiones:** Flujo git semi trunk-based, trabajo en ramas cortas y merges frecuentes.

---

## 📌 Notas y Recomendaciones

- Sugerido tener Node.js v20+ instalado.
- Usar siempre `npm install` al cambiar de rama principal.
- ¡Revisá las issues y tareas resueltas en Trello para ver la evolución del trabajo colaborativo!

---

## 📝 Licencia

MIT — Ver archivo LICENSE.

---

## 🔗 Gestión del Proyecto y Issues

Todo el seguimiento de tareas, bugs, nuevas features y trabajo semanal se gestionó en:

👉 **[Trello — Hermanos Jota Sprint 3-4: Issues y organización (invitado, solo lectura)](https://trello.com/invite/b/6ab55c145297c632712ef631/ATTIe347149249543921b7c949892a8b4787641365F7/hermanos-jota-sprint-3-4)**

Podés revisar ahí todas las issues resueltas y el trabajo en equipo distribuido (al menos 17 issues, entre funcionalidades, correcciones y mejoras UI/UX).

---

*Para dudas, sugerencias o más información, contactá a cualquiera de los integrantes del equipo.*
