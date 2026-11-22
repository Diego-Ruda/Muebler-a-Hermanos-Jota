import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/User.js';
import { VALID_ROLES } from '../constants/roles.js';

function obtenerToken(req) {
  const authorization = req.headers?.authorization;

  if (typeof authorization !== 'string') {
    return null;
  }

  const match = authorization.match(/^Bearer\s+(.+)$/i);
  return match ? match[1].trim() : null;
}

export async function autenticarToken(req) {
  const token = obtenerToken(req);

  if (!token) {
    return {
      error: {
        status: 401,
        body: { mensaje: 'Token de autenticación requerido' },
      },
    };
  }

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    console.error('JWT_SECRET no está definida en las variables de entorno');
    return {
      error: {
        status: 500,
        body: { mensaje: 'Error de configuración de autenticación' },
      },
    };
  }

  let payload;

  try {
    payload = jwt.verify(token, jwtSecret);
  } catch (error) {
    const vencido = error.name === 'TokenExpiredError';

    return {
      error: {
        status: 401,
        body: {
          mensaje: vencido ? 'Token expirado' : 'Token inválido',
        },
      },
    };
  }

  if (!payload?.id || !mongoose.isValidObjectId(payload.id)) {
    return {
      error: {
        status: 401,
        body: { mensaje: 'Token inválido' },
      },
    };
  }

  try {
    const usuario = await User.findById(payload.id).select('nombre email role');

    if (!usuario) {
      return {
        error: {
          status: 401,
          body: { mensaje: 'Usuario no encontrado' },
        },
      };
    }

    if (!VALID_ROLES.includes(usuario.role)) {
      return {
        error: {
          status: 401,
          body: { mensaje: 'Rol de usuario inválido' },
        },
      };
    }

    return {
      usuario: {
        id: usuario._id.toString(),
        nombre: usuario.nombre,
        email: usuario.email,
        role: usuario.role,
      },
    };
  } catch (error) {
    console.error('Error al buscar el usuario autenticado:', error.message);
    return {
      error: {
        status: 500,
        body: { mensaje: 'Error al verificar la autenticación' },
      },
    };
  }
}

export async function verificarToken(req, res, next) {
  const { usuario, error } = await autenticarToken(req);

  if (error) {
    return res.status(error.status).json(error.body);
  }

  req.usuario = usuario;
  req.user = usuario;

  return next();
}
