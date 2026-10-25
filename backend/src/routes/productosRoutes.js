import express from 'express';
import mongoose from 'mongoose';
import Product from '../models/Product.js';

const router = express.Router();

// Issue 04: GET /api/productos
router.get('/', async (req, res) => {
  try {
    const productos = await Product.find();
    return res.status(200).json(productos);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ mensaje: 'Error al obtener los productos' });
  }
});

// Issue 05: GET /api/productos/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ mensaje: 'ID inválido' });
  }

  try {
    const producto = await Product.findById(id);

    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    return res.status(200).json(producto);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ mensaje: 'Error al obtener el producto' });
  }
});

export default router;
