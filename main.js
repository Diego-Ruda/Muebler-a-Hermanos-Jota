document.addEventListener("DOMContentLoaded", () => {
  renderFeaturedProducts();
});

function renderFeaturedProducts() {
  const container = document.getElementById("products-container");

  // los productos con destacado: true
  const featured = products.filter(product => product.destacado === true);

  // Formateador de moneda argentina
  const formatter = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0
  });

  // Renderizar los productos inmediatamente
  featured.forEach(product => {
    const card = document.createElement("article");
    card.classList.add("product-card");

    card.innerHTML = `
      <img src="${product.imagen}" alt="${product.nombre}" class="product-image" />
      <div class="product-info">
        <h3 class="product-title">${product.nombre}</h3>
        <p class="product-desc">${product.descripcion}</p>
        <div class="product-footer">
          <span class="product-price">${formatter.format(product.precio)}</span>
          <a href="producto.html?id=${product.id}" class="product-link">Ver detalle</a>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}



/*  Mostrar productos en el productos.html  */

document.addEventListener("DOMContentLoaded", () => {
  renderCatalogProducts();
});

function renderCatalogProducts() {
  const container = document.getElementById("catalog-products-container");

  if (!container) {
    return;
  }

  const formatter = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0
  });

  products.forEach(product => {
    const card = document.createElement("article");
    card.classList.add("product-card");

    card.innerHTML = `
      <img src="${product.imagen}" alt="${product.nombre}" class="product-image" />
      <div class="product-info">
        <h3 class="product-title">${product.nombre}</h3>
        <p class="product-desc">${product.descripcion}</p>
        <div class="product-footer">
          <span class="product-price">${formatter.format(product.precio)}</span>
          <a href="producto.html?id=${product.id}" class="product-link">Ver detalle</a>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}