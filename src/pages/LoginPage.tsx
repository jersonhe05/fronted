import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import styles from './LoginPage.module.css';
import { School } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { handleLogin } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await handleLogin({ email, password });
    } catch (error) {
      setError('Error al iniciar sesión. Por favor, verifica tus credenciales.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <div className={styles.loginHeader}>
          <div className={styles.logoContainer}>
            <School size={40} />
          </div>
          <h1>CampusUnimag</h1>
          <p>Aún - Incluyente e innovadora</p>
        </div>

        <div className={styles.loginLinks}>
          <a href="#servicios">Servicios</a>
          <a href="#informacion">Información General</a>
          <a href="#enlaces">Enlaces de Interés</a>
        </div>

        <form className={styles.loginForm} onSubmit={handleSubmit}>
          {error && <div className={styles.errorMessage}>{error}</div>}
          
          <div className={styles.formGroup}>
            <label htmlFor="email">Correo</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ejemplo@unimagdalena.edu.co"
              required
              disabled={isLoading}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={isLoading}
            />
          </div>

          <div className={styles.formGroup}>
            <div className={styles.roleSelector}>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={role === 'student'}
                  onChange={() => setRole('student')}
                  disabled={isLoading}
                />
                <span>Estudiante</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="teacher"
                  checked={role === 'teacher'}
                  onChange={() => setRole('teacher')}
                  disabled={isLoading}
                />
                <span>Profesor</span>
              </label>
            </div>
          </div>

          <button 
            type="submit" 
            className={styles.loginButton}
            disabled={isLoading}
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>

          <div className={styles.forgotPassword}>
            <a href="#forgot-password">¿Olvidaste tu contraseña?</a>
          </div>
        </form>

        <div className={styles.loginFooter}>
          <div className={styles.footerSection}>
            <h3>Servicios</h3>
            <ul>
              <li><a href="#reglamento">Reglamento Universitario</a></li>
              <li><a href="#recursos">Recursos Educativos</a></li>
              <li><a href="#biblioteca">Biblioteca Germán Bula Meyer</a></li>
            </ul>
          </div>
          <div className={styles.footerSection}>
            <h3>Información General</h3>
            <ul>
              <li><a href="#calendario">Calendario Académico</a></li>
              <li><a href="#proteccion">Protección de datos personales</a></li>
              <li><a href="#informes">Informes de gestión</a></li>
            </ul>
          </div>
          <div className={styles.footerSection}>
            <h3>Enlaces de Interés</h3>
            <ul>
              <li><a href="#gobierno">Gobierno en línea</a></li>
              <li><a href="#icfes">Icfes</a></li>
              <li><a href="#ministerio">Ministerio de Educación</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;