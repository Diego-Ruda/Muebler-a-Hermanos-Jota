import express from 'express';
import productos from '../data/productos.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json(productos);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const producto = productos.find((item) => String(item.id) === id);

  if (!producto) {
    return res.status(404).json({ mensaje: 'Producto no encontrado' });
  }

  return res.status(200).json(producto);
});

export default router;
