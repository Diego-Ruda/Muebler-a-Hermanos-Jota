# Mueblería Hermanos Jota — E-Commerce

Proyecto integrador de desarrollo web frontend desarrollado para simular la experiencia completa de compra y catálogo interactivo de una mueblería artesanal y sustentable de diseño atemporal, sin requerir conexión a un servidor backend.

---

## 👥 Integrantes del Equipo

* **Integrante 1**: Diego Ruda — *GitHub: [@Diego-Ruda](https://github.com/Diego-Ruda)*
* **Integrante 2**: Ruth Carrasco — *GitHub: [@rutth03](https://github.com/rutth03)*
* **Integrante 3**: Lin Arancibia — *GitHub: [@linarancibia](https://github.com/linarancibia)*
* **Integrante 4**: Juan Andres Tarragona — *GitHub: [@JuanTarra](https://github.com/JuanTarra)*

> **Entrega**: Fin del Sprint 2

---

## 🌐 Demo Desplegada

El sitio web se encuentra publicado y accesible en el siguiente enlace de hosting estático:
👉 **[Ver Hermanos Jota en vivo](https://muebleriahermanoj.netlify.app/)**

---

## 📋 Descripción y Funcionalidades del Proyecto

El proyecto implementa una arquitectura 100% del lado del cliente (Client-side), estructurada mediante HTML5 semántico, estilizada con CSS3 bajo la metodología Mobile-First y dotada de interactividad mediante JavaScript Vanilla y manipulación activa del DOM.

### 1. Página de Inicio (`index.html`)
* **Header & Navegación**: Barra superior con logotipo, enlaces de navegación y botón de carrito interactivo con contador reactivo. Incluye menú desplegable accesible (hamburguesa) en dispositivos móviles.
* **Hero Banner**: Presentación institucional de impacto con llamada a la acción (*Call to Action*).
* **Sección de Sustentabilidad**: Tarjetas de características (*Madera noble*, *Acabados limpios*, *Hecho en CABA*).
* **Carrusel de Piezas Destacadas**: Renderizado dinámico de productos marcados con la propiedad `destacado: true`, con controles de desplazamiento horizontal suave (*smooth scroll*).
* **Footer**: Información de contacto, dirección del showroom en San Cristóbal (CABA), redes sociales y derechos reservados.

### 2. Catálogo Completo (`productos.html`)
* **Grilla Responsiva**: Visualización de todos los artículos del catálogo en formato de tarjetas adaptables.
* **Carga de Datos Centralizada**: Los datos provienen de una colección estructurada de objetos en JavaScript (`productos.js`).
* **Navegación al Detalle**: Cada tarjeta enlaza de forma dinámica a su correspondiente vista de detalle pasando el parámetro identificador por URL (`?id=X`).

### 3. Detalle de Producto (`producto.html`)
* **Lectura de Parámetros URL**: Mediante `URLSearchParams`, el script identifica el producto solicitado y extrae su información del catálogo.
* **Ficha Técnica Completa**: Muestra imágenes en alta calidad, título, precio formateado en moneda local (`Intl.NumberFormat`), descripción y detalles de fabricación sustentable.
* **Añadir al Carrito**: Botón interactivo que incorpora el ítem seleccionado al carrito de compras persistente.

### 4. Carrito de Compras Lateral (*Drawer*) & Persistencia (`cart.js`)
* **Sidebar Desplegable**: Panel lateral accesible desde cualquier página mediante el botón del header o al agregar un producto.
* **Control de Unidades y Subtotales**: Permite aumentar, disminuir o remover unidades de cada producto en tiempo real, recalculando el total a pagar automáticamente.
* **Persistencia Local**: Uso de `localStorage` para garantizar que el estado del carrito no se pierda entre navegaciones ni recargas.
* **Indicador en Header**: Contador numérico sobre el ícono del carrito con actualización reactiva según la cantidad total de artículos.

### 5. Página de Pedido y Facturación (`pedido.html` / `pedido.js`)
* **Comprobante de Compra**: Generación de factura detallada con número de comprobante aleatorio, fecha del día y desglose de cantidades, precios unitarios y subtotal.
* **Acciones**: Permite eliminar productos individuales o proceder al pago simulado.
* **Exportación a Imagen**: Descarga automática del comprobante de compra en formato `.png` en alta resolución mediante la librería `html2canvas`.

### 6. Página de Contacto (`contacto.html` / `contacto.js`)
* **Información del Showroom**: Detalle de ubicación, canales directos (WhatsApp, Instagram, correos electrónicos) y horarios de atención.
* **Formulario con Validación Client-Side**: Control en tiempo real de campos obligatorios y formato de correo electrónico mediante expresiones regulares (Regex).
* **Registro de Mensajes**: Simulación de almacenamiento en `localStorage` y retroalimentación visual al usuario ante el envío exitoso.

---

## 🛠️ Tecnologías Utilizadas

* **HTML5**: Estructuración semántica (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`), accesibilidad con atributos ARIA y optimización para lectores de pantalla.
* **CSS3**:
  * Diseño adaptable (*Mobile First* y Media Queries).
  * Flexbox y CSS Grid para layouts fluidos y componentes complejos.
  * Variables CSS (`:root`) para centralizar la paleta de colores, tipografías y espaciados.
  * Transiciones, estados de interacción (`:hover`, `:focus`) y diseño UI minimalista.
* **JavaScript (ES6+)**:
  * Manipulación modular y eficiente del DOM (`querySelector`, `createElement`, `innerHTML`, `classList`).
  * Manejo avanzado de eventos (`addEventListener`, delegación de eventos).
  * Almacenamiento local mediante Web Storage API (`localStorage`).
  * Formateo nativo de monedas e internacionalización (`Intl.NumberFormat`).
  * Manejo de asincronismo y temporizadores.
* **Librerías Externas**:
  * [html2canvas (v1.4.1)](https://html2canvas.hertzen.com/): Generación y exportación visual de la factura de compra a PNG.
* **Control de Versiones**:
  * **Git & GitHub**: Flujo de trabajo colaborativo por ramas y seguimiento de commits por parte de todo el equipo.

---

## 📂 Estructura del Proyecto

```text
muebleria-hermanos-jota/
├── img/                       # Recursos gráficos, logotipos y fotos de piezas
├── index.html                 # Página principal / Landing page
├── productos.html             # Catálogo general de productos
├── producto.html              # Vista de detalle individual de producto
├── contacto.html              # Información de contacto y formulario
├── pedido.html                # Vista de resumen de pedido y facturación
├── styles.css                 # Hoja de estilos global, variables y responsive design
├── productos.js               # Colección de objetos con los datos del catálogo
├── main.js                    # Renderizado del catálogo y carrusel de destacados
├── producto.js                # Lógica de carga de producto por parámetro URL
├── cart.js                    # Lógica global del carrito lateral y persistencia
├── contacto.js                # Validaciones del formulario de contacto
├── pedido.js                  # Lógica de factura, totales y exportación PNG
└── README.md                  # Documentación del proyecto