import { Link, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, isLoading, role } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <main>
        <p className="producto-loading" role="status">
          Validando sesión…
        </p>
      </main>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return (
      <main>
        <section className="container access-denied" role="alert">
          <h1>Acceso denegado</h1>
          <p>No tienes permisos para acceder a esta sección.</p>
          <Link className="btn-primary" to="/">
            Volver al inicio
          </Link>
        </section>
      </main>
    );
  }

  return children;
}

export default ProtectedRoute;
