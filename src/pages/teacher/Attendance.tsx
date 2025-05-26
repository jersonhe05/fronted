import React, { useState } from 'react';
import { Calendar, Search, Download, CheckSquare, X } from 'lucide-react';
import styles from './Attendance.module.css';

const Attendance = () => {
  const [selectedDate, setSelectedDate] = useState('2023-05-15');
  const [searchTerm, setSearchTerm] = useState('');

  const students = [
    { id: 1, name: 'Ana María González', program: 'Aeronáutica', present: true },
    { id: 2, name: 'Carlos Rodríguez', program: 'Aeronáutica', present: true },
    { id: 3, name: 'Diana Martínez', program: 'Aeronáutica', present: false },
    { id: 4, name: 'Eduardo Sánchez', program: 'Aeronáutica', present: true },
    { id: 5, name: 'Fernanda López', program: 'Aeronáutica', present: true },
    { id: 6, name: 'Gabriel Torres', program: 'Aeronáutica', present: true },
    { id: 7, name: 'Helena Vargas', program: 'Aeronáutica', present: false },
    { id: 8, name: 'Ignacio Mendoza', program: 'Aeronáutica', present: true },
    { id: 9, name: 'Julia Paredes', program: 'Aeronáutica', present: true },
    { id: 10, name: 'Kevin Ramírez', program: 'Aeronáutica', present: false },
  ];

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const attendanceDates = [
    { date: '2023-05-15', dayOfWeek: 'Lunes' },
    { date: '2023-05-17', dayOfWeek: 'Miércoles' },
    { date: '2023-05-22', dayOfWeek: 'Lunes' },
    { date: '2023-05-24', dayOfWeek: 'Miércoles' },
    { date: '2023-05-29', dayOfWeek: 'Lunes' },
    { date: '2023-05-31', dayOfWeek: 'Miércoles' },
  ];

  const handleToggleAttendance = (studentId: number) => {
    // In a real app, this would update the student's attendance status in the database
    console.log(`Toggled attendance for student ${studentId}`);
  };

  return (
    <div className={styles.attendancePage}>
      <div className={styles.pageHeader}>
        <div className={styles.headerInfo}>
          <h1>Control de Asistencia</h1>
          <p>Inglés III - G16 | Aeronáutica</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.exportButton}>
            <Download size={16} /> Exportar
          </button>
        </div>
      </div>

      <div className={styles.attendanceLayout}>
        <div className={styles.attendanceSidebar}>
          <div className={styles.sidebarHeader}>
            <h2>Fechas de Clase</h2>
          </div>
          <div className={styles.dateList}>
            {attendanceDates.map((dateObj) => (
              <button
                key={dateObj.date}
                className={`${styles.dateItem} ${
                  selectedDate === dateObj.date ? styles.activeDate : ''
                }`}
                onClick={() => setSelectedDate(dateObj.date)}
              >
                <Calendar size={16} />
                <div className={styles.dateInfo}>
                  <span className={styles.dayOfWeek}>{dateObj.dayOfWeek}</span>
                  <span className={styles.dateString}>{dateObj.date}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.attendanceMain}>
          <div className={styles.mainHeader}>
            <div className={styles.selectedDate}>
              <Calendar size={20} />
              <h2>
                {selectedDate} - {attendanceDates.find(d => d.date === selectedDate)?.dayOfWeek}
              </h2>
            </div>
            <div className={styles.searchBox}>
              <Search size={16} />
              <input
                type="text"
                placeholder="Buscar estudiante..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.attendanceStats}>
            <div className={styles.statItem}>
              <span className={styles.statValue}>
                {students.filter(s => s.present).length}
              </span>
              <span className={styles.statLabel}>Presentes</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>
                {students.filter(s => !s.present).length}
              </span>
              <span className={styles.statLabel}>Ausentes</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>
                {((students.filter(s => s.present).length / students.length) * 100).toFixed(0)}%
              </span>
              <span className={styles.statLabel}>Asistencia</span>
            </div>
          </div>

          <div className={styles.studentsList}>
            <div className={styles.studentsHeader}>
              <div className={styles.studentNameHeader}>Nombre del Estudiante</div>
              <div className={styles.studentProgramHeader}>Programa</div>
              <div className={styles.studentAttendanceHeader}>Asistencia</div>
            </div>
            {filteredStudents.map((student) => (
              <div key={student.id} className={styles.studentItem}>
                <div className={styles.studentName}>{student.name}</div>
                <div className={styles.studentProgram}>{student.program}</div>
                <div className={styles.studentAttendance}>
                  <button
                    className={`${styles.attendanceButton} ${
                      student.present ? styles.presentButton : styles.absentButton
                    }`}
                    onClick={() => handleToggleAttendance(student.id)}
                  >
                    {student.present ? (
                      <>
                        <CheckSquare size={16} /> Presente
                      </>
                    ) : (
                      <>
                        <X size={16} /> Ausente
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;