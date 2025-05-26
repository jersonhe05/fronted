import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Book, CheckSquare, MessageSquare, BarChart, Upload, Download, FileText } from 'lucide-react';
import styles from './CourseDetails.module.css';

const CourseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [currentTab, setCurrentTab] = useState('content');
  const [currentModule, setCurrentModule] = useState(1);

  const course = {
    id: 1,
    name: 'Inglés III',
    code: 'G16',
    program: 'Aeronáutica',
    instructor: 'Arnoldo Iguaran',
    description: 'Este curso tiene como finalidad enseñar a dominar inglés'
  };

  const modules = [
    { id: 1, name: 'Phrasal Verbs' },
    { id: 2, name: 'Indefinite Articles' },
    { id: 3, name: 'Nouns' },
  ];

  const moduleContent = {
    1: [
      { id: 1, title: 'Presentación: Introducción a los Phrasal Verbs', type: 'file', fileType: 'pdf' },
      { id: 2, title: 'Documento: Lista de Phrasal Verbs comunes', type: 'file', fileType: 'doc' },
      { id: 3, title: 'Tarea: Ejercicios de Phrasal Verbs', type: 'assignment', dueDate: '2023-05-20' },
      { id: 4, title: 'Quiz: Evaluación de Phrasal Verbs', type: 'quiz', dueDate: '2023-05-18' },
    ],
    2: [
      { id: 5, title: 'Presentación: Artículos indefinidos', type: 'file', fileType: 'pdf' },
      { id: 6, title: 'Quiz: Práctica de artículos', type: 'quiz', dueDate: '2023-05-25' },
    ],
    3: [
      { id: 7, title: 'Documento: Sustantivos en inglés', type: 'file', fileType: 'pdf' },
      { id: 8, title: 'Tarea: Clasificación de sustantivos', type: 'assignment', dueDate: '2023-05-30' },
    ],
  };

  const quizzes = [
    { id: 1, title: 'Quiz 1', module: 'Phrasal Verbs', dueDate: '2023-05-18', status: 'completed', grade: 85 },
    { id: 2, title: 'Quiz 2', module: 'Indefinite Articles', dueDate: '2023-05-25', status: 'pending' },
  ];

  const assignments = [
    { id: 1, title: 'Asignación 1', module: 'Phrasal Verbs', dueDate: '2023-05-20', status: 'submitted', submittedDate: '2023-05-15' },
    { id: 2, title: 'Asignación 2', module: 'Nouns', dueDate: '2023-05-30', status: 'pending' },
  ];

  return (
    <div className={styles.courseDetailsPage}>
      <div className={styles.pageHeader}>
        <div className={styles.courseInfo}>
          <h1>{course.name} - {course.code}</h1>
          <p>Facultad de Ingeniería - {course.program}</p>
          <div className={styles.instructorInfo}>
            <span className={styles.instructorLabel}>Docente:</span>
            <span className={styles.instructorName}>{course.instructor}</span>
          </div>
        </div>
        <div className={styles.courseTabs}>
          <button 
            className={`${styles.courseTab} ${currentTab === 'content' ? styles.activeTab : ''}`}
            onClick={() => setCurrentTab('content')}
          >
            <Book size={18} />
            <span>Contenido</span>
          </button>
          <button 
            className={`${styles.courseTab} ${currentTab === 'assignments' ? styles.activeTab : ''}`}
            onClick={() => setCurrentTab('assignments')}
          >
            <CheckSquare size={18} />
            <span>Asignaciones</span>
          </button>
          <button 
            className={`${styles.courseTab} ${currentTab === 'quizzes' ? styles.activeTab : ''}`}
            onClick={() => setCurrentTab('quizzes')}
          >
            <CheckSquare size={18} />
            <span>Quizzes</span>
          </button>
          <button 
            className={`${styles.courseTab} ${currentTab === 'forums' ? styles.activeTab : ''}`}
            onClick={() => setCurrentTab('forums')}
          >
            <MessageSquare size={18} />
            <span>Foros</span>
          </button>
          <button 
            className={`${styles.courseTab} ${currentTab === 'grades' ? styles.activeTab : ''}`}
            onClick={() => setCurrentTab('grades')}
          >
            <BarChart size={18} />
            <span>Calificaciones</span>
          </button>
        </div>
      </div>

      {currentTab === 'content' && (
        <div className={styles.contentLayout}>
          <div className={styles.contentSidebar}>
            <div className={styles.sidebarHeader}>
              <h2>Módulos</h2>
            </div>
            <ul className={styles.moduleList}>
              {modules.map((module) => (
                <li 
                  key={module.id} 
                  className={`${styles.moduleItem} ${currentModule === module.id ? styles.activeModule : ''}`}
                  onClick={() => setCurrentModule(module.id)}
                >
                  <span className={styles.moduleNumber}>{module.id}</span>
                  <span className={styles.moduleName}>{module.name}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.contentMain}>
            <div className={styles.contentHeader}>
              <h2>{modules.find(m => m.id === currentModule)?.name}</h2>
            </div>

            <div className={styles.moduleContentList}>
              {moduleContent[currentModule as keyof typeof moduleContent].map((item) => (
                <div key={item.id} className={styles.contentItem}>
                  <div className={styles.contentItemIcon}>
                    {item.type === 'file' && <FileText size={20} />}
                    {item.type === 'assignment' && <CheckSquare size={20} />}
                    {item.type === 'quiz' && <CheckSquare size={20} />}
                  </div>
                  <div className={styles.contentItemInfo}>
                    <h3>{item.title}</h3>
                    {item.type !== 'file' && (
                      <div className={styles.contentItemMeta}>
                        <span className={styles.dueDate}>Fecha límite: {item.dueDate}</span>
                      </div>
                    )}
                  </div>
                  <div className={styles.contentItemActions}>
                    {item.type === 'file' && (
                      <button className={styles.downloadButton}>
                        <Download size={16} /> Descargar
                      </button>
                    )}
                    {item.type === 'assignment' && (
                      <button className={styles.submitButton}>
                        <Upload size={16} /> Entregar
                      </button>
                    )}
                    {item.type === 'quiz' && (
                      <button className={styles.startButton}>
                        Iniciar
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {currentTab === 'assignments' && (
        <div className={styles.assignmentsTab}>
          <h2>Asignaciones</h2>
          <div className={styles.assignmentsList}>
            {assignments.map((assignment) => (
              <div key={assignment.id} className={styles.assignmentItem}>
                <div className={styles.assignmentHeader}>
                  <h3>{assignment.title}</h3>
                  <span className={`${styles.status} ${styles[`status${assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}`]}`}>
                    {assignment.status === 'pending' && 'Pendiente'}
                    {assignment.status === 'submitted' && 'Entregada'}
                    {assignment.status === 'graded' && 'Calificada'}
                  </span>
                </div>
                <div className={styles.assignmentDetails}>
                  <span className={styles.moduleName}>{assignment.module}</span>
                  <span className={styles.dueDate}>Fecha límite: {assignment.dueDate}</span>
                  {assignment.submittedDate && (
                    <span className={styles.submittedDate}>Entregada: {assignment.submittedDate}</span>
                  )}
                </div>
                <div className={styles.assignmentActions}>
                  {assignment.status === 'pending' && (
                    <button className={styles.submitButton}>
                      <Upload size={16} /> Entregar
                    </button>
                  )}
                  {assignment.status === 'submitted' && (
                    <button className={styles.viewButton}>
                      Ver Entrega
                    </button>
                  )}
                  {assignment.status === 'graded' && (
                    <button className={styles.viewButton}>
                      Ver Retroalimentación
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {currentTab === 'quizzes' && (
        <div className={styles.quizzesTab}>
          <h2>Quizzes</h2>
          <div className={styles.quizzesList}>
            {quizzes.map((quiz) => (
              <div key={quiz.id} className={styles.quizItem}>
                <div className={styles.quizHeader}>
                  <h3>{quiz.title}</h3>
                  <span className={`${styles.status} ${styles[`status${quiz.status.charAt(0).toUpperCase() + quiz.status.slice(1)}`]}`}>
                    {quiz.status === 'pending' && 'Pendiente'}
                    {quiz.status === 'completed' && 'Completado'}
                  </span>
                </div>
                <div className={styles.quizDetails}>
                  <span className={styles.moduleName}>{quiz.module}</span>
                  <span className={styles.dueDate}>Fecha límite: {quiz.dueDate}</span>
                  {quiz.grade && (
                    <span className={styles.grade}>Calificación: {quiz.grade}/100</span>
                  )}
                </div>
                <div className={styles.quizActions}>
                  {quiz.status === 'pending' && (
                    <button className={styles.startButton}>
                      Iniciar Quiz
                    </button>
                  )}
                  {quiz.status === 'completed' && (
                    <button className={styles.viewButton}>
                      Ver Resultados
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;