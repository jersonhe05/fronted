import React, { useState } from 'react';
import { Plus, Search, Filter, Book } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './TeacherCourses.module.css';

const TeacherCourses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterActive, setFilterActive] = useState(false);

  const courses = [
    {
      id: 1,
      name: 'Inglés III',
      code: 'G16',
      program: 'Aeronáutica',
      students: 32,
      schedule: 'Lunes y Miércoles 10:00 - 12:00',
      active: true,
    },
    {
      id: 2,
      name: 'Sistemas Operativos',
      code: 'G2',
      program: 'Aeronáutica',
      students: 28,
      schedule: 'Martes y Jueves 14:00 - 16:00',
      active: true,
    },
    {
      id: 3,
      name: 'Ingeniería de Software',
      code: 'G4',
      program: 'Sistemas',
      students: 35,
      schedule: 'Lunes y Viernes 16:00 - 18:00',
      active: true,
    },
    {
      id: 4,
      name: 'Programación Web',
      code: 'G1',
      program: 'Sistemas',
      students: 30,
      schedule: 'Miércoles y Viernes 8:00 - 10:00',
      active: true,
    },
    {
      id: 5,
      name: 'Redes de Computadoras',
      code: 'G3',
      program: 'Telecomunicaciones',
      students: 25,
      schedule: 'Martes y Jueves 10:00 - 12:00',
      active: false,
    }
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       course.code.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       course.program.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = !filterActive || course.active;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className={styles.coursesPage}>
      <div className={styles.pageHeader}>
        <h1>Mis Cursos</h1>
        <button className={styles.newCourseButton}>
          <Plus size={16} /> Nuevo Curso
        </button>
      </div>

      <div className={styles.filtersContainer}>
        <div className={styles.searchBox}>
          <Search size={18} />
          <input
            type="text"
            placeholder="Buscar cursos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button 
          className={`${styles.filterButton} ${filterActive ? styles.filterActive : ''}`}
          onClick={() => setFilterActive(!filterActive)}
        >
          <Filter size={18} />
          <span>Cursos Activos</span>
        </button>
      </div>

      <div className={styles.coursesList}>
        {filteredCourses.map((course) => (
          <Link to="/teacher/content\" key={course.id} className={styles.courseCard}>
            <div className={styles.courseIcon}>
              <Book size={24} />
            </div>
            <div className={styles.courseDetails}>
              <div className={styles.courseHeader}>
                <h3>{course.name}</h3>
                <span className={`${styles.courseStatus} ${course.active ? styles.statusActive : styles.statusInactive}`}>
                  {course.active ? 'Activo' : 'Inactivo'}
                </span>
              </div>
              <div className={styles.courseInfo}>
                <span className={styles.courseCode}>{course.code}</span>
                <span className={styles.programName}>{course.program}</span>
              </div>
              <div className={styles.courseStats}>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Estudiantes:</span>
                  <span className={styles.statValue}>{course.students}</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Horario:</span>
                  <span className={styles.statValue}>{course.schedule}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TeacherCourses;