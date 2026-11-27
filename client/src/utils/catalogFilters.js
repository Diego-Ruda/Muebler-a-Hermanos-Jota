export const CATEGORY_OPTIONS = [
  {
    id: 'todas',
    label: 'Todas',
    description: 'Ver todas las piezas disponibles',
  },
  {
    id: 'almacenamiento',
    label: 'Almacenamiento',
    description: 'Aparadores y bibliotecas',
  },
  {
    id: 'asientos',
    label: 'Asientos',
    description: 'Sillones, sillas y sofás',
  },
  {
    id: 'mesas',
    label: 'Mesas',
    description: 'De centro, comedor y noche',
  },
  {
    id: 'oficina',
    label: 'Oficina',
    description: 'Escritorios y sillas de trabajo',
  },
];

export const SORT_OPTIONS = [
  { id: 'ninguno', label: 'Ninguno' },
  { id: 'precio-asc', label: 'Ascendente' },
  { id: 'precio-desc', label: 'Descendente' },
];

const normalizeText = (value) =>
  String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

const normalizeSku = (value) => normalizeText(value).replace(/[^a-z0-9]/g, '');

const getPrice = (product) => {
  const price = Number(product?.precio);
  return Number.isFinite(price) ? price : 0;
};

const parseMaxPrice = (value) => {
  const cleaned = String(value ?? '').replace(/[^\d.,]/g, '');

  if (!cleaned) {
    return null;
  }

  let normalized = cleaned;

  if (cleaned.includes(',') && cleaned.includes('.')) {
    normalized =
      cleaned.lastIndexOf(',') > cleaned.lastIndexOf('.')
        ? cleaned.replace(/\./g, '').replace(',', '.')
        : cleaned.replace(/,/g, '');
  } else if (cleaned.includes(',')) {
    const parts = cleaned.split(',');
    normalized =
      parts.length === 2 && parts[1].length <= 2
        ? `${parts[0]}.${parts[1]}`
        : cleaned.replace(/,/g, '');
  } else if (cleaned.includes('.')) {
    normalized = /^\d{1,3}(\.\d{3})+$/.test(cleaned)
      ? cleaned.replace(/\./g, '')
      : cleaned;
  }

  const amount = Number(normalized);
  return Number.isFinite(amount) ? amount : null;
};

export function sanitizeMaxPrice(value) {
  return String(value ?? '').replace(/[^\d.]/g, '');
}

export function getProductSku(product) {
  return String(product?.sku ?? product?.SKU ?? product?.codigo ?? '').trim();
}

const CATEGORY_BY_SKU_PREFIX = {
  ALM: 'almacenamiento',
  ASI: 'asientos',
  MES: 'mesas',
  OFI: 'oficina',
};

function getProductCategory(product) {
  const declaredCategory = normalizeText(product?.categoria).trim();

  if (declaredCategory) {
    return declaredCategory;
  }

  const prefix = getProductSku(product).slice(0, 3).toUpperCase();

  if (CATEGORY_BY_SKU_PREFIX[prefix]) {
    return CATEGORY_BY_SKU_PREFIX[prefix];
  }

  const name = normalizeText(product?.nombre);

  if (/\b(oficina|escritorio|silla de trabajo)\b/.test(name)) {
    return 'oficina';
  }

  if (
    /\b(aparador|biblioteca|estanter|estante|comoda|armario|guardarropa|buffet)\b/.test(
      name
    )
  ) {
    return 'almacenamiento';
  }

  if (/\b(sillon|butaca|sofa|sillas|silla|banqueta|reposera)\b/.test(name)) {
    return 'asientos';
  }

  if (/\b(mesa|mesita)\b/.test(name)) {
    return 'mesas';
  }

  return '';
}

export function hasProductsWithinMaxPrice(products = [], maxPrice = '') {
  const amount = parseMaxPrice(maxPrice);

  if (amount === null) {
    return true;
  }

  return products.some((product) => getPrice(product) <= amount);
}

export function filterProducts(products = [], options = {}) {
  const {
    query = '',
    sort = null,
    maxPrice = '',
    category = 'todas',
  } = options;
  const normalizedQuery = normalizeText(query).trim();
  const normalizedSkuQuery = normalizeSku(query);
  const normalizedCategory = normalizeText(category).trim();
  const parsedMaxPrice = parseMaxPrice(maxPrice);
  const hasMaxPrice = parsedMaxPrice !== null;

  const queryFiltered = products.filter((product) => {
    const matchesQuery =
      !normalizedQuery ||
      normalizeText(product?.nombre).includes(normalizedQuery) ||
      (normalizedSkuQuery.length > 0 &&
        normalizeSku(getProductSku(product)).includes(normalizedSkuQuery));
    const matchesCategory =
      normalizedCategory === 'todas' ||
      getProductCategory(product) === normalizedCategory;

    return matchesQuery && matchesCategory;
  });

  let filtered = queryFiltered;
  let usedClosestFallback = false;

  if (hasMaxPrice) {
    const withinBudget = queryFiltered.filter(
      (product) => getPrice(product) <= parsedMaxPrice
    );

    if (withinBudget.length > 0) {
      filtered = withinBudget;
    } else {
      filtered = queryFiltered
        .filter((product) => getPrice(product) > parsedMaxPrice)
        .sort((first, second) => getPrice(first) - getPrice(second))
        .slice(0, 3);
      usedClosestFallback = true;
    }
  }

  if (usedClosestFallback) {
    return filtered;
  }

  if (sort === 'precio-asc') {
    return filtered.sort((first, second) => getPrice(first) - getPrice(second));
  }

  if (sort === 'precio-desc') {
    return filtered.sort((first, second) => getPrice(second) - getPrice(first));
  }

  return filtered;
}
