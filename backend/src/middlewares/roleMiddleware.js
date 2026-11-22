import { VALID_ROLES } from '../constants/roles.js';

export function authorizeRoles(...allowedRoles) {
  if (
    allowedRoles.length === 0 ||
    allowedRoles.some((role) => !VALID_ROLES.includes(role))
  ) {
    throw new TypeError('Se requiere al menos un rol válido para autorizar');
  }

  return function authorizeRole(req, res, next) {
    const user = req.user ?? req.usuario;

    if (!user) {
      return res.status(401).json({ mensaje: 'Autenticación requerida' });
    }

    if (!allowedRoles.includes(user.role)) {
      return res
        .status(403)
        .json({ mensaje: 'No tienes permisos para realizar esta acción' });
    }

    return next();
  };
}
