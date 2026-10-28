import express from 'express';
import {
  getProductos,
  getProductoPorId,
  crearProducto,
  actualizarProducto,
} from '../controllers/productosController.js';

const router = express.Router();

router.get('/', getProductos);
router.get('/:id', getProductoPorId);
router.post('/', crearProducto);
router.put('/:id', actualizarProducto);

export default router;
