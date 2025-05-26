import React, { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, Book, Calendar, MessageSquare, CheckSquare, Users, Settings } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import styles from './Layout.module.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { userRole, handleLogout } = useUser();
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const teacherNavItems = [
    { path: '/teacher', label: 'Dashboard', icon: <Book size={20} /> },
    { path: '/teacher/courses', label: 'Mis Cursos', icon: <Book size={20} /> },
    { path: '/teacher/content', label: 'Contenido', icon: <Book size={20} /> },
    { path: '/teacher/attendance', label: 'Asistencia', icon: <CheckSquare size={20} /> },
    { path: '/teacher/grades', label: 'Calificaciones', icon: <CheckSquare size={20} /> },
    { path: '/teacher/forums', label: 'Foros', icon: <MessageSquare size={20} /> },
  ];

  const studentNavItems = [
    { path: '/student', label: 'Dashboard', icon: <Book size={20} /> },
    { path: '/student/courses', label: 'Mis Cursos', icon: <Book size={20} /> },
    { path: '/student/assignments', label: 'Asignaciones', icon: <CheckSquare size={20} /> },
    { path: '/student/forums', label: 'Foros', icon: <MessageSquare size={20} /> },
    { path: '/student/grades', label: 'Calificaciones', icon: <CheckSquare size={20} /> },
  ];

  const navItems = userRole === 'teacher' ? teacherNavItems : studentNavItems;

  return (
    <div className={styles.layout}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerLeft}>
            <button className={styles.menuButton} onClick={toggleSidebar}>
              <Menu size={24} />
            </button>
            <div className={styles.logo}>
              <Link to={userRole === 'teacher' ? '/teacher' : '/student'}>
                <h1>CampusUnimag</h1>
                <p>Aún - Incluyente e innovadora</p>
              </Link>
            </div>
          </div>
          <div className={styles.headerRight}>
            <div className={styles.userInfo}>
              <span className={styles.userName}>Juan Perez</span>
              <span className={styles.userRole}>
                {userRole === 'teacher' ? 'Profesor' : 'Estudiante'} - Ingeniería Aeronáutica
              </span>
            </div>
            <div className={styles.userAvatar}>
              <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" alt="User" />
            </div>
            <button className={styles.logoutButton} onClick={handleLogout}>
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <h2>Menu</h2>
          <button className={styles.closeSidebarButton} onClick={closeSidebar}>
            <X size={24} />
          </button>
        </div>
        <nav className={styles.sidebarNav}>
          <ul>
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`${styles.navLink} ${
                    location.pathname === item.path ? styles.active : ''
                  }`}
                  onClick={closeSidebar}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.sidebarFooter}>
          <button className={styles.settingsButton}>
            <Settings size={20} />
            <span>Configuración</span>
          </button>
          <button className={styles.logoutButtonSidebar} onClick={handleLogout}>
            <LogOut size={20} />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className={styles.main}>
        {isSidebarOpen && <div className={styles.overlay} onClick={closeSidebar}></div>}
        <div className={styles.mainContent}>{children}</div>
      </main>
    </div>
  );
};

export default Layout;