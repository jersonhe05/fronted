import React, { useState } from 'react';
import { Search, Filter, Download, Edit } from 'lucide-react';
import styles from './Grades.module.css';

const Grades = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('Inglés III - G16');

  const courses = [
    'Inglés III - G16',
    'Sistemas Operativos - G2',
    'Ingeniería de Software - G4'
  ];

  const students = [
    { 
      id: 1, 
      name: 'Ana María González', 
      assignments: [
        { name: 'Tarea 1', score: 95, maxScore: 100 },
        { name: 'Tarea 2', score: 85, maxScore: 100 },
        { name: 'Quiz 1', score: 90, maxScore: 100 }
      ],
      totalScore: 90
    },
    { 
      id: 2, 
      name: 'Carlos Rodríguez', 
      assignments: [
        { name: 'Tarea 1', score: 80, maxScore: 100 },
        { name: 'Tarea 2', score: 85, maxScore: 100 },
        { name: 'Quiz 1', score: 75, maxScore: 100 }
      ],
      totalScore: 80
    },
    { 
      id: 3, 
      name: 'Diana Martínez', 
      assignments: [
        { name: 'Tarea 1', score: 100, maxScore: 100 },
        { name: 'Tarea 2', score: 95, maxScore: 100 },
        { name: 'Quiz 1', score: 95, maxScore: 100 }
      ],
      totalScore: 97
    },
    { 
      id: 4, 
      name: 'Eduardo Sánchez', 
      assignments: [
        { name: 'Tarea 1', score: 70, maxScore: 100 },
        { name: 'Tarea 2', score: 65, maxScore: 100 },
        { name: 'Quiz 1', score: 80, maxScore: 100 }
      ],
      totalScore: 72
    },
    { 
      id: 5, 
      name: 'Fernanda López', 
      assignments: [
        { name: 'Tarea 1', score: 90, maxScore: 100 },
        { name: 'Tarea 2', score: 85, maxScore: 100 },
        { name: 'Quiz 1', score: 88, maxScore: 100 }
      ],
      totalScore: 88
    }
  ];

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const assignments = [
    { name: 'Tarea 1', type: 'Tarea', maxScore: 100, published: true },
    { name: 'Tarea 2', type: 'Tarea', maxScore: 100, published: true },
    { name: 'Quiz 1', type: 'Quiz', maxScore: 100, published: true },
    { name: 'Proyecto Final', type: 'Proyecto', maxScore: 100, published: false }
  ];

  return (
    <div className={styles.gradesPage}>
      <div className={styles.pageHeader}>
        <div className={styles.headerInfo}>
          <h1>Calificaciones</h1>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className={styles.courseSelector}
          >
            {courses.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.exportButton}>
            <Download size={16} /> Exportar
          </button>
        </div>
      </div>

      <div className={styles.gradesLayout}>
        <div className={styles.gradesHeader}>
          <div className={styles.searchBox}>
            <Search size={16} />
            <input
              type="text"
              placeholder="Buscar estudiante..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className={styles.gradeStats}>
            <div className={styles.statItem}>
              <span className={styles.statValue}>
                {students.length}
              </span>
              <span className={styles.statLabel}>Estudiantes</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>
                {assignments.length}
              </span>
              <span className={styles.statLabel}>Actividades</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>
                {Math.round(students.reduce((sum, student) => sum + student.totalScore, 0) / students.length)}
              </span>
              <span className={styles.statLabel}>Promedio</span>
            </div>
          </div>
        </div>

        <div className={styles.assignmentsList}>
          <h2>Actividades</h2>
          <table className={styles.assignmentsTable}>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Puntaje Máximo</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment, index) => (
                <tr key={index}>
                  <td>{assignment.name}</td>
                  <td>{assignment.type}</td>
                  <td>{assignment.maxScore}</td>
                  <td>
                    <span className={`${styles.status} ${assignment.published ? styles.statusPublished : styles.statusDraft}`}>
                      {assignment.published ? 'Publicado' : 'Borrador'}
                    </span>
                  </td>
                  <td>
                    <button className={styles.actionButton}>
                      <Edit size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.studentGradesList}>
          <h2>Calificaciones de Estudiantes</h2>
          <div className={styles.gradeTableContainer}>
            <table className={styles.gradeTable}>
              <thead>
                <tr>
                  <th className={styles.studentNameHeader}>Estudiante</th>
                  {assignments.filter(a => a.published).map((assignment, index) => (
                    <th key={index}>{assignment.name}</th>
                  ))}
                  <th>Calificación Final</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td className={styles.studentName}>{student.name}</td>
                    {student.assignments.map((assignment, index) => (
                      <td key={index} className={styles.assignmentScore}>
                        <div className={styles.scoreWrapper}>
                          <span className={styles.score}>{assignment.score}</span>
                          <span className={styles.maxScore}>/{assignment.maxScore}</span>
                        </div>
                      </td>
                    ))}
                    <td className={styles.totalScore}>
                      <span className={`${styles.score} ${getScoreClass(student.totalScore)}`}>
                        {student.totalScore}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

function getScoreClass(score: number): string {
  if (score >= 90) return styles.excellentScore;
  if (score >= 80) return styles.goodScore;
  if (score >= 70) return styles.averageScore;
  return styles.poorScore;
}

export default Grades;