import express from 'express';
import {
  getProductos,
  getProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from '../controllers/productosController.js';
import { verificarToken } from '../middlewares/authMiddleware.js';
import { authorizeRoles } from '../middlewares/roleMiddleware.js';
import { ROLES } from '../constants/roles.js';

const router = express.Router();

router.get('/', getProductos);
router.get('/:id', getProductoPorId);
router.post('/', verificarToken, authorizeRoles(ROLES.ADMIN), crearProducto);
router.put(
  '/:id',
  verificarToken,
  authorizeRoles(ROLES.ADMIN),
  actualizarProducto
);
router.patch(
  '/:id',
  verificarToken,
  authorizeRoles(ROLES.ADMIN),
  actualizarProducto
);
router.delete(
  '/:id',
  verificarToken,
  authorizeRoles(ROLES.ADMIN),
  eliminarProducto
);

export default router;
