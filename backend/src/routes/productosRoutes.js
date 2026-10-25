import express from 'express';
import {
  getProductos,
  getProductoPorId,
} from '../controllers/productosController.js';

const router = express.Router();

router.get('/', getProductos);
router.get('/:id', getProductoPorId);

export default router;
