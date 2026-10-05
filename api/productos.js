import productos from '../backend/src/data/productos.js';

// Serverless Function de Vercel.
// Reemplaza al route handler de Express en produccion,
// reutilizando el mismo modulo de datos (fuente unica de verdad).
export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ mensaje: 'Método no permitido' });
  }

  const { id } = req.query ?? {};

  if (id) {
    const producto = productos.find((item) => String(item.id) === id);

    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    return res.status(200).json(producto);
  }

  return res.status(200).json(productos);
}
