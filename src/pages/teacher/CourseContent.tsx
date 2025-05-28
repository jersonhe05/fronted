import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { File, Plus, Book, CheckSquare, Users, MessageSquare, BarChart, X, Upload } from 'lucide-react';
import styles from './CourseContent.module.css';

const CourseContent = () => {
  const location = useLocation();
  const [currentModule, setCurrentModule] = useState(1);
  const [modules, setModules] = useState([
    { id: 1, name: 'Phrasal Verbs' },
    { id: 2, name: 'Indefinite Articles' },
    { id: 3, name: 'Nouns' },
  ]);
  const [showNewModuleModal, setShowNewModuleModal] = useState(false);
  const [showNewContentModal, setShowNewContentModal] = useState(false);
  const [newModuleName, setNewModuleName] = useState('');
  const [newContent, setNewContent] = useState({
    title: '',
    description: '',
    type: 'text',
    file: null as File | null
  });

  const handleAddModule = (e: React.FormEvent) => {
    e.preventDefault();
    const newModule = {
      id: modules.length + 1,
      name: newModuleName
    };
    setModules([...modules, newModule]);
    setNewModuleName('');
    setShowNewModuleModal(false);
  };

  const handleAddContent = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would add the content to the current module
    console.log('New content:', newContent);
    setShowNewContentModal(false);
    setNewContent({
      title: '',
      description: '',
      type: 'text',
      file: null
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewContent({
        ...newContent,
        file: e.target.files[0]
      });
    }
  };

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
            <button 
              className={styles.addModuleButton}
              onClick={() => setShowNewModuleModal(true)}
            >
              <Plus size={16} />
            </button>
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
            <h2>
              {modules.find(m => m.id === currentModule)?.name}
            </h2>
            <button 
              className={styles.addContentButton}
              onClick={() => setShowNewContentModal(true)}
            >
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

      {showNewModuleModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Nuevo Módulo</h2>
              <button 
                className={styles.closeButton}
                onClick={() => setShowNewModuleModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddModule}>
              <div className={styles.modalBody}>
                <div className={styles.formGroup}>
                  <label htmlFor="moduleName">Nombre del módulo</label>
                  <input
                    type="text"
                    id="moduleName"
                    value={newModuleName}
                    onChange={(e) => setNewModuleName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className={styles.modalFooter}>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => setShowNewModuleModal(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className={styles.createButton}>
                  Crear Módulo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showNewContentModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Agregar Contenido</h2>
              <button 
                className={styles.closeButton}
                onClick={() => setShowNewContentModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddContent}>
              <div className={styles.modalBody}>
                <div className={styles.formGroup}>
                  <label htmlFor="contentTitle">Título</label>
                  <input
                    type="text"
                    id="contentTitle"
                    value={newContent.title}
                    onChange={(e) => setNewContent({...newContent, title: e.target.value})}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="contentDescription">Descripción</label>
                  <textarea
                    id="contentDescription"
                    value={newContent.description}
                    onChange={(e) => setNewContent({...newContent, description: e.target.value})}
                    rows={3}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="contentType">Tipo de contenido</label>
                  <select
                    id="contentType"
                    value={newContent.type}
                    onChange={(e) => setNewContent({...newContent, type: e.target.value})}
                  >
                    <option value="text">Texto</option>
                    <option value="file">Archivo</option>
                    <option value="link">Enlace</option>
                  </select>
                </div>

                {newContent.type === 'file' && (
                  <div className={styles.formGroup}>
                    <label htmlFor="contentFile">Archivo</label>
                    <label className={styles.fileInput} htmlFor="contentFile">
                      <Upload className={styles.fileInputIcon} size={20} />
                      <span className={styles.fileInputText}>
                        {newContent.file
                          ? newContent.file.name
                          : 'Haz clic para subir un archivo'}
                      </span>
                      <input
                        type="file"
                        id="contentFile"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>
                )}
              </div>
              <div className={styles.modalFooter}>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => setShowNewContentModal(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className={styles.createButton}>
                  Agregar Contenido
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseContent;