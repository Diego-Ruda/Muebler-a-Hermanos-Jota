import express from 'express';
import { iniciarSesion } from '../controllers/loginController.js';

const router = express.Router();

router.post('/', iniciarSesion);

export default router;
