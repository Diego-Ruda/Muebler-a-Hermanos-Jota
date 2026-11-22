import express from 'express';
import { obtenerPerfil } from '../controllers/usuariosController.js';
import { verificarToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/profile', verificarToken, obtenerPerfil);

export default router;
