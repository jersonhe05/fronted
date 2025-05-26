import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Users, CheckSquare, MessageSquare, Plus } from 'lucide-react';
import styles from './TeacherHome.module.css';

const TeacherHome = () => {
  const recentAnnouncements = [
    { 
      id: 1, 
      title: 'Anuncio sobre nuevos recursos', 
      date: '2023-05-15', 
      content: 'Se han añadido nuevos recursos educativos para todos los cursos de ingeniería.'
    },
    { 
      id: 2, 
      title: 'Cambio en horario de asesorías', 
      date: '2023-05-12', 
      content: 'Las asesorías de matemáticas cambiarán de horario a partir de la próxima semana.'
    }
  ];

  const upcomingDeadlines = [
    { 
      id: 1, 
      course: 'Inglés III - G16', 
      title: 'Entrega del proyecto final', 
      date: '2023-05-25' 
    },
    { 
      id: 2, 
      course: 'Sistemas Operativos', 
      title: 'Examen parcial', 
      date: '2023-05-20' 
    }
  ];

  const teacherStats = [
    { label: 'Cursos Activos', value: 4, icon: <Book size={24} /> },
    { label: 'Estudiantes', value: 120, icon: <Users size={24} /> },
    { label: 'Tareas Pendientes', value: 8, icon: <CheckSquare size={24} /> },
    { label: 'Foros Activos', value: 5, icon: <MessageSquare size={24} /> }
  ];

  return (
    <div className={styles.teacherHome}>
      <div className={styles.pageHeader}>
        <h1>Dashboard del Profesor</h1>
        <p>Bienvenido de nuevo, Juan Pérez</p>
      </div>

      <div className={styles.statsGrid}>
        {teacherStats.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <div className={styles.statIcon}>{stat.icon}</div>
            <div className={styles.statInfo}>
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.dashboardGrid}>
        <div className={styles.gridItem}>
          <div className={styles.cardHeader}>
            <h2>Mis Cursos</h2>
            <Link to="/teacher/courses" className={styles.viewAllLink}>
              Ver todos
            </Link>
          </div>
          <div className={styles.courseList}>
            <Link to="/teacher/content" className={styles.courseCard}>
              <div className={styles.courseInfo}>
                <h3>Inglés III</h3>
                <p>G16 - Aeronáutica</p>
                <span className={styles.studentCount}>32 estudiantes</span>
              </div>
            </Link>
            <Link to="/teacher/content" className={styles.courseCard}>
              <div className={styles.courseInfo}>
                <h3>Sistemas Operativos</h3>
                <p>G2 - Aeronáutica</p>
                <span className={styles.studentCount}>28 estudiantes</span>
              </div>
            </Link>
            <Link to="/teacher/content" className={styles.courseCard}>
              <div className={styles.courseInfo}>
                <h3>Ingeniería de Software</h3>
                <p>G4 - Sistemas</p>
                <span className={styles.studentCount}>35 estudiantes</span>
              </div>
            </Link>
          </div>
        </div>

        <div className={styles.gridItem}>
          <div className={styles.cardHeader}>
            <h2>Anuncios Recientes</h2>
            <button className={styles.addButton}>
              <Plus size={16} /> Nuevo
            </button>
          </div>
          <div className={styles.announcementList}>
            {recentAnnouncements.map((announcement) => (
              <div key={announcement.id} className={styles.announcementCard}>
                <div className={styles.announcementHeader}>
                  <h3>{announcement.title}</h3>
                  <span className={styles.announcementDate}>{announcement.date}</span>
                </div>
                <p>{announcement.content}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.gridItem}>
          <div className={styles.cardHeader}>
            <h2>Próximas Entregas</h2>
            <Link to="/teacher/grades" className={styles.viewAllLink}>
              Ver todas
            </Link>
          </div>
          <div className={styles.deadlineList}>
            {upcomingDeadlines.map((deadline) => (
              <div key={deadline.id} className={styles.deadlineCard}>
                <div className={styles.deadlineHeader}>
                  <h3>{deadline.title}</h3>
                  <span className={styles.deadlineDate}>{deadline.date}</span>
                </div>
                <p className={styles.courseName}>{deadline.course}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.gridItem}>
          <div className={styles.cardHeader}>
            <h2>Actividad Reciente</h2>
          </div>
          <div className={styles.activityList}>
            <div className={styles.activityItem}>
              <div className={styles.activityIcon}>
                <CheckSquare size={16} />
              </div>
              <div className={styles.activityContent}>
                <p>Has calificado 5 tareas en <strong>Inglés III</strong></p>
                <span className={styles.activityTime}>Hace 2 horas</span>
              </div>
            </div>
            <div className={styles.activityItem}>
              <div className={styles.activityIcon}>
                <MessageSquare size={16} />
              </div>
              <div className={styles.activityContent}>
                <p>Nuevo mensaje en el foro de <strong>Sistemas Operativos</strong></p>
                <span className={styles.activityTime}>Hace 5 horas</span>
              </div>
            </div>
            <div className={styles.activityItem}>
              <div className={styles.activityIcon}>
                <Plus size={16} />
              </div>
              <div className={styles.activityContent}>
                <p>Has añadido contenido nuevo a <strong>Ingeniería de Software</strong></p>
                <span className={styles.activityTime}>Ayer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherHome;