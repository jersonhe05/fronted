import React, { useState } from 'react';
import { Search, Filter, Calendar, Upload, X } from 'lucide-react';
import styles from './Assignments.module.css';

const Assignments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);
  const [submissionData, setSubmissionData] = useState({
    comments: '',
    file: null as File | null
  });

  const courses = [
    { id: 'all', name: 'Todos los cursos' },
    { id: 'ing3', name: 'Inglés III - G16' },
    { id: 'sis2', name: 'Sistemas Operativos - G2' },
    { id: 'ing4', name: 'Ingeniería de Software - G4' }
  ];

  const assignments = [
    {
      id: 1,
      title: 'Asignación 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      course: 'Inglés III - G16',
      courseId: 'ing3',
      dueDate: '2023-05-20',
      status: 'pending',
    },
    {
      id: 2,
      title: 'Asignación 2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      course: 'Inglés III - G16',
      courseId: 'ing3',
      dueDate: '2023-05-25',
      status: 'submitted',
      submittedDate: '2023-05-15',
    },
    {
      id: 3,
      title: 'Proyecto: Virtualización',
      description: 'Crear una máquina virtual con un sistema operativo Linux.',
      course: 'Sistemas Operativos - G2',
      courseId: 'sis2',
      dueDate: '2023-05-30',
      status: 'pending',
    },
    {
      id: 4,
      title: 'Diagrama de clases',
      description: 'Diseñar un diagrama de clases para el sistema propuesto.',
      course: 'Ingeniería de Software - G4',
      courseId: 'ing4',
      dueDate: '2023-06-05',
      status: 'graded',
      submittedDate: '2023-05-10',
      grade: 95,
    }
  ];

  const filteredAssignments = assignments.filter((assignment) => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        assignment.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = selectedCourse === 'all' || assignment.courseId === selectedCourse;
    const matchesStatus = statusFilter === 'all' || assignment.status === statusFilter;
    return matchesSearch && matchesCourse && matchesStatus;
  });

  const handleSubmitAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the submission to your backend
    console.log('Submitting assignment:', {
      assignmentId: selectedAssignment?.id,
      ...submissionData
    });
    
    // Reset form and close modal
    setSubmissionData({
      comments: '',
      file: null
    });
    setShowSubmitModal(false);
    setSelectedAssignment(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSubmissionData({
        ...submissionData,
        file: e.target.files[0]
      });
    }
  };

  const openSubmitModal = (assignment: any) => {
    setSelectedAssignment(assignment);
    setShowSubmitModal(true);
  };

  return (
    <div className={styles.assignmentsPage}>
      <div className={styles.pageHeader}>
        <h1>Mis Asignaciones</h1>
      </div>

      <div className={styles.filtersContainer}>
        <div className={styles.searchBox}>
          <Search size={18} />
          <input
            type="text"
            placeholder="Buscar asignaciones..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className={styles.courseSelector}
        >
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={styles.statusSelector}
        >
          <option value="all">Todos los estados</option>
          <option value="pending">Pendientes</option>
          <option value="submitted">Entregadas</option>
          <option value="graded">Calificadas</option>
        </select>
      </div>

      <div className={styles.assignmentStats}>
        <div className={styles.statItem}>
          <span className={styles.statValue}>
            {assignments.filter(a => a.status === 'pending').length}
          </span>
          <span className={styles.statLabel}>Pendientes</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statValue}>
            {assignments.filter(a => a.status === 'submitted').length}
          </span>
          <span className={styles.statLabel}>Entregadas</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statValue}>
            {assignments.filter(a => a.status === 'graded').length}
          </span>
          <span className={styles.statLabel}>Calificadas</span>
        </div>
      </div>

      <div className={styles.assignmentsList}>
        {filteredAssignments.map((assignment) => (
          <div key={assignment.id} className={styles.assignmentCard}>
            <div className={styles.assignmentHeader}>
              <h2>{assignment.title}</h2>
              <div className={styles.assignmentMeta}>
                <span className={styles.courseName}>{assignment.course}</span>
                <span className={`${styles.status} ${styles[`status${assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}`]}`}>
                  {assignment.status === 'pending' && 'Pendiente'}
                  {assignment.status === 'submitted' && 'Entregada'}
                  {assignment.status === 'graded' && 'Calificada'}
                </span>
              </div>
            </div>
            <div className={styles.assignmentContent}>
              <p>{assignment.description}</p>
              <div className={styles.assignmentDetails}>
                <div className={styles.dateInfo}>
                  <Calendar size={16} />
                  <span>Fecha límite: {assignment.dueDate}</span>
                </div>
                {assignment.status === 'submitted' && (
                  <div className={styles.dateInfo}>
                    <Calendar size={16} />
                    <span>Entregada: {assignment.submittedDate}</span>
                  </div>
                )}
                {assignment.status === 'graded' && (
                  <div className={styles.gradeInfo}>
                    <span className={styles.gradeLabel}>Calificación:</span>
                    <span className={styles.gradeValue}>{assignment.grade}/100</span>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.assignmentActions}>
              {assignment.status === 'pending' && (
                <button 
                  className={styles.submitButton}
                  onClick={() => openSubmitModal(assignment)}
                >
                  <Upload size={16} /> Entregar Tarea
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

      {showSubmitModal && selectedAssignment && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>Entregar Tarea</h2>
              <button 
                className={styles.closeButton}
                onClick={() => setShowSubmitModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmitAssignment}>
              <div className={styles.modalBody}>
                <div className={styles.assignmentInfo}>
                  <h3>{selectedAssignment.title}</h3>
                  <p>{selectedAssignment.course}</p>
                  <p className={styles.dueDate}>Fecha límite: {selectedAssignment.dueDate}</p>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="comments">Comentarios (opcional)</label>
                  <textarea
                    id="comments"
                    value={submissionData.comments}
                    onChange={(e) => setSubmissionData({...submissionData, comments: e.target.value})}
                    rows={4}
                    placeholder="Añade comentarios sobre tu entrega..."
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="submissionFile">Archivo de entrega</label>
                  <label className={styles.fileInput} htmlFor="submissionFile">
                    <Upload className={styles.fileInputIcon} size={20} />
                    <span className={styles.fileInputText}>
                      {submissionData.file
                        ? submissionData.file.name
                        : 'Haz clic para subir tu archivo'}
                    </span>
                    <input
                      type="file"
                      id="submissionFile"
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => setShowSubmitModal(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className={styles.submitModalButton}>
                  Entregar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assignments;