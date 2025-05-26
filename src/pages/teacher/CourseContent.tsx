import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { File, Plus, Book, CheckSquare, Users, MessageSquare, BarChart } from 'lucide-react';
import styles from './CourseContent.module.css';

const CourseContent = () => {
  const location = useLocation();
  const [currentModule, setCurrentModule] = useState(1);

  return (
    <div className={styles.courseContentPage}>
      <div className={styles.pageHeader}>
        <div className={styles.courseInfo}>
          <h1>Inglés III - G16</h1>
          <p>Facultad de Ingeniería - Aeronáutica</p>
        </div>
        <div className={styles.courseTabs}>
          <Link 
            to="/teacher/content" 
            className={`${styles.courseTab} ${location.pathname === '/teacher/content' ? styles.activeTab : ''}`}
          >
            <Book size={18} />
            <span>Contenido</span>
          </Link>
          <Link 
            to="/teacher/attendance" 
            className={`${styles.courseTab} ${location.pathname === '/teacher/attendance' ? styles.activeTab : ''}`}
          >
            <CheckSquare size={18} />
            <span>Asistencia</span>
          </Link>
          <Link 
            to="/teacher/forums" 
            className={`${styles.courseTab} ${location.pathname === '/teacher/forums' ? styles.activeTab : ''}`}
          >
            <MessageSquare size={18} />
            <span>Foros</span>
          </Link>
          <Link 
            to="/teacher/grades" 
            className={`${styles.courseTab} ${location.pathname === '/teacher/grades' ? styles.activeTab : ''}`}
          >
            <BarChart size={18} />
            <span>Calificaciones</span>
          </Link>
          <Link 
            to="/student" 
            className={`${styles.courseTab} ${location.pathname === '/student' ? styles.activeTab : ''}`}
          >
            <Users size={18} />
            <span>Estudiantes</span>
          </Link>
        </div>
      </div>

      <div className={styles.contentLayout}>
        <div className={styles.contentSidebar}>
          <div className={styles.sidebarHeader}>
            <h2>Módulos</h2>
            <button className={styles.addModuleButton}>
              <Plus size={16} />
            </button>
          </div>
          <ul className={styles.moduleList}>
            <li className={`${styles.moduleItem} ${currentModule === 1 ? styles.activeModule : ''}`} onClick={() => setCurrentModule(1)}>
              <span className={styles.moduleNumber}>1</span>
              <span className={styles.moduleName}>Phrasal Verbs</span>
            </li>
            <li className={`${styles.moduleItem} ${currentModule === 2 ? styles.activeModule : ''}`} onClick={() => setCurrentModule(2)}>
              <span className={styles.moduleNumber}>2</span>
              <span className={styles.moduleName}>Indefinite Articles</span>
            </li>
            <li className={`${styles.moduleItem} ${currentModule === 3 ? styles.activeModule : ''}`} onClick={() => setCurrentModule(3)}>
              <span className={styles.moduleNumber}>3</span>
              <span className={styles.moduleName}>Nouns</span>
            </li>
            <li className={styles.moduleItem}>
              <span className={styles.moduleNumber}>+</span>
              <span className={styles.moduleName}>Agregar Módulo</span>
            </li>
          </ul>
        </div>

        <div className={styles.contentMain}>
          <div className={styles.contentHeader}>
            <h2>
              {currentModule === 1 && 'Phrasal Verbs'}
              {currentModule === 2 && 'Indefinite Articles'}
              {currentModule === 3 && 'Nouns'}
            </h2>
            <button className={styles.addContentButton}>
              <Plus size={16} /> Agregar Contenido
            </button>
          </div>

          {currentModule === 1 && (
            <div className={styles.moduleContent}>
              <div className={styles.contentSection}>
                <h3>Descripción</h3>
                <p>En este módulo aprenderemos qué son los Phrasal Verbs en inglés y cómo utilizarlos correctamente en diferentes contextos.</p>
              </div>

              <div className={styles.contentSection}>
                <div className={styles.sectionHeader}>
                  <h3>Recursos</h3>
                  <button className={styles.addResourceButton}>
                    <Plus size={16} /> Agregar
                  </button>
                </div>
                <div className={styles.resourcesList}>
                  <div className={styles.resourceItem}>
                    <div className={styles.resourceIcon}>
                      <File size={20} />
                    </div>
                    <div className={styles.resourceInfo}>
                      <h4>Presentación: Introducción a los Phrasal Verbs</h4>
                      <p>Presentación en PowerPoint con ejemplos y explicaciones</p>
                    </div>
                    <div className={styles.resourceActions}>
                      <button className={styles.resourceButton}>Editar</button>
                      <button className={styles.resourceButton}>Eliminar</button>
                    </div>
                  </div>
                  <div className={styles.resourceItem}>
                    <div className={styles.resourceIcon}>
                      <File size={20} />
                    </div>
                    <div className={styles.resourceInfo}>
                      <h4>Documento: Lista de Phrasal Verbs comunes</h4>
                      <p>Documento PDF con los 50 phrasal verbs más utilizados</p>
                    </div>
                    <div className={styles.resourceActions}>
                      <button className={styles.resourceButton}>Editar</button>
                      <button className={styles.resourceButton}>Eliminar</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.contentSection}>
                <div className={styles.sectionHeader}>
                  <h3>Actividades</h3>
                  <button className={styles.addResourceButton}>
                    <Plus size={16} /> Agregar
                  </button>
                </div>
                <div className={styles.activitiesList}>
                  <div className={styles.activityItem}>
                    <div className={styles.activityHeader}>
                      <h4>Tarea: Ejercicios de Phrasal Verbs</h4>
                      <div className={styles.activityMeta}>
                        <span className={styles.activityType}>Tarea</span>
                        <span className={styles.activityDate}>Fecha límite: 15/05/2023</span>
                      </div>
                    </div>
                    <p>Completar los ejercicios 1-10 sobre los phrasal verbs presentados en clase.</p>
                    <div className={styles.activityStats}>
                      <span>Entregas: 15/32</span>
                      <span>Calificadas: 10/15</span>
                    </div>
                    <div className={styles.activityActions}>
                      <button className={styles.activityButton}>Editar</button>
                      <button className={styles.activityButton}>Ver entregas</button>
                    </div>
                  </div>
                  <div className={styles.activityItem}>
                    <div className={styles.activityHeader}>
                      <h4>Quiz: Evaluación de Phrasal Verbs</h4>
                      <div className={styles.activityMeta}>
                        <span className={styles.activityType}>Quiz</span>
                        <span className={styles.activityDate}>Fecha: 18/05/2023</span>
                      </div>
                    </div>
                    <p>Quiz en línea de 20 preguntas para evaluar el conocimiento de los phrasal verbs estudiados.</p>
                    <div className={styles.activityStats}>
                      <span>Completados: 20/32</span>
                      <span>Calificación promedio: 85/100</span>
                    </div>
                    <div className={styles.activityActions}>
                      <button className={styles.activityButton}>Editar</button>
                      <button className={styles.activityButton}>Ver resultados</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentModule === 2 && (
            <div className={styles.moduleContent}>
              <div className={styles.contentSection}>
                <h3>Descripción</h3>
                <p>En este módulo estudiaremos los artículos indefinidos en inglés y sus usos correctos.</p>
              </div>
              
              <div className={styles.contentPlaceholder}>
                <p>Agregue recursos y actividades para este módulo.</p>
              </div>
            </div>
          )}

          {currentModule === 3 && (
            <div className={styles.moduleContent}>
              <div className={styles.contentSection}>
                <h3>Descripción</h3>
                <p>En este módulo estudiaremos los sustantivos en inglés, incluyendo sustantivos contables e incontables.</p>
              </div>
              
              <div className={styles.contentPlaceholder}>
                <p>Agregue recursos y actividades para este módulo.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseContent;