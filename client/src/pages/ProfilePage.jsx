import { useAuth } from '../auth/AuthContext';

function ProfilePage() {
  const { user, role } = useAuth();

  return (
    <main>
      <section className="page-hero container">
        <span className="section-tag">MI CUENTA</span>
        <h1>PERFIL</h1>
      </section>
      <section className="container auth-container">
        <div className="form-card profile-card">
          <p>
            <strong>Nombre:</strong> {user.nombre}
          </p>
          <p>
            <strong>Correo electrónico:</strong> {user.email}
          </p>
          <p>
            <strong>Rol:</strong> {role}
          </p>
        </div>
      </section>
    </main>
  );
}

export default ProfilePage;
