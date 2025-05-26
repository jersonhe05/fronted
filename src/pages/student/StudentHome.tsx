import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Calendar, CheckSquare, FileText, Upload } from 'lucide-react';
import styles from './StudentHome.module.css';

const StudentHome = () => {
  const announcements = [
    {
      id: 1,
      title: 'Diamante dios en la semana Cultural',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      date: '2023-05-15',
    },
    {
      id: 2,
      title: 'Nuevo programa Académico en área de Ingeniería del futuro',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      date: '2023-05-12',
    },
    {
      id: 3,
      title: 'Nueva radio universitaria para difundir los temas de estudio sobre el diseño en juego del aula magistral',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      date: '2023-05-10',
    }
  ];

  const courses = [
    {
      id: 1,
      name: 'Inglés III',
      code: 'G16',
      program: 'Aeronáutica',
      image: 'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 2,
      name: 'Sistemas Operativos',
      code: 'G2',
      program: 'Aeronáutica',
      image: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    },
    {
      id: 3,
      name: 'Ingeniería de Software',
      code: 'G4',
      program: 'Aeronáutica',
      image: 'https://images.pexels.com/photos/177598/pexels-photo-177598.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    }
  ];

  const upcomingAssignments = [
    {
      id: 1,
      title: 'Tarea 3: Gramática avanzada',
      course: 'Inglés III',
      dueDate: '2023-05-20',
    },
    {
      id: 2,
      title: 'Proyecto: Virtualización',
      course: 'Sistemas Operativos',
      dueDate: '2023-05-25',
    }
  ];

  const recentContent = [
    {
      id: 1,
      title: 'Phrasal Verbs',
      course: 'Inglés III',
      type: 'Documento',
      date: '2023-05-15',
    },
    {
      id: 2,
      title: 'Indefinite Articles',
      course: 'Inglés III',
      type: 'Presentación',
      date: '2023-05-14',
    },
    {
      id: 3,
      title: 'Nouns',
      course: 'Inglés III',
      type: 'Documento',
      date: '2023-05-12',
    }
  ];

  return (
    <div className={styles.studentHome}>
      <div className={styles.pageHeader}>
        <h1>Dashboard del Estudiante</h1>
        <p>Bienvenido de nuevo, Juan Pérez</p>
      </div>

      <div className={styles.dashboardGrid}>
        <div className={styles.gridItem}>
          <div className={styles.cardHeader}>
            <h2>Anuncios</h2>
          </div>
          <div className={styles.announcementsList}>
            {announcements.map((announcement) => (
              <div key={announcement.id} className={styles.announcementCard}>
                <div className={styles.announcementHeader}>
                  <h3>{announcement.title}</h3>
                  <span className={styles.announcementDate}>{announcement.date}</span>
                </div>
                <p>{announcement.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.gridItem}>
          <div className={styles.cardHeader}>
            <h2>Mis Cursos</h2>
            <Link to="/student/courses" className={styles.viewAllLink}>
              Ver todos
            </Link>
          </div>
          <div className={styles.coursesList}>
            {courses.map((course) => (
              <Link to={`/student/courses/${course.id}`} key={course.id} className={styles.courseCard}>
                <div className={styles.courseImage}>
                  <img src={course.image} alt={course.name} />
                </div>
                <div className={styles.courseInfo}>
                  <h3>{course.name}</h3>
                  <p>{course.code} - {course.program}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className={styles.gridItem}>
          <div className={styles.cardHeader}>
            <h2>Próximas Entregas</h2>
            <Link to="/student/assignments" className={styles.viewAllLink}>
              Ver todas
            </Link>
          </div>
          <div className={styles.assignmentsList}>
            {upcomingAssignments.map((assignment) => (
              <div key={assignment.id} className={styles.assignmentCard}>
                <div className={styles.assignmentIcon}>
                  <Calendar size={20} />
                </div>
                <div className={styles.assignmentInfo}>
                  <h3>{assignment.title}</h3>
                  <p>{assignment.course}</p>
                  <div className={styles.assignmentMeta}>
                    <span className={styles.dueDate}>Fecha límite: {assignment.dueDate}</span>
                    <button className={styles.submitButton}>
                      <Upload size={14} /> Entregar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.gridItem}>
          <div className={styles.cardHeader}>
            <h2>Contenido Reciente</h2>
          </div>
          <div className={styles.contentList}>
            {recentContent.map((content) => (
              <div key={content.id} className={styles.contentCard}>
                <div className={styles.contentIcon}>
                  <FileText size={20} />
                </div>
                <div className={styles.contentInfo}>
                  <h3>{content.title}</h3>
                  <p>{content.course}</p>
                  <div className={styles.contentMeta}>
                    <span className={styles.contentType}>{content.type}</span>
                    <span className={styles.contentDate}>{content.date}</span>
                  </div>
                </div>
                <button className={styles.downloadButton}>
                  <span>Descargar</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHome;