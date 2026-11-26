import express from 'express';
import { crearMensajeContacto } from '../controllers/contactoController.js';

const router = express.Router();

router.post('/', crearMensajeContacto);

export default router;
