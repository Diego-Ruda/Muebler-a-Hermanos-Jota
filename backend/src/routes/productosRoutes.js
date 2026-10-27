import express from 'express';
import {
  getProductos,
  getProductoPorId,
  crearProducto,
} from '../controllers/productosController.js';

const router = express.Router();

router.get('/', getProductos);
router.get('/:id', getProductoPorId);
router.post('/', crearProducto);

export default router;
