import React, { useState } from 'react';
import { Plus, Search, Filter, Book, X, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './TeacherCourses.module.css';

const TeacherCourses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterActive, setFilterActive] = useState(false);
  const [showNewCourseModal, setShowNewCourseModal] = useState(false);
  const [courses, setCourses] = useState<Array<{
    id: number;
    name: string;
    code: string;
    program: string;
    students: number;
    schedule: string[];
    active: boolean;
    description: string;
    semester: string;
    faculty: string;
    syllabus: File | null;
  }>>([]);

  const [newCourseData, setNewCourseData] = useState({
    name: '',
    code: '',
    description: '',
    semester: '2025-I',
    faculty: '',
    schedule: [] as string[],
    syllabus: null as File | null,
    status: 'active'
  });

  const semesters = ['2025-I', '2025-II'];
  const faculties = ['Ingeniería', 'Educación', 'Salud'];
  const scheduleOptions = [
    'Lunes 8:00-10:00',
    'Lunes 10:00-12:00',
    'Martes 8:00-10:00',
    'Martes 10:00-12:00',
    'Miércoles 8:00-10:00',
    'Miércoles 10:00-12:00',
    'Jueves 8:00-10:00',
    'Jueves 10:00-12:00',
    'Viernes 8:00-10:00',
    'Viernes 10:00-12:00'
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       course.code.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       course.program.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = !filterActive || course.active;
    return matchesSearch && matchesFilter;
  });

  const handleNewCourseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCourse = {
      id: Date.now(),
      ...newCourseData,
      students: 0,
      active: newCourseData.status === 'active',
      program: newCourseData.faculty
    };

    setCourses([...courses, newCourse]);
    setShowNewCourseModal(false);
    setNewCourseData({
      name: '',
      code: '',
      description: '',
      semester: '2025-I',
      faculty: '',
      schedule: [],
      syllabus: null,
      status: 'active'
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewCourseData({
        ...newCourseData,
        syllabus: e.target.files[0]
      });
    }
  };

  const handleScheduleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setNewCourseData({
      ...newCourseData,
      schedule: value
    });
  };

  return (
    <div className={styles.coursesPage}>
      <div className={styles.pageHeader}>
        <h1>Mis Cursos</h1>
        <button 
          className={styles.newCourseButton}
          onClick={() => setShowNewCourseModal(true)}
        >
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
        {filteredCourses.length === 0 ? (
          <div className={styles.emptyState}>
            <Book size={48} />
            <h2>No hay cursos disponibles</h2>
            <p>Comience creando un nuevo curso haciendo clic en el botón "Nuevo Curso"</p>
          </div>
        ) : (
          filteredCourses.map((course) => (
            <Link to="/teacher/content" key={course.id} className={styles.courseCard}>
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
                    <span className={styles.statValue}>{course.schedule.join(', ')}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>

      {showNewCourseModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Crear Nuevo Curso</h2>
              <button 
                className={styles.closeButton}
                onClick={() => setShowNewCourseModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleNewCourseSubmit}>
              <div className={styles.modalBody}>
                <div className={styles.formGroup}>
                  <label htmlFor="courseName">Nombre del curso</label>
                  <input
                    type="text"
                    id="courseName"
                    value={newCourseData.name}
                    onChange={(e) => setNewCourseData({...newCourseData, name: e.target.value})}
                    required
                    placeholder="Ej: Inglés III"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="courseCode">Código del curso</label>
                  <input
                    type="text"
                    id="courseCode"
                    value={newCourseData.code}
                    onChange={(e) => setNewCourseData({...newCourseData, code: e.target.value})}
                    required
                    placeholder="Ej: G16"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="courseDescription">Descripción</label>
                  <textarea
                    id="courseDescription"
                    value={newCourseData.description}
                    onChange={(e) => setNewCourseData({...newCourseData, description: e.target.value})}
                    rows={3}
                    placeholder="Describa brevemente el curso..."
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="courseSemester">Semestre / Período</label>
                  <select
                    id="courseSemester"
                    value={newCourseData.semester}
                    onChange={(e) => setNewCourseData({...newCourseData, semester: e.target.value})}
                    required
                  >
                    {semesters.map((semester) => (
                      <option key={semester} value={semester}>
                        {semester}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="courseFaculty">Facultad o Programa académico</label>
                  <select
                    id="courseFaculty"
                    value={newCourseData.faculty}
                    onChange={(e) => setNewCourseData({...newCourseData, faculty: e.target.value})}
                    required
                  >
                    <option value="">Seleccionar facultad</option>
                    {faculties.map((faculty) => (
                      <option key={faculty} value={faculty}>
                        {faculty}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="courseSchedule">Horario de clases</label>
                  <select
                    id="courseSchedule"
                    multiple
                    value={newCourseData.schedule}
                    onChange={handleScheduleChange}
                    className={styles.multiSelect}
                  >
                    {scheduleOptions.map((schedule) => (
                      <option key={schedule} value={schedule}>
                        {schedule}
                      </option>
                    ))}
                  </select>
                  <small className={styles.helpText}>Mantén presionado Ctrl/Cmd para seleccionar múltiples horarios</small>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="courseSyllabus">Syllabus o plan de curso</label>
                  <label className={styles.fileInput} htmlFor="courseSyllabus">
                    <Upload className={styles.fileInputIcon} size={20} />
                    <span className={styles.fileInputText}>
                      {newCourseData.syllabus
                        ? newCourseData.syllabus.name
                        : 'Haz clic para subir el syllabus'}
                    </span>
                    <input
                      type="file"
                      id="courseSyllabus"
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                      accept=".pdf,.doc,.docx"
                    />
                  </label>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="courseStatus">Estado del curso</label>
                  <select
                    id="courseStatus"
                    value={newCourseData.status}
                    onChange={(e) => setNewCourseData({...newCourseData, status: e.target.value})}
                    required
                  >
                    <option value="active">Activo</option>
                    <option value="preparation">En preparación</option>
                    <option value="closed">Cerrado</option>
                  </select>
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => setShowNewCourseModal(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className={styles.createButton}>
                  Crear Curso
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherCourses;