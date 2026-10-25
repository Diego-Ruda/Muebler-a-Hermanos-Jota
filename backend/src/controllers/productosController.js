import mongoose from 'mongoose';
import Product from '../models/Product.js';

export async function getProductos(req, res) {
  try {
    const productos = await Product.find().sort({ createdAt: 1, _id: 1 });
    return res.status(200).json(productos);
  } catch (error) {
    console.error('Error al obtener los productos:', error.message);
    return res.status(500).json({ mensaje: 'Error al obtener los productos' });
  }
}

export async function getProductoPorId(req, res) {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ mensaje: 'ID de producto inválido' });
  }

  try {
    const producto = await Product.findById(id);

    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    return res.status(200).json(producto);
  } catch (error) {
    console.error('Error al obtener el producto:', error.message);
    return res.status(500).json({ mensaje: 'Error al obtener el producto' });
  }
}
